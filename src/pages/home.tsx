import  { useContext, useEffect } from 'react';
import ProductCard from '../components/productCard'; // Giả sử bạn đã tạo component ProductCard
import { IProduct } from '../interface/models'; // Giả sử bạn đã định nghĩa interface IProduct trong file models.ts
import { ProductContext } from '../store/product-context'; // Đảm bảo đường dẫn đúng đến ProductContext
import { getAllProduct } from '../api/products'; // Đảm bảo đường dẫn đúng đến hàm getAllProduct
import Menu from '../components/menu';

const ProductPage = function () {
  const { state, dispatch } = useContext(ProductContext);

  useEffect(() => {
    const getData = async function () {
      const data = await getAllProduct();
      dispatch({
        type: 'FETCH_DATA',
        payload: data,
      });
    };
    getData();
  }, []);

  console.log(state);

  return (
    <div>
      <header className="bg-indigo-600 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Welcome Back, Barry!
              </h1>
              <p className="mt-1.5 text-sm">
                Let's write a new blog post! 🎉
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white px-5 py-3 text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> View Website </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
              <button
                className="block rounded-lg bg-white px-5 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring"
                type="button"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
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

export default ProductPage;
