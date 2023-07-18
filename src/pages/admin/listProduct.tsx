// ListProduct.tsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Nếu bạn sử dụng React Router

import { MessageContext } from "../../store/message-context";
import { deleteProduct, getAllProduct } from "../../api/products";


type ProductDataType = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  
};

const ListProduct = () => {
  const [products, setProducts] = useState<ProductDataType[]>([]);
  const { setMessage } = useContext(MessageContext);

 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProduct();
      setProducts(fetchedProducts);
    } catch (err) {
      setMessage({
        type: "error",
        message: "Không thể tải danh sách sản phẩm",
      });
    }
  };

  const handleDeleteProduct = async (productId: any) => {
    try {
      await deleteProduct(productId);
      setMessage({
        type: "success",
        message: "Xóa sản phẩm thành công",
      });
      fetchProducts();
    } catch (err) {
      setMessage({
        type: "error",
        message: "Có lỗi xảy ra khi xóa sản phẩm",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        Danh sách sản phẩm
      </h1>
      <div className="grid grid-cols-1 gap-4 mt-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-indigo-600">{product.name}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <div className="mt-4 space-x-4">
              {/* Nút sửa */}
              <Link
                to={`/product/edit/${product._id}`}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
              >
                Sửa
              </Link>
              {/* Nút xóa */}
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
