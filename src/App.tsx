import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import { getAllProduct } from './api/products'

import MessageProvider from './store/message-context'
import ProductProvider from './store/product-context' // Thay FilmProvider bằng ProductProvider
import AddProductPage from './pages/admin/addProductPage'


import ListProduct from './pages/admin/listProduct'
import EditProductPage from './pages/admin/editProduct'
import ProductDetail from './pages/detailProduct'
import ProductListPage from './pages/ProductPage'
import Regester from './pages/admin/regester'


const routers = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: async () => {
      const products = await getAllProduct() 
      return { products }
    }
  },
  { path: '/product', element: < ProductListPage/> }, // Thay film bằng product
  { path: '/product/add', element: <AddProductPage /> }, // Thay film bằng product
  

  { path: '/product/:id', element: <ProductDetail /> }, 
  {path:'/admin',element: <Regester />},
  {path:'/admin/dashboard',element: <ListProduct />},
  { path: '/admin/product/edit/:productId', element: <EditProductPage /> }, 
])

function App() {
  return <ProductProvider> 
    <MessageProvider>
      <RouterProvider router={routers} />
    </MessageProvider>
  </ProductProvider> 
}

export default App
