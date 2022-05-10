import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlightsourceCategoryCards from '../components/BlightsourceCategoryCards';
import BlightsourceSubcategoryCards from '../components/BlightsourceSubcategoryCards';
import BlightsourceCards from '../components/BlightsourceCards';
import Blightsource from '../components/Blightsource';

const Blightsources = () => {
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [blightsourceName, setBlightsourceName] = useState('');

  useEffect(() => {
    setCategory('');
    setSubcategory('');
  }, [location]);

  return (
    <>
      {!category && !subcategory && (
        <BlightsourceCategoryCards categorySetter={setCategory} />
      )}
      {category && !subcategory && (
        <BlightsourceSubcategoryCards
          category={category}
          categorySetter={setCategory}
          subcategorySetter={setSubcategory}
        />
      )}
      {category && subcategory && !blightsourceName && (
        <BlightsourceCards
          category={category}
          subcategory={subcategory}
          categorySetter={setCategory}
          subcategorySetter={setSubcategory}
          blightsourceSetter={setBlightsourceName}
        />
      )}
      {category && subcategory && blightsourceName && (
        <Blightsource
          category={category}
          subcategory={subcategory}
          categorySetter={setCategory}
          subcategorySetter={setSubcategory}
          blightsourceSetter={setBlightsourceName}
          blightsourceName={blightsourceName}
        />
      )}
    </>
  );
};

export default Blightsources;
