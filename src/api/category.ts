import axios, { AxiosResponse } from 'axios';
import { ICategory } from '../interface/Category';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getAllCategories = async (): Promise<ICategory[]> => {
 
    const response: AxiosResponse<{categories:ICategory[]}> = await instance.get('/categories');
    return response.data.categories;
  
};
