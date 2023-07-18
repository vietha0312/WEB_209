import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../interface/models';

// Định nghĩa kiểu dữ liệu cho đối tượng sản phẩm


// Tạo instance của Axios với cấu hình baseURL
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});
export const getAllProduct = async function (): Promise<IProduct[]> {
    try {
      const response: AxiosResponse<{ products: IProduct[] }> = await instance.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      throw error;
    }
  };
// Hàm lấy một sản phẩm dựa vào id
export const getProductById = async function (productId: string): Promise<IProduct> {
  try {
    const response: AxiosResponse<IProduct> = await instance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    throw error;
  }
};

// Hàm thêm sản phẩm
export const addProduct = async function (productData: IProduct): Promise<IProduct> {
  try {
    const response: AxiosResponse<IProduct> = await instance.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    throw error;
  }
};

// Hàm sửa sản phẩm
export const updateProduct = async function (productId: string, productData: IProduct): Promise<IProduct> {
  try {
    const response: AxiosResponse<IProduct> = await instance.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi sửa sản phẩm:', error);
    throw error;
  }
};

// Hàm xóa sản phẩm
export const deleteProduct = async function (productId: string): Promise<void> {
  try {
    await instance.delete(`/products/${productId}`);
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    throw error;
  }
};
export const getProductByCategoryId = async function (
  categoryId: string
): Promise<IProduct[]> {
  try {
    const response: AxiosResponse<IProduct[]> = await instance.get(
      `/products?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm theo danh mục:', error);
    throw error;
  }
};