import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import bannerImage from "../assets/assets/Image/backgrounds/Banner-board-800x420 2.png";
import interior1 from "../assets/assets/Image/interior/1.png";
import interior2 from "../assets/assets/Image/interior/3.png";
import interior3 from "../assets/assets/Image/interior/6.png";
import interior4 from "../assets/assets/Image/interior/7.png";
import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 34.png";
import tech4 from "../assets/assets/Image/tech/image 32.png";
import tech5 from "../assets/assets/Image/tech/image 33.png";
import tech6 from "../assets/assets/Image/tech/image 85.png";
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from "../assets/assets/Layout/alibaba/Image/cloth/image 26.png";
import cloth4 from "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";

// Flag images
import aeFlag from "../assets/assets/Layout1/Image/flags/AE@2x.png";
import usFlag from "../assets/assets/Layout1/Image/flags/US@2x.png";
import gbFlag from "../assets/assets/Layout1/Image/flags/GB@2x.png";
import cnFlag from "../assets/assets/Layout1/Image/flags/CN@2x.png";
import deFlag from "../assets/assets/Layout1/Image/flags/DE@2x.png";
import frFlag from "../assets/assets/Layout1/Image/flags/FR@2x.png";

// ── Countdown Timer Hook ──────────────────────────────
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

  return (
    <div style={{ backgroundColor: "#F7FAFC" }}>
      {/* ── SECTION 1: 3-Column Hero ── */}
      <section className="px-4 md:px-10 py-4">
        <div className="max-w-[1440px] mx-auto flex gap-3">
          {/* Column 1: Category Sidebar */}
          <div
            className="hidden md:block w-48 bg-white
            rounded-lg p-4 shadow-sm shrink-0"
          >
            <ul className="text-sm space-y-2 text-gray-600">
              {[
                "Automobiles",
                "Clothes and wear",
                "Home interiors",
                "Computer and tech",
                "Tools, equipments",
                "Sports and outdoor",
                "Animal and pets",
                "Machinery tools",
              ].map((item, i) => (
                <li
                  key={item}
                  className={`cursor-pointer hover:text-blue-600 py-0.5
                  ${i === 0 ? "text-blue-600 font-semibold" : ""}`}
                >
                  {item}
                </li>
              ))}
              <li
                className="text-blue-600 cursor-pointer
                hover:underline pt-1"
              >
                More category
              </li>
            </ul>
          </div>

          {/* Column 2: Hero Banner */}
          <div
            className="flex-1 rounded-xl overflow-hidden
            relative min-h-[200px]"
          >
            <img
              src={bannerImage}
              alt="Hero"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div className="absolute top-6 left-6">
              <p className="text-gray-600 text-sm">Latest trending</p>
              <h2
                className="text-xl md:text-2xl font-bold
                text-gray-800"
              >
                Electronic items
              </h2>
              <Link
                to="/products"
                className="inline-block mt-3 border border-gray-700
                text-gray-700 px-4 py-1 rounded text-sm
                hover:bg-gray-100 transition"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Column 3: Login + Offer boxes */}
          <div className="hidden md:flex flex-col gap-2 w-44 shrink-0">
            <div className="bg-white rounded-lg p-3 shadow-sm text-sm">
              <p className="text-gray-600 text-xs mb-2">
                Hi, user
                <br />
                <span className="font-semibold text-gray-800">
                  let's get started
                </span>
              </p>
              <button
                className="w-full bg-blue-600 text-white
                py-1.5 rounded mb-1.5 text-xs hover:bg-blue-700"
              >
                Join now
              </button>
              <button
                className="w-full border border-blue-600
                text-blue-600 py-1.5 rounded text-xs hover:bg-blue-50"
              >
                Log in
              </button>
            </div>
            <div
              className="bg-orange-400 text-white rounded-lg
              p-3 text-xs leading-relaxed"
            >
              Get US $10 off with a new supplier
            </div>
            <div
              className="bg-teal-500 text-white rounded-lg
              p-3 text-xs leading-relaxed"
            >
              Send quotes with supplier preferences
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Deals & Offers ── */}
      <section className="px-4 md:px-10 py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white
          rounded-xl p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div>
              <p className="font-semibold text-gray-800">Deals and offers</p>
              <p className="text-gray-400 text-xs">Hygiene equipments</p>
            </div>
            {/* Countdown */}
            <div className="flex gap-2 ml-2">
              {[
                { n: String(time.days).padStart(2, "0"), l: "Days" },
                { n: String(time.hours).padStart(2, "0"), l: "Hour" },
                { n: String(time.mins).padStart(2, "0"), l: "Min" },
                { n: String(time.secs).padStart(2, "0"), l: "Sec" },
              ].map((t) => (
                <div
                  key={t.l}
                  className="bg-gray-800 text-white text-xs
                  px-2 py-1 rounded text-center min-w-[40px]"
                >
                  <div className="font-bold text-sm">{t.n}</div>
                  <div className="text-gray-400">{t.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: "Smart watches", discount: "-25%", img: tech1 },
              { name: "Laptops", discount: "-15%", img: tech2 },
              { name: "GoPro cameras", discount: "-40%", img: tech3 },
              { name: "Headphones", discount: "-25%", img: tech4 },
              { name: "Canon cameras", discount: "-25%", img: tech5 },
            ].map((p, i) => (
              <Link
                to={`/product/${i + 1}`}
                key={p.name}
                className="border rounded-xl p-3 text-center
                hover:shadow-md transition block"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-20 mx-auto object-contain mb-2"
                />
                <p className="text-xs text-gray-700 mb-1">{p.name}</p>
                <span
                  className="bg-red-100 text-red-500
                  text-xs px-2 py-0.5 rounded-full"
                >
                  {p.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Home and Outdoor ── */}
      <section className="px-4 md:px-10 py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white
          rounded-xl p-5 shadow-sm flex gap-4"
        >
          {/* Left promo */}
          <div
            className="hidden md:flex flex-col justify-between
            w-44 shrink-0 bg-amber-50 rounded-xl p-4"
          >
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Home and outdoor</h3>
              <button
                className="mt-3 border border-gray-600
                text-gray-700 text-xs px-4 py-1.5 rounded
                hover:bg-gray-100"
              >
                Source now
              </button>
            </div>
            <img
              src={interior1}
              alt="Home"
              className="h-24 object-contain mt-2"
            />
          </div>

          {/* Products grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                id: 6,
                name: "Soft chairs",
                price: "From USD 19",
                img: interior1,
              },
              {
                id: 6,
                name: "Sofa & chair",
                price: "From USD 19",
                img: interior2,
              },
              {
                id: 7,
                name: "Kitchen dishes",
                price: "From USD 19",
                img: interior3,
              },
              {
                id: 2,
                name: "Smart watches",
                price: "From USD 19",
                img: tech1,
              },
              {
                id: 7,
                name: "Kitchen mixer",
                price: "From USD 100",
                img: interior4,
              },
              { id: 7, name: "Blenders", price: "From USD 39", img: interior2 },
              {
                id: 6,
                name: "Home appliance",
                price: "From USD 19",
                img: interior3,
              },
              {
                id: 7,
                name: "Coffee maker",
                price: "From USD 10",
                img: interior1,
              },
            ].map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.name}
                className="flex items-center gap-3 p-2
                hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-14 w-14 object-contain shrink-0"
                />
                <div>
                  <p className="text-xs font-medium text-gray-700">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Consumer Electronics ── */}
      <section className="px-4 md:px-10 py-4">
        <div
          className="max-w-[1440px] mx-auto bg-white
          rounded-xl p-5 shadow-sm flex gap-4"
        >
          {/* Left promo */}
          <div
            className="hidden md:flex flex-col justify-between
            w-44 shrink-0 bg-blue-50 rounded-xl p-4"
          >
            <div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm">
                Consumer electronics and gadgets
              </h3>
              <button
                className="mt-3 border border-gray-600
                text-gray-700 text-xs px-4 py-1.5 rounded
                hover:bg-gray-100"
              >
                Source now
              </button>
            </div>
            <img
              src={tech1}
              alt="Electronics"
              className="h-24 object-contain mt-2"
            />
          </div>

          {/* Products grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                id: 2,
                name: "Smart watches",
                price: "From USD 19",
                img: tech1,
              },
              { id: 3, name: "Cameras", price: "From USD 89", img: tech3 },
              { id: 1, name: "Headphones", price: "From USD 70", img: tech4 },
              {
                id: 2,
                name: "Premium Smart watches",
                price: "From USD 90",
                img: tech2,
              }, 
              { id: 5, name: "Gaming set", price: "From USD 35", img: tech5 },
              {
                id: 3,
                name: "Laptops & PC",
                price: "From USD 340",
                img: tech2,
              },
              { id: 2, name: "Smartphones", price: "From USD 19", img: tech6 },
              {
                id: 4,
                name: "Electric kettle",
                price: "From USD 240",
                img: tech3,
              },
            ].map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.name}
                className="flex items-center gap-3 p-2
                hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-14 w-14 object-contain shrink-0"
                />
                <div>
                  <p className="text-xs font-medium text-gray-700">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Send Quote Banner ── */}
      <section className="px-4 md:px-10 py-4">
        <div
          className="max-w-[1440px] mx-auto rounded-xl
          overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left blue */}
          <div
            className="flex-1 bg-blue-600 p-8 text-white
            flex flex-col justify-center"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          {/* Right white form */}
          <div className="bg-white p-6 w-full md:w-80 shrink-0">
            <h3 className="font-semibold text-gray-800 mb-4">
              Send quote to suppliers
            </h3>
            <p className="text-sm text-gray-500 mb-1">What item you need?</p>
            <input
              type="text"
              placeholder="Type item name"
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
                className="flex-1 border border-gray-300 rounded
                px-3 py-2 text-sm focus:outline-none"
              />
              <select
                className="border border-gray-300 rounded
                px-2 py-2 text-sm focus:outline-none"
              >
                <option>Pcs</option>
                <option>Kg</option>
              </select>
            </div>
            <button
              className="w-full bg-blue-600 text-white
              py-2 rounded font-medium text-sm hover:bg-blue-700"
            >
              Send inquiry
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Recommended Items ── */}
      <section className="px-4 md:px-10 py-6">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recommended items
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                name: "T-shirts with multiple colors",
                price: "$10.30",
                img: cloth1,
              },
              {
                name: "Jeans shorts for men blue color",
                price: "$10.30",
                img: cloth2,
              },
              {
                name: "Brown winter coat medium size",
                price: "$12.50",
                img: cloth3,
              },
              {
                name: "Jeans bag for travel for men",
                price: "$34.00",
                img: cloth4,
              },
              { name: "Leather wallet", price: "$99.00", img: cloth1 },
              {
                name: "Canon camera black 100x zoom",
                price: "$9.99",
                img: tech3,
              },
              {
                name: "Headset for gaming with mic",
                price: "$8.99",
                img: tech4,
              },
              {
                name: "Smartwatch silver color modern",
                price: "$10.30",
                img: tech1,
              },
              {
                name: "Blue wallet for men leather",
                price: "$10.30",
                img: cloth2,
              },
              {
                name: "Jeans bag for travel for men",
                price: "$80.95",
                img: cloth3,
              },
            ].map((p, i) => (
              <Link
                to={`/product/${i + 1}`}
                key={i}
                className="bg-white border rounded-xl p-3
                hover:shadow-md transition"
              >
                <div
                  className="h-36 flex items-center
                  justify-center mb-2"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="font-bold text-gray-800 text-sm">{p.price}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  {p.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Extra Services ── */}
      <section className="px-4 md:px-10 py-4">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Our extra services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Source from Industry Hubs",
                icon: "🏭",
                img: interior1,
              },
              { title: "Customize Your Products", icon: "🎨", img: cloth1 },
              {
                title: "Fast, reliable shipping by ocean or air",
                icon: "✈️",
                img: tech2,
              },
              {
                title: "Product monitoring and inspection",
                icon: "🔍",
                img: tech3,
              },
            ].map((s) => (
              <div
                key={s.title}
                className="relative rounded-xl overflow-hidden
                h-36 cursor-pointer group"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black
                  bg-opacity-40 group-hover:bg-opacity-50
                  transition"
                />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-xs font-medium mt-1 leading-tight">
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Suppliers by Region ── */}
      <section className="px-4 md:px-10 py-6">
        <div
          className="max-w-[1440px] mx-auto bg-white
          rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Suppliers by region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Arabic Emirates", domain: "shopname.ae", flag: aeFlag },
              { name: "United States", domain: "shopname.us", flag: usFlag },
              { name: "Great Britain", domain: "shopname.co.uk", flag: gbFlag },
              { name: "China", domain: "shopname.ae", flag: cnFlag },
              { name: "Germany", domain: "shopname.de", flag: deFlag },
              { name: "France", domain: "shopname.com.fr", flag: frFlag },
              { name: "Australia", domain: "shopname.ae", flag: aeFlag },
              { name: "Russia", domain: "shopname.ae", flag: usFlag },
            ].map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3
                cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <img
                  src={s.flag}
                  alt={s.name}
                  className="w-8 h-6 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
