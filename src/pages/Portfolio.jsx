import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import TitleSection from '../components/ui/TitleSection';
import PortfolioCard from '../components/Card';
import Select from 'react-select';

const Portfolio = () => {
  const [allPortfolios, setAllPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    value: 'desc',
    label: 'Du plus récent au plus ancien',
  });
  const [selectedCategory, setSelectedCategory] = useState('tout');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPortfolios = async () => {
    try {
      let queryRef = collection(db, 'portfolio');

      if (selectedSortOption) {
        const { value } = selectedSortOption;
        queryRef = query(queryRef, orderBy('date', value));
      }

      const querySnapshot = await getDocs(queryRef);

      const portfolioData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllPortfolios(portfolioData);

      // Filtrage des données en fonction de la catégorie sélectionnée
      const categoryFilteredData = selectedCategory === 'tout'
        ? portfolioData
        : portfolioData.filter(item => item.selectedCategories.includes(selectedCategory));

      // Filtrage des données en fonction du terme de recherche
      const filteredData = categoryFilteredData.filter(
        (item) =>
          (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredPortfolios(filteredData);

      const uniqueCategories = Array.from(new Set(portfolioData.flatMap((item) => item.selectedCategories)));
      const options = [
        { value: 'tout', label: 'Tout' },
        ...uniqueCategories.map((category) => ({ value: category, label: category })),
      ];

      setCategoryOptions(options);

      // Calcul du nombre total de pages
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [selectedSortOption, selectedCategory, searchTerm]);

  const updateCategories = () => {
    const uniqueCategories = Array.from(new Set(allPortfolios.flatMap((item) => item.selectedCategories)));
    const options = [
      { value: 'tout', label: 'Tout' },
      ...uniqueCategories.map((category) => ({ value: category, label: category })),
    ];

    setCategoryOptions(options);
  };

  useEffect(() => {
    updateCategories();
  }, [allPortfolios]);

  const sortOptions = [
    { value: 'asc', label: 'Du plus ancien au plus récent' },
    { value: 'desc', label: 'Du plus récent au plus ancien' },
  ];

  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPortfolios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    return pageNumbers
      .slice(startPage - 1, endPage)
      .map((number) => {
        const rotation = Math.random() * 20 - 5;
  
        return (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 p-2 rounded ${number === currentPage ? 'bg-pixygreen text-white' : 'bg-pixypink text-white'}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {number}
          </button>
        );
      });
  };

  return (
    <div className="max-w-6xl mx-auto  p-4 py-20">
      <TitleSection paragraphe="P" title="ortfolio" paragrapheColor="text-pixygreen" />
      <div className='flex justify-center items-center'>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <p className="text-gray-500">Trier par date:</p>
            <Select
              options={sortOptions}
              value={selectedSortOption}
              onChange={handleSortChange}
              className="w-48 md:ml-2 ml-12 md:pr-2 focus:outline-none"
            />
          </div>
          <div className="flex items-center mb-2 md:mb-0">
            <p className="text-gray-500">Trier par catégorie:</p>
            <Select
              options={categoryOptions}
              value={categoryOptions.find((option) => option.value === selectedCategory)}
              onChange={handleCategoryChange}
              className="w-48 ml-2"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Rechercher..."
          className="md:w-full w-full p-2 rounded focus:outline-none mb-4  text-pixygreen"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {currentItems.map((item) => (
          <PortfolioCard key={item.id} images={item.images} title={item.title} type={item.selectedTypes} />
        ))}
      </div>
      <div className="mt-8">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default Portfolio;
