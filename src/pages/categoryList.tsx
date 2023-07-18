import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../api/category'; // Đảm bảo đường dẫn đúng đến hàm getAllCategories
import { ICategory } from '../interface/Category'; // Đảm bảo đường dẫn đúng đến interface ICategory
type Props = {
  setCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
};
const MenuCategory : React.FC<Props> = ({ setCategoryId }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`/category/${category._id}`}
              className="text-gray-800 hover:text-indigo-600"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuCategory;
