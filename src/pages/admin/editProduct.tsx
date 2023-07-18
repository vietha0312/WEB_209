import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageContext } from '../../store/message-context';
import { produce } from 'immer';
import { IProduct } from '../../interface/models';
import { ICategory } from '../../interface/Category';
import { getProductById, updateProduct } from '../../api/products';
import { getAllCategories } from '../../api/category';

type FormDataType = {
    _id?: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  image: string;
 
};

const initialFormData: FormDataType = {
  categoryId: '', 
  name: '',
  price: 0,
  description: '',
  image: '',
  
};
const formDataReducer = function (
  draft: FormDataType,
  action: { type: string; payload: string | number }
) {
  switch (action.type) {
    case 'UPDATE_NAME':
      draft.name = action.payload as string;
      break;
    case 'UPDATE_PRICE':
      draft.price = action.payload as number;
      break;
    case 'UPDATE_DESCRIPTION':
      draft.description = action.payload as string;
      break;
    case 'UPDATE_IMAGE':
      draft.image = action.payload as string;
      break;
    case 'UPDATE_CATEGORY_ID': 
      draft.categoryId = action.payload as string;
      break;
    default:
      return draft;
  }
};

type FormValidType = {
  isValidName: boolean;
  isValidPrice: boolean;
  isValidDescription: boolean;
  isValidImage: boolean;
  isValidCategoryId: boolean; 
};

const initialFormValid: FormValidType = {
  isValidName: true,
  isValidPrice: true,
  isValidDescription: true,
  isValidImage: true,
  isValidCategoryId: true, 
};

const formValidReducer = function (
  draft: FormValidType,
  action: { type: string; payload: FormDataType }
) {
  let isValid: boolean;
  switch (action.type) {
    case 'VALIDATE_NAME':
      isValid = action.payload.name.trim() !== '';
      draft.isValidName = isValid;
      break;
    case 'VALIDATE_PRICE':
      isValid = action.payload.price > 0;
      draft.isValidPrice = isValid;
      break;
    case 'VALIDATE_DESCRIPTION':
      isValid = action.payload.description.length > 10;
      draft.isValidDescription = isValid;
      break;
    case 'VALIDATE_IMAGE':
      isValid = action.payload.image !== '';
      draft.isValidImage = isValid;
      break;
    case 'VALIDATE_CATEGORY_ID': 
      isValid = action.payload.categoryId.trim() !== '';
      draft.isValidCategoryId = isValid;
      break;
 
    default:
      return draft;
  }
};

const EditProductPage = function () {
  const { productId } = useParams<{ productId: any }>();

  const [formData, dispatchFormData] = useReducer(
    produce(formDataReducer),
    initialFormData
  );
  const [formValid, dispatchFormValid] = useReducer(
    produce(formValidReducer),
    initialFormValid
  );
  const { setMessage } = useContext(MessageContext);
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        dispatchFormData({ type: 'UPDATE_NAME', payload: productData.name });
        dispatchFormData({ type: 'UPDATE_PRICE', payload: productData.price });
        dispatchFormData({ type: 'UPDATE_DESCRIPTION', payload: productData.description });
        dispatchFormData({ type: 'UPDATE_IMAGE', payload: productData.image });
        dispatchFormData({ type: 'UPDATE_CATEGORY_ID', payload: productData.categoryId });
    
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formValid.isValidName &&
      formValid.isValidPrice &&
      formValid.isValidDescription &&
      formValid.isValidImage &&
      formValid.isValidCategoryId 
    ) {
      try {
        const productData: IProduct = {
          _id: productId,
          categoryId: formData.categoryId,
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image: formData.image,
    
        };

        await updateProduct(productId, productData);
        setMessage({
          type: 'success',
          message: 'Cập nhật thành công',
        });
      
      } catch (err) {
        
        setMessage({
          type: 'error',
          message: 'Có lỗi xảy ra',
        });
      }
    } else {
      alert('Yêu cầu kiểm tra lại');
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Chỉnh sửa sản phẩm
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className={`${
                formValid.isValidName ? 'border-gray-300' : 'border-red-500'
              } focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md`}
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                dispatchFormData({
                  type: 'UPDATE_NAME',
                  payload: e.target.value,
                })
              }
              onBlur={() =>
                dispatchFormValid({
                  type: 'VALIDATE_NAME',
                  payload: formData,
                })
              }
            />
            {!formValid.isValidName && (
              <p className="mt-2 text-sm text-red-500">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className={`${
                formValid.isValidPrice ? 'border-gray-300' : 'border-red-500'
              } focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md`}
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) =>
                dispatchFormData({
                  type: 'UPDATE_PRICE',
                  payload: Number(e.target.value),
                })
              }
              onBlur={() =>
                dispatchFormValid({
                  type: 'VALIDATE_PRICE',
                  payload: formData,
                })
              }
            />
            {!formValid.isValidPrice && (
              <p className="mt-2 text-sm text-red-500">Price must be greater than 0</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className={`${
                formValid.isValidDescription ? 'border-gray-300' : 'border-red-500'
              } focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md`}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                dispatchFormData({
                  type: 'UPDATE_DESCRIPTION',
                  payload: e.target.value,
                })
              }
              onBlur={() =>
                dispatchFormValid({
                  type: 'VALIDATE_DESCRIPTION',
                  payload: formData,
                })
              }
            />
            {!formValid.isValidDescription && (
              <p className="mt-2 text-sm text-red-500">
                Description must have at least 10 characters
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              className={`${
                formValid.isValidImage ? 'border-gray-300' : 'border-red-500'
              } focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md`}
              placeholder="Enter image URL"
              value={formData.image}
              onChange={(e) =>
                dispatchFormData({
                  type: 'UPDATE_IMAGE',
                  payload: e.target.value,
                })
              }
              onBlur={() =>
                dispatchFormValid({
                  type: 'VALIDATE_IMAGE',
                  payload: formData,
                })
              }
            />
            {!formValid.isValidImage && (
              <p className="mt-2 text-sm text-red-500">Image URL is required</p>
            )}
          </div>

          <select
            value={formData.categoryId}
            onChange={(e) =>
              dispatchFormData({
                type: 'UPDATE_CATEGORY_ID',
                payload: e.target.value,
              })
            }
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="block w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
