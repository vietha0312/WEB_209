import React from 'react';

type Props = {
  data: {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  children?: React.ReactNode;
};

const ProductCard = function ({ data }: Props) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <img
        alt="Product Thumbnail"
        src={data.image}
        className="h-56 w-full object-cover"
      />

      <div className="bg-white p-4 sm:p-6">
        <p className="block text-xs text-gray-500">{data.price}</p>

        <a href="">
          <h3 className="mt-05 text-lg text-gray-900">{data.name}</h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {data.description}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
