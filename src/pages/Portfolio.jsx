import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import TitleSection from '../components/ui/TitleSection';
import PortfolioCard from '../components/Card';
import Select from 'react-select';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    value: 'desc',
    label: 'Du plus récent au plus ancien',
  });
  const [selectedCategory, setSelectedCategory] = useState('tout');
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryRef = collection(db, 'portfolio');

        // Si une option de tri est sélectionnée, appliquez le tri
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

        // Récupère les catégories uniques à partir des portfolios actuels
        const uniqueCategories = Array.from(new Set(portfolioData.flatMap((item) => item.selectedCategories)));

        // Crée une liste d'options pour le menu déroulant des catégories
        const options = [
          { value: 'tout', label: 'Tout' },
          ...uniqueCategories.map((category) => ({ value: category, label: category })),
        ];

        setCategoryOptions(options);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de Firebase:', error);
      }
    };

    fetchData();
  }, [selectedSortOption]);

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

  return (
    <div className="max-w-4xl mx-auto p-4 py-20">
      <TitleSection paragraphe="P" title="ortfolio" paragrapheColor="text-pixygreen" />
      <div className="flex items-center mb-4">
        <p className="text-gray-500">Trier par date:</p>
        <Select
          options={sortOptions}
          value={selectedSortOption}
          onChange={handleSortChange}
          className="w-48 ml-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <p className="text-gray-500">Filtrer par catégorie:</p>
        <Select
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === selectedCategory)}
          onChange={handleCategoryChange}
          className="w-48 ml-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {portfolios
          .filter(
            (item) =>
              selectedCategory === 'tout' || item.selectedCategories.includes(selectedCategory)
          )
          .map((item) => (
            <PortfolioCard
              key={item.id}
              images={item.images}
              title={item.title}
              type={item.selectedTypes}
            />
          ))}
      </div>
    </div>
  );
};

export default Portfolio;
