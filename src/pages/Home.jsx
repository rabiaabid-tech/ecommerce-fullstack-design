import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import bannerImage from "../assets/assets/Image/backgrounds/Banner-board-800x420 2.png";
import interior1 from "../assets/assets/Image/interior/1.png";
import tech1 from "../assets/assets/Image/tech/image 23.png";
import aeFlag from "../assets/assets/Layout1/Image/flags/AE@2x.png";
import usFlag from "../assets/assets/Layout1/Image/flags/US@2x.png";
import gbFlag from "../assets/assets/Layout1/Image/flags/GB@2x.png";
import cnFlag from "../assets/assets/Layout1/Image/flags/CN@2x.png";
import deFlag from "../assets/assets/Layout1/Image/flags/DE@2x.png";
import frFlag from "../assets/assets/Layout1/Image/flags/FR@2x.png";

function useCountdown() {
  const [time, setTime] = useState({ days: 4, hours: 13, mins: 34, secs: 56 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
        }
        if (mins < 0) {
          mins = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) days = 0;
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Home() {
  const time = useCountdown();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserName(payload.full_name || "User");
        } catch (e) {
          setUserName("User");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deals = products.slice(0, 5);
  const interiors = products
    .filter((p) => p.category === "Interior")
    .slice(0, 8);
  const electronics = products
    .filter((p) => p.category === "Electronics")
    .slice(0, 8);
  const recommended = products.slice(0, 10);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");  
    window.dispatchEvent(new Event("authChange"));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div style={{ backgroundColor: "#F7FAFC" }}>
      {/* ── SECTION 1: Hero ── */}
      <section className="px-4 md:px-10 py-3 md:py-4">
        <div className="max-w-[1440px] mx-auto flex gap-3">
          {/* Category Sidebar — Desktop only */}
          <div
            className="hidden md:block w-64 bg-white border
            border-gray-200 rounded-lg p-3 shrink-0"
          >
            <ul className="text-sm space-y-1 text-gray-600">
              {[
                "Automobiles",
                "Clothes and wear",
                "Home interiors",
                "Computer and tech",
                "Tools, equipments",
                "Sports and outdoor",
                "Animal and pets",
                "Machinery tools",
                "More category",
              ].map((item, i) => (
                <li
                  key={item}
                  className={`cursor-pointer hover:bg-blue-50
                  px-3 py-2 rounded-md transition
                  ${i === 0 ? "bg-blue-50 text-blue-700 font-medium" : ""}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Banner — Full width on mobile */}
          <div
            className="flex-1 rounded-xl overflow-hidden
            relative min-h-[180px] md:min-h-[300px]"
          >
            <img
              src={bannerImage}
              alt="Hero"
              className="w-full h-full object-cover block"
            />
            <div
              className="absolute top-5 left-5
              md:top-10 md:left-10"
            >
              <p className="text-gray-800 text-sm md:text-lg mb-1">
                Latest trending
              </p>
              <h2
                className="text-xl md:text-3xl font-bold
                text-gray-900 mb-3"
              >
                Electronic items
              </h2>
              <Link
                to="/products"
                className="inline-block bg-white text-gray-800
                font-medium px-4 py-1.5 md:px-5 md:py-2
                rounded shadow-sm hover:bg-gray-50 transition
                text-sm md:text-base"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right Sidebar — Desktop only */}
          <div
            className="hidden md:flex flex-col gap-3
            w-56 shrink-0"
          >
            <div
              className="bg-blue-50 border border-blue-100
              rounded-lg p-4 text-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 bg-gray-200 rounded-full
                  flex items-center justify-center shrink-0"
                >
                  <span className="text-xl">👤</span>
                </div>
                <p className="text-gray-600 leading-tight">
                  {isLoggedIn ? `Welcome back, ${userName}!` : "Hi, user"}
                  <br />
                  <span className="font-semibold text-gray-800">
                    {isLoggedIn ? "Ready to shop?" : "let's get started"}
                  </span>
                </p>
              </div>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-50 text-red-600
                  border border-red-200 font-medium py-1.5
                  rounded hover:bg-red-100 transition text-sm"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="block text-center w-full
                    bg-blue-600 text-white font-medium py-1.5
                    rounded mb-2 hover:bg-blue-700 transition
                    text-sm"
                  >
                    Join now
                  </Link>
                  <Link
                    to="/login"
                    className="block text-center w-full bg-white
                    border border-gray-300 text-blue-600 font-medium
                    py-1.5 rounded hover:bg-gray-50 transition
                    text-sm"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
            <div
              className="bg-orange-400 text-white rounded-lg
              p-4 text-sm leading-relaxed cursor-pointer
              hover:bg-orange-500 transition"
            >
              Get US $10 off with a new supplier
            </div>
            <div
              className="bg-teal-500 text-white rounded-lg
              p-4 text-sm leading-relaxed cursor-pointer
              hover:bg-teal-600 transition"
            >
              Send quotes with supplier preferences
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Deals & Offers ── */}
      <section className="px-4 md:px-10 py-3 md:py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white border
          border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Mobile: heading + timer in one row */}
          <div
            className="flex items-center justify-between
            p-4 md:hidden border-b border-gray-100"
          >
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Deals and offers
              </h3>
              <p className="text-gray-500 text-xs">Electronic equipments</p>
            </div>
            {/* Mobile timer — no Days */}
            <div className="flex gap-1">
              {[
                { n: String(time.hours).padStart(2, "0"), l: "Hour" },
                { n: String(time.mins).padStart(2, "0"), l: "Min" },
                { n: String(time.secs).padStart(2, "0"), l: "Sec" },
              ].map((t) => (
                <div
                  key={t.l}
                  className="bg-gray-700 text-white px-1.5 py-1
                  rounded text-center min-w-[36px]"
                >
                  <div className="font-bold text-sm leading-none">{t.n}</div>
                  <div className="text-[9px] mt-0.5 text-gray-300">{t.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop: Left timer pane */}
            <div
              className="hidden md:block p-6 border-r
              border-gray-200 w-72 shrink-0"
            >
              <h3 className="font-bold text-gray-800 text-xl mb-1">
                Deals and offers
              </h3>
              <p className="text-gray-500 text-sm mb-4">Hygiene equipments</p>
              <div className="flex gap-1.5">
                {[
                  { n: String(time.days).padStart(2, "0"), l: "Days" },
                  { n: String(time.hours).padStart(2, "0"), l: "Hour" },
                  { n: String(time.mins).padStart(2, "0"), l: "Min" },
                  { n: String(time.secs).padStart(2, "0"), l: "Sec" },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="bg-gray-600 text-white px-2 py-1.5
                    rounded text-center min-w-[45px]"
                  >
                    <div className="font-bold text-base leading-none">
                      {t.n}
                    </div>
                    <div className="text-[10px] mt-0.5 text-gray-200">
                      {t.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products — horizontal scroll on mobile */}
            <div className="flex-1 overflow-x-auto md:overflow-visible">
              <div
                className="flex md:grid md:grid-cols-5
                divide-x divide-gray-200 w-max md:w-full"
              >
                {loading ? (
                  <p className="text-sm text-gray-500 p-6">Loading deals...</p>
                ) : (
                  deals.map((p) => (
                    <Link
                      to={`/product/${p.id}`}
                      key={p.id}
                      className="p-4 flex flex-col items-center
                      hover:bg-gray-50 transition min-w-[120px]
                      md:min-w-0"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-20 w-20 md:h-28 md:w-28
                        object-contain mb-2 mix-blend-multiply"
                      />
                      <p
                        className="text-xs text-gray-800
                        font-medium mb-1 text-center line-clamp-1
                        w-full"
                      >
                        {p.name}
                      </p>
                      <span
                        className="bg-red-100 text-red-500
                        text-xs font-semibold px-2 py-0.5
                        rounded-full"
                      >
                        {p.old_price
                          ? `-${Math.round(
                              ((p.old_price - p.price) / p.old_price) * 100,
                            )}%`
                          : "-25%"}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Home and Outdoor ── */}
      <section className="px-4 md:px-10 py-3 md:py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white border
          border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Mobile: heading + source now link */}
          <div
            className="flex items-center justify-between
            px-4 pt-4 pb-2 md:hidden"
          >
            <h3 className="font-bold text-gray-800 text-base">
              Home and outdoor
            </h3>
            <Link to="/products" className="text-blue-600 text-sm font-medium">
              Source now →
            </Link>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Left Promo */}
            <div
              className="hidden md:flex flex-col w-72
              shrink-0 relative overflow-hidden bg-amber-50"
            >
              <div className="p-6 relative z-10">
                <h3
                  className="font-bold text-gray-800 text-xl
                  leading-tight mb-4"
                >
                  Home and
                  <br />
                  outdoor
                </h3>
                <button
                  className="bg-white border border-gray-300
                  shadow-sm text-gray-800 font-medium text-sm
                  px-4 py-2 rounded hover:bg-gray-50"
                >
                  Source now
                </button>
              </div>
              <img
                src={interior1}
                alt="Home"
                className="absolute bottom-0 right-0 w-4/5
                object-contain mix-blend-multiply opacity-90"
              />
            </div>

            {/* Products grid */}
            {/* Mobile: 3-col scroll / Desktop: 4-col grid */}
            <div
              className="flex-1 overflow-x-auto md:overflow-visible
              px-4 pb-4 md:p-0"
            >
              <div
                className="grid grid-cols-3 md:grid-cols-4
                gap-3 md:gap-0 w-full
                md:divide-x md:divide-y md:border-gray-200"
              >
                {interiors.length === 0 && !loading ? (
                  <p className="text-sm text-gray-500 p-4 col-span-3">
                    No interior products.
                  </p>
                ) : (
                  interiors.map((p) => (
                    <Link
                      to={`/product/${p.id}`}
                      key={p.id}
                      className="flex flex-col items-center
                      md:flex-row md:justify-between md:items-center
                      md:border-b md:border-r md:border-gray-200
                      p-2 md:p-4 hover:bg-gray-50 transition
                      rounded-lg md:rounded-none"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-16 w-16 object-contain
                        mix-blend-multiply mb-1 md:mb-0
                        md:order-last md:shrink-0"
                      />
                      <div
                        className="text-center md:text-left
                        md:pr-2 overflow-hidden"
                      >
                        <span
                          className="text-gray-800 font-medium
                          text-xs line-clamp-2 block"
                        >
                          {p.name}
                        </span>
                        <span className="text-gray-400 text-xs mt-0.5">
                          From USD {p.price}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Consumer Electronics ── */}
      <section className="px-4 md:px-10 py-3 md:py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white border
          border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Mobile heading */}
          <div
            className="flex items-center justify-between
            px-4 pt-4 pb-2 md:hidden"
          >
            <h3 className="font-bold text-gray-800 text-base">
              Consumer electronics
            </h3>
            <Link to="/products" className="text-blue-600 text-sm font-medium">
              Source now →
            </Link>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Left Promo */}
            <div
              className="hidden md:flex flex-col w-72
              shrink-0 relative overflow-hidden bg-blue-50"
            >
              <div className="p-6 relative z-10">
                <h3
                  className="font-bold text-gray-800 text-xl
                  leading-tight mb-4"
                >
                  Consumer
                  <br />
                  electronics and
                  <br />
                  gadgets
                </h3>
                <button
                  className="bg-white border border-gray-300
                  shadow-sm text-gray-800 font-medium text-sm
                  px-4 py-2 rounded hover:bg-gray-50"
                >
                  Source now
                </button>
              </div>
              <img
                src={tech1}
                alt="Tech"
                className="absolute bottom-0 right-0 w-4/5
                object-contain mix-blend-multiply opacity-90"
              />
            </div>

            {/* Products grid */}
            <div
              className="flex-1 overflow-x-auto md:overflow-visible
              px-4 pb-4 md:p-0"
            >
              <div
                className="grid grid-cols-3 md:grid-cols-4
                gap-3 md:gap-0 w-full"
              >
                {electronics.length === 0 && !loading ? (
                  <p className="text-sm text-gray-500 p-4 col-span-3">
                    No electronics.
                  </p>
                ) : (
                  electronics.map((p) => (
                    <Link
                      to={`/product/${p.id}`}
                      key={p.id}
                      className="flex flex-col items-center
                      md:flex-row md:justify-between md:items-center
                      md:border-b md:border-r md:border-gray-200
                      p-2 md:p-4 hover:bg-gray-50 transition
                      rounded-lg md:rounded-none"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-16 w-16 object-contain
                        mix-blend-multiply mb-1 md:mb-0
                        md:order-last md:shrink-0"
                      />
                      <div
                        className="text-center md:text-left
                        md:pr-2 overflow-hidden"
                      >
                        <span
                          className="text-gray-800 font-medium
                          text-xs line-clamp-2 block"
                        >
                          {p.name}
                        </span>
                        <span className="text-gray-400 text-xs mt-0.5">
                          From USD {p.price}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Send Quote Banner ── */}
      <section className="px-4 md:px-10 py-4 md:py-6">
        <div
          className="max-w-[1440px] mx-auto rounded-xl
          overflow-hidden"
        >
          {/* Mobile: compact blue banner with button */}
          <div
            className="md:hidden bg-blue-600 rounded-xl
            relative overflow-hidden p-6"
          >
            <img
              src={bannerImage}
              alt=""
              className="absolute inset-0 w-full h-full
              object-cover opacity-20"
            />
            <div className="relative z-10">
              <h2 className="text-white font-bold text-lg mb-2">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-blue-100 text-sm mb-4">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <Link
                to="/products"
                className="inline-block bg-blue-700 text-white
                px-5 py-2 rounded font-medium text-sm
                hover:bg-blue-800 transition"
              >
                Send inquiry
              </Link>
            </div>
          </div>

          {/* Desktop: full form */}
          <div
            className="hidden md:flex border border-gray-200
            rounded-xl overflow-hidden relative"
          >
            <div
              className="flex-1 bg-gradient-to-r
              from-blue-600 to-blue-400 p-8 md:p-12 text-white
              flex flex-col justify-center"
            >
              <h2
                className="text-2xl md:text-3xl font-bold
                mb-4 max-w-md"
              >
                An easy way to send requests to all suppliers
              </h2>
              <p
                className="text-blue-100 text-sm leading-relaxed
                max-w-sm"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div
              className="bg-white border border-gray-200
              shadow-lg rounded-xl p-6 m-4 md:my-6 md:mr-6
              md:-ml-8 w-full md:w-96 shrink-0 relative z-10"
            >
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                Send quote to suppliers
              </h3>
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full border border-gray-300 rounded
                px-3 py-2 text-sm mb-3 focus:outline-none
                focus:border-blue-500"
              />
              <textarea
                placeholder="Type more details"
                rows={3}
                className="w-full border border-gray-300 rounded
                px-3 py-2 text-sm mb-3 focus:outline-none
                focus:border-blue-500 resize-none"
              />
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-1/2 border border-gray-300 rounded
                  px-3 py-2 text-sm focus:outline-none"
                />
                <select
                  className="w-1/2 border border-gray-300
                  rounded px-2 py-2 text-sm focus:outline-none
                  bg-white"
                >
                  <option>Pcs</option>
                  <option>Kg</option>
                </select>
              </div>
              <button
                className="bg-blue-600 text-white px-5 py-2
                rounded font-medium text-sm hover:bg-blue-700"
              >
                Send inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Recommended Items ── */}
      <section className="px-4 md:px-10 py-4 md:py-6">
        <div className="max-w-[1440px] mx-auto">
          <h2
            className="text-lg md:text-xl font-bold
            text-gray-800 mb-4"
          >
            Recommended items
          </h2>
          {/* Mobile: 2-col / Desktop: 5-col */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-3
            md:gap-4"
          >
            {loading ? (
              <p className="text-sm text-gray-500 col-span-2">
                Loading recommendations...
              </p>
            ) : (
              recommended.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="bg-white border border-gray-200
                  rounded-xl p-3 hover:shadow-md transition"
                >
                  <div
                    className="h-32 md:h-40 flex items-center
                    justify-center mb-2"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full
                      object-contain mix-blend-multiply"
                    />
                  </div>
                  <p
                    className="font-bold text-gray-800
                    text-sm md:text-base mb-1"
                  >
                    ${p.price}
                  </p>
                  <p
                    className="text-gray-500 text-xs leading-snug
                    line-clamp-2"
                  >
                    {p.name}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Extra Services ── */}
      <section className="px-4 md:px-10 py-4 md:py-6">
        <div className="max-w-[1440px] mx-auto">
          <h2
            className="text-lg md:text-xl font-bold
            text-gray-800 mb-4"
          >
            Our extra services
          </h2>
          {/* Mobile: 2-col / Desktop: 4-col */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3
            md:gap-6"
          >
            {[
              {
                title: "Source from Industry Hubs",
                icon: "🔍",
                img: interior1,
              },
              { title: "Customize Your Products", icon: "📦", img: tech1 },
              {
                title: "Fast, reliable shipping by ocean or air",
                icon: "✈️",
                img: bannerImage,
              },
              {
                title: "Product monitoring and inspection",
                icon: "🛡️",
                img: interior1,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="border border-gray-200 bg-white
                rounded-xl overflow-hidden hover:shadow-md
                transition cursor-pointer relative"
              >
                <div
                  className="h-24 md:h-32 bg-gray-100
                  overflow-hidden relative"
                >
                  <div
                    className="absolute inset-0 bg-black
                    bg-opacity-30 z-10"
                  />
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-5 relative">
                  <div
                    className="absolute -top-5 right-3
                    md:-top-7 md:right-5 w-10 h-10 md:w-14 md:h-14
                    bg-blue-100 border-4 border-white rounded-full
                    flex items-center justify-center text-base
                    md:text-xl shadow-sm z-20"
                  >
                    {s.icon}
                  </div>
                  <h4
                    className="font-medium text-gray-800
                    text-xs md:text-base leading-tight pr-8
                    md:pr-10 w-4/5"
                  >
                    {s.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Suppliers by Region ── */}
      <section className="px-4 md:px-10 pb-10 pt-4">
        <div className="max-w-[1440px] mx-auto">
          <h2
            className="text-lg md:text-xl font-bold
            text-gray-800 mb-4"
          >
            Suppliers by region
          </h2>
          {/* Mobile: 2-col / Desktop: 5-col */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-3
            md:gap-4"
          >
            {[
              { name: "Arabic Emirates", domain: "shopname.ae", flag: aeFlag },
              { name: "Australia", domain: "shopname.au", flag: aeFlag },
              { name: "United States", domain: "shopname.us", flag: usFlag },
              { name: "Russia", domain: "shopname.ru", flag: usFlag },
              { name: "Italy", domain: "shopname.it", flag: frFlag },
              { name: "Denmark", domain: "denmark.com.dk", flag: deFlag },
              { name: "France", domain: "shopname.com.fr", flag: frFlag },
              { name: "Arabic Emirates", domain: "shopname.ae", flag: aeFlag },
              { name: "China", domain: "shopname.ae", flag: cnFlag },
              { name: "Great Britain", domain: "shopname.co.uk", flag: gbFlag },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 cursor-pointer
                hover:bg-gray-50 py-2 px-2 rounded transition"
              >
                <img
                  src={s.flag}
                  alt={s.name}
                  className="w-6 h-4 md:w-7 md:h-5 object-cover
                  rounded shadow-sm shrink-0"
                />
                <div className="overflow-hidden">
                  <p
                    className="text-xs md:text-sm font-medium
                    text-gray-700 truncate"
                  >
                    {s.name}
                  </p>
                  <p
                    className="text-[10px] md:text-xs text-gray-400
                    truncate"
                  >
                    {s.domain}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
