// ProductListPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/productCard';
import { IProduct } from '../interface/models';
import { ProductContext } from '../store/product-context';
import { getAllProduct, getProductByCategoryId } from '../api/products';
import MenuCategory from './categoryList';
import Menu from '../components/menu';

const ProductListPage = function () {
  const { state, dispatch } = useContext(ProductContext);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    // Lấy categoryId từ params
    const params = new URLSearchParams(window.location.search);
    const categoryIdParam = params.get('categoryId');
    setCategoryId(categoryIdParam);
  },  [categoryId]);

  useEffect(() => {
    const getData = async function () {
      let data;
      if (categoryId) {
        // Lấy sản phẩm theo danh mục nếu categoryId tồn tại
        data = await getProductByCategoryId(categoryId);
      } else {
        // Lấy tất cả sản phẩm nếu không có categoryId
        data = await getAllProduct();
      }
      dispatch({
        type: 'FETCH_DATA',
        payload: data,
      });
    };
    getData();
  }, [categoryId]);

  return (
    <div>
     <header>
        {/* Truyền setCategoryId vào MenuCategory */}
        <MenuCategory setCategoryId={setCategoryId} />
      </header>
<Menu/>
      <div className="content pt-4 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center mx-10">
        {(state.products as IProduct[]).map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
