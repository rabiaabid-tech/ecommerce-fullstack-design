export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      {/* Newsletter */}
      <div className="bg-gray-50 py-10 text-center px-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Subscribe on our newsletter
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>
        <div className="flex justify-center">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <span className="px-3 flex items-center text-gray-400 text-sm">
              ✉️
            </span>
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 text-sm focus:outline-none w-48 md:w-64"
            />
            <button
              className="bg-blue-600 text-white px-5 py-2
              text-sm hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 py-10
        grid grid-cols-2 md:grid-cols-5 gap-8"
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🛍️</span>
            <span className="text-blue-600 font-bold text-lg">Brand</span>
          </div>
          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="flex gap-3 text-gray-400 text-sm">
            {["f", "t", "in", "📷", "▶"].map((icon) => (
              <span key={icon} className="hover:text-blue-600 cursor-pointer">
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {[
          {
            title: "About",
            links: ["About Us", "Find store", "Categories", "Blogs"],
          },
          {
            title: "Partnership",
            links: ["About Us", "Find store", "Categories", "Blogs"],
          },
          {
            title: "Information",
            links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
          },
          {
            title: "For users",
            links: ["Login", "Register", "Settings", "My Orders"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="/"
                    className="text-gray-400 text-sm hover:text-blue-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        className="border-t px-10 py-4 flex justify-between
        items-center text-xs text-gray-400"
      >
        <span>© 2023 Ecommerce.</span>
        <div className="flex items-center gap-1">
          <span>🇺🇸 English</span>
          <span>▲</span>
        </div>
      </div>
    </footer>
  );
}
