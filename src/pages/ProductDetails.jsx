import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 34.png";
import tech4 from "../assets/assets/Image/tech/image 32.png";
import tech5 from "../assets/assets/Image/tech/image 33.png";
import interior1 from "../assets/assets/Image/interior/1.png";
import interior2 from "../assets/assets/Image/interior/3.png";
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";

const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "49.99",
    category: "Electronics",
    image: tech1,
    description: "Premium noise-cancelling headphones with 20hr battery.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "129.99",
    category: "Electronics",
    image: tech2,
    description: "Track fitness, receive notifications on your wrist.",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: "59.99",
    category: "Electronics",
    image: tech3,
    description: "Ergonomic aluminum stand for better posture.",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "39.99",
    category: "Electronics",
    image: tech4,
    description: "360 surround sound with 12hr battery.",
  },
  {
    id: 5,
    name: "USB Hub",
    price: "29.99",
    category: "Electronics",
    image: tech5,
    description: "7-in-1 USB-C hub with HDMI and SD card slots.",
  },
  {
    id: 6,
    name: "Sofa Chair",
    price: "299.99",
    category: "Interior",
    image: interior1,
    description: "Modern comfortable sofa for living rooms.",
  },
  {
    id: 7,
    name: "Dining Table",
    price: "199.99",
    category: "Interior",
    image: interior2,
    description: "Minimalist wooden dining table, seats 6.",
  },
  {
    id: 8,
    name: "T-Shirt",
    price: "19.99",
    category: "Clothing",
    image: cloth1,
    description: "100% cotton premium quality t-shirt.",
  },
  {
    id: 9,
    name: "Casual Shirt",
    price: "29.99",
    category: "Clothing",
    image: cloth2,
    description: "Slim fit casual shirt for everyday wear.",
  },
  {
    id: 10,
    name: "Jacket",
    price: "79.99",
    category: "Clothing",
    image: cloth3,
    description: "Warm stylish jacket for cold weather.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImg, setSelectedImg] = useState(0);

  const related = allProducts.filter((p) => p.id !== parseInt(id)).slice(0, 6);

  const youMayLike = allProducts
    .filter((p) => p.id !== parseInt(id))
    .slice(0, 5);

  if (!product)
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl mb-4">Product not found.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#F8F9FA" }} className="px-4 md:px-10 py-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          {" > "}
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          {" > "}
          <span className="text-gray-700">{product.name}</span>
        </p>

        {/* ── TOP SECTION ── */}
        <div className="bg-white border rounded-xl p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Column 1: Images */}
            <div className="md:w-64 shrink-0">
              <div
                className="border rounded-xl h-64
                flex items-center justify-center bg-gray-50 mb-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 flex-wrap">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-12 h-12 border rounded-lg
                    flex items-center justify-center
                    cursor-pointer bg-gray-50 hover:border-blue-400
                    ${
                      selectedImg === i ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Info */}
            <div className="flex-1">
              <p
                className="text-green-500 text-sm
                font-semibold mb-1"
              >
                ✓ In stock
              </p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {"★★★★☆".split("").map((s, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs">9.3</span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-gray-400 text-xs">32 reviews</span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-gray-400 text-xs">154 sold</span>
              </div>

              {/* Price Tiers Table */}
              <div
                className="flex border border-gray-200
                rounded-lg overflow-hidden mb-4 text-sm"
              >
                {[
                  {
                    price: "$" + product.price,
                    qty: "50-100 pcs",
                    active: true,
                  },
                  {
                    price: "$" + (parseFloat(product.price) * 0.85).toFixed(2),
                    qty: "100-700 pcs",
                    active: false,
                  },
                  {
                    price: "$" + (parseFloat(product.price) * 0.7).toFixed(2),
                    qty: "700+ pcs",
                    active: false,
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className={`flex-1 p-3 text-center
                    ${i < 2 ? "border-r border-gray-200" : ""}
                    ${t.active ? "bg-orange-50" : ""}`}
                  >
                    <p
                      className={`font-bold
                      ${t.active ? "text-orange-500" : "text-gray-800"}`}
                    >
                      {t.price}
                    </p>
                    <p className="text-gray-400 text-xs">{t.qty}</p>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm mb-4">
                {[
                  { label: "Price", value: "Negotiable" },
                  { label: "Type", value: "Classic" },
                  { label: "Material", value: "Premium quality" },
                  { label: "Design", value: "Modern" },
                  {
                    label: "Customization",
                    value: "Customized logo available",
                  },
                  { label: "Protection", value: "Refund Policy" },
                  { label: "Warranty", value: "2 years full warranty" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex gap-4 border-b
                    border-gray-100 pb-2"
                  >
                    <span className="text-gray-400 w-28 shrink-0">
                      {row.label}:
                    </span>
                    <span className="text-gray-700">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Supplier Box */}
            <div className="md:w-56 shrink-0">
              <div className="border rounded-xl p-4 mb-3">
                <div
                  className="flex items-center gap-3 mb-3
                  pb-3 border-b"
                >
                  <div
                    className="w-10 h-10 bg-blue-100
                    rounded-full flex items-center justify-center
                    font-bold text-blue-600"
                  >
                    R
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Supplier</p>
                    <p className="text-sm font-medium text-gray-800">
                      Guanjoi Trading LLC
                    </p>
                  </div>
                </div>
                <div
                  className="space-y-1.5 text-xs text-gray-500
                  mb-4"
                >
                  <p>🇩🇪 Germany, Berlin</p>
                  <p>✓ Verified Seller</p>
                  <p>🌐 Worldwide shipping</p>
                </div>
                <button
                  className="w-full bg-blue-600 text-white
                  py-2 rounded-lg text-sm font-medium mb-2
                  hover:bg-blue-700"
                >
                  Send inquiry
                </button>
                <button
                  className="w-full border border-blue-600
                  text-blue-600 py-2 rounded-lg text-sm
                  hover:bg-blue-50"
                >
                  Seller's profile
                </button>
              </div>
              <button
                className="w-full flex items-center
                justify-center gap-2 text-blue-600 text-sm
                hover:underline"
              >
                ♡ Save for later
              </button>
            </div>
          </div>
        </div>

        {/* ── MIDDLE SECTION: Tabs + You may like ── */}
        <div className="flex gap-4 mb-4">
          {/* Tabs */}
          <div className="flex-1 bg-white border rounded-xl p-6">
            {/* Tab buttons */}
            <div className="flex gap-6 border-b mb-4">
              {["Description", "Reviews", "Shipping", "About seller"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium
                  border-b-2 transition -mb-px
                  ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {activeTab === "Description" && (
              <div>
                <p
                  className="text-gray-600 text-sm
                  leading-relaxed mb-4"
                >
                  {product.description} Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation.
                </p>
                {/* Specs table */}
                <table
                  className="w-full text-sm mb-4
                  border-collapse"
                >
                  {[
                    { label: "Model", value: "#8786867" },
                    { label: "Style", value: "Classic style" },
                    { label: "Certificate", value: "ISO-898921212" },
                    { label: "Size", value: "34mm x 450mm x 19mm" },
                    { label: "Memory", value: "36GB RAM" },
                  ].map((row) => (
                    <tr key={row.label} className="border border-gray-200">
                      <td
                        className="px-4 py-2 bg-gray-50
                        text-gray-500 w-1/3"
                      >
                        {row.label}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{row.value}</td>
                    </tr>
                  ))}
                </table>
                {/* Features */}
                {[
                  "Some great feature name here",
                  "Lorem ipsum dolor sit amet, consectetur",
                  "Duis aute irure dolor in reprehenderit",
                  "Some great feature name here",
                ].map((f) => (
                  <p key={f} className="text-sm text-gray-600 mb-1">
                    ✓ {f}
                  </p>
                ))}
              </div>
            )}

            {activeTab === "Reviews" && (
              <p className="text-gray-400 text-sm">No reviews yet.</p>
            )}
            {activeTab === "Shipping" && (
              <p className="text-gray-400 text-sm">
                Free shipping on orders over $50.
              </p>
            )}
            {activeTab === "About seller" && (
              <p className="text-gray-400 text-sm">
                Guanjoi Trading LLC — Verified seller from Germany.
              </p>
            )}
          </div>

          {/* You May Like */}
          <div
            className="hidden md:block w-56 shrink-0
            bg-white border rounded-xl p-4"
          >
            <h3
              className="font-semibold text-gray-800
              text-sm mb-3"
            >
              You may like
            </h3>
            <div className="space-y-3">
              {youMayLike.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="flex items-center gap-3
                  hover:bg-gray-50 p-1.5 rounded-lg"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-contain
                    border rounded-lg bg-gray-50"
                  />
                  <div>
                    <p
                      className="text-xs text-gray-700
                      font-medium leading-tight"
                    >
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">$7.00 - ${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        <div className="bg-white border rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-800 mb-4">Related products</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {related.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="border rounded-xl p-3 text-center
                hover:shadow-md transition"
              >
                <div
                  className="h-20 flex items-center
                  justify-center mb-2"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain"
                  />
                </div>
                <p
                  className="text-xs text-gray-600 mb-1
                  leading-tight"
                >
                  {p.name}
                </p>
                <p className="text-xs text-gray-400">$32.00-${p.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── DISCOUNT BANNER ── */}
        <div
          className="bg-blue-600 rounded-xl p-6
          flex justify-between items-center"
        >
          <div>
            <h3 className="text-white font-bold text-lg mb-1">
              Super discount on more than 100 USD
            </h3>
            <p className="text-blue-200 text-sm">
              Have you ever finally just write dummy info
            </p>
          </div>
          <Link
            to="/products"
            className="bg-orange-400 text-white px-6 py-2
            rounded-lg font-semibold hover:bg-orange-500
            whitespace-nowrap"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
