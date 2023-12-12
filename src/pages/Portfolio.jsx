import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import TitleSection from '../components/ui/TitleSection';
import PortfolioCard from '../components/Card';
import Select from 'react-select';
import ModalComponent from '../components/ModalComponent';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    value: 'desc',
    label: 'Du plus récent au plus ancien',
  });
  const [selectedCategory, setSelectedCategory] = useState('tout');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let conditions = [];

      try {
        let queryRef = collection(db, 'portfolio');

        if (selectedCategory !== 'tout') {
          conditions.push(['selectedCategories', 'array-contains', selectedCategory]);
        }

        if (selectedSortOption) {
          const { value } = selectedSortOption;
          queryRef = query(queryRef, orderBy('date', value));
        }

        const querySnapshot = await getDocs(queryRef);

        const portfolioData = [];
        querySnapshot.forEach((doc) => {
          const portfolio = {
            id: doc.id,
            ...doc.data(),
          };
          portfolioData.push(portfolio);
        });
        setPortfolios(portfolioData);

        const uniqueCategories = Array.from(new Set(portfolioData.flatMap((item) => item.selectedCategories)));
        const options = [
          { value: 'tout', label: 'Tout' },
          ...uniqueCategories.map((category) => ({ value: category, label: category })),
        ];

        setCategoryOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedSortOption, selectedCategory, searchTerm]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className=" mx-auto p-4 py-20 h-screen w-full flex-1">
      <TitleSection title="Portfolio" />
      <div className="flex items-center justify-center space-x-2 mb-4 w-full">
        <p className="text-gray-500 text-sm">Trier par date:</p>
        <Select
          options={sortOptions}
          value={selectedSortOption}
          onChange={handleSortChange}
          className="w-48 ml-2"
        />
     
      
        <p className="text-gray-500 text-sm">Filtrer par catégorie:</p>
        <Select
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === selectedCategory)}
          onChange={handleCategoryChange}
          className="w-48 ml-2"
        />
     
      </div>
      <div className='flex items-center justify-center'>
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full p-2 rounded-full focus:outline-none mb-4 bg-white border border-secondary text-primary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {portfolios
          .filter((item) => {
            const categoryCondition =
              selectedCategory === 'tout' || item.selectedCategories.includes(selectedCategory);

            const searchCondition =
              searchTerm === '' ||
              item.title.toLowerCase().includes(searchTerm.toLowerCase());

            return categoryCondition && searchCondition;
          })
      
          .map((item) => (
            <PortfolioCard
              key={item.id}
              images={item.images}
              title={item.title}
              type={item.selectedTypes}
              tag={item.selectedCategories}
              onClick={() => {
                setSelectedCard(item);
                openModal();
              }}
            />
            
          ))}
          
      </div>
      {isModalOpen && selectedCard && (
        <ModalComponent
          images={selectedCard.images}
          title={selectedCard.title}
          description={selectedCard.description}
          type={selectedCard.selectedTypes}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Portfolio;
