import { useParams, Link } from "react-router-dom";

// Tech Images
import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 34.png";
import tech4 from "../assets/assets/Image/tech/image 32.png";
import tech5 from "../assets/assets/Image/tech/image 33.png";

// Interior Images
import interior1 from "../assets/assets/Image/interior/1.png";
import interior2 from "../assets/assets/Image/interior/3.png";

// Cloth Images
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";

const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "49.99",
    category: "Electronics",
    description:
      "Premium sound quality with noise cancellation and 20hr battery life.",
    image: tech1,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "129.99",
    category: "Electronics",
    description:
      "Track fitness, receive notifications, and more on your wrist.",
    image: tech2,
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: "59.99",
    category: "Electronics",
    description:
      "Ergonomic aluminum laptop stand for better posture and airflow.",
    image: tech3,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "39.99",
    category: "Electronics",
    description: "360° surround sound with 12hr battery and waterproof design.",
    image: tech4,
  },
  {
    id: 5,
    name: "USB Hub",
    price: "29.99",
    category: "Electronics",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots.",
    image: tech5,
  },
  {
    id: 6,
    name: "Sofa Chair",
    price: "299.99",
    category: "Interior",
    description: "Modern comfortable sofa chair perfect for living rooms.",
    image: interior1,
  },
  {
    id: 7,
    name: "Dining Table",
    price: "199.99",
    category: "Interior",
    description: "Minimalist wooden dining table, seats up to 6 people.",
    image: interior2,
  },
  {
    id: 8,
    name: "T-Shirt",
    price: "19.99",
    category: "Clothing",
    description: "100% cotton premium quality t-shirt, available in all sizes.",
    image: cloth1,
  },
  {
    id: 9,
    name: "Casual Shirt",
    price: "29.99",
    category: "Clothing",
    description: "Slim fit casual shirt perfect for everyday wear.",
    image: cloth2,
  },
  {
    id: 10,
    name: "Jacket",
    price: "79.99",
    category: "Clothing",
    description: "Warm and stylish jacket for cold weather.",
    image: cloth3,
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product)
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">Product not found.</p>
        <Link to="/products" className="text-blue-700 underline mt-4 block">
          Back to Products
        </Link>
      </div>
    );

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-gray-400 text-sm mb-6">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          {" / "}
          <Link to="/products" className="hover:text-blue-700">
            Products
          </Link>
          {" / "}
          <span className="text-gray-700">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="flex-1 bg-gray-50 rounded-2xl p-8 flex items-center justify-center border">
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <p className="text-blue-600 text-sm font-semibold mb-1 uppercase tracking-wide">
              {product.category}
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>
            <p className="text-2xl text-blue-700 font-bold mb-4">
              ${product.price}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {"★★★★☆".split("").map((star, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  {star}
                </span>
              ))}
              <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border rounded-full overflow-hidden">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  −
                </button>
                <span className="px-4 py-2 border-x">1</span>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-700 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition">
                Add to Cart 🛒
              </button>
              <Link
                to="/products"
                className="flex-1 border border-blue-700 text-blue-700 py-3 rounded-full font-semibold text-center hover:bg-blue-50 transition"
              >
                ← Back
              </Link>
            </div>

            {/* Extra Info */}
            <div className="mt-6 border-t pt-4 text-sm text-gray-400 space-y-1">
              <p>✅ Free delivery on orders over $50</p>
              <p>🔄 Easy 30-day returns</p>
              <p>🛡️ 1 year warranty included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
