import { createContext, useReducer } from 'react';
import { IProduct } from '../interface/models'; // Giả sử bạn đã định nghĩa interface IProduct trong file models.ts

export const ProductContext = createContext({} as any);

type Props = {
  children?: React.ReactNode;
};

type StateType = {
  products: IProduct[];
  isLoading: boolean;
};

const initialState: StateType = {
  products: [],
  isLoading: false,
};

const reducer = (state: StateType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const ProductProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
