//Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-8 py-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">Shopcart</h3>
          <p className="text-gray-400 text-sm">
            Best deals on everything you love.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white">
                Cart
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-gray-400 text-sm">support@shopcart.com</p>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">
        © 2026 Shopcart. All rights reserved.
      </p>
    </footer>
  );
}
