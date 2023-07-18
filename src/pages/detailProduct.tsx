// ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../interface/models';
import { getProductById } from '../api/products';


const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log(productId)
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    
    </div>
  );
};

export default ProductDetail;
