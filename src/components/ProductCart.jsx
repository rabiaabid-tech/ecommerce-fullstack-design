import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
    >
      <div className="h-40 mb-2 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain mix-blend-multiply"
        />
      </div>
      <h3 className="text-sm text-gray-800 font-medium truncate mb-1">
        {product.name}
      </h3>
      <div className="text-lg font-bold text-gray-900 mb-1">
        ${product.price}
      </div>
      <div className="flex items-center text-xs text-gray-400 mb-2">
        <span className="text-yellow-400 mr-1">★★★★☆</span> 7.5
      </div>
      <div className="text-green-600 text-xs font-medium">Free Shipping</div>
    </Link>
  );
}
