import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Electronics",
    stock: "",
    old_price: "",
  });
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please login first.");
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  // READ: Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=100`,
      );
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // CREATE & UPDATE: Form Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      old_price: formData.old_price ? parseFloat(formData.old_price) : null,
    };

    try {
      const url = editingId
        ? `${process.env.REACT_APP_API_URL}/products/${editingId}`
        : `${process.env.REACT_APP_API_URL}/products/`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔒 GUARD
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        setError("Action Forbidden! You do not have Admin privileges.");
        return;
      }

      if (res.ok) {
        setToastMsg(
          editingId
            ? "✅ Product Updated Successfully!"
            : "✅ Product Created Successfully!",
        );
        setTimeout(() => setToastMsg(""), 3000);
        resetForm();
        fetchProducts(); 
      } else {
        const data = await res.json();
        setError(JSON.stringify(data.detail));
      }
    } catch (err) {
      setError("Network error occurred.");
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "",
      category: product.category,
      stock: product.stock,
      old_price: product.old_price || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE: Remove product
  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you strictly sure you want to delete this product?")
    )
      return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 🔒 GUARD
        },
      });

      if (res.status === 401 || res.status === 403) {
        setToastMsg("Action Forbidden! You do not have Admin privileges.");
        setTimeout(() => setToastMsg(""), 3000);
        return;
      }

      if (res.ok || res.status === 204) {
        alert("🗑️ Product Deleted!");
        fetchProducts();
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "Electronics",
      stock: "",
      old_price: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── ADD / EDIT PRODUCT FORM ─── */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />

              <div className="flex gap-2">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Price ($)"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-1/2 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Old Price (Opt)"
                  value={formData.old_price}
                  onChange={(e) =>
                    setFormData({ ...formData, old_price: e.target.value })
                  }
                  className="w-1/2 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <input
                required
                type="text"
                placeholder="Image URL (e.g. /product_images/1.png)"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />

              <div className="flex gap-2">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-1/2 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option>Electronics</option>
                  <option>Interior</option>
                  <option>Clothing</option>
                  <option>Deals</option>
                </select>
                <input
                  required
                  type="number"
                  placeholder="Stock Qty"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-1/2 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                rows="3"
              />

              <button
                type="submit"
                className={`w-full text-white font-medium py-2 rounded transition ${editingId ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {editingId ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>

          {/* ─── MANAGE PRODUCTS TABLE (READ, UPDATE, DELETE) ─── */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Manage Products ({products.length})
              </h2>
            </div>
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Image</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2">
                        <img
                          src={p.image}
                          alt="img"
                          className="w-10 h-10 object-contain mix-blend-multiply"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-800 truncate max-w-[200px]">
                        {p.name}
                      </td>
                      <td className="px-4 py-2">${p.price}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 border border-blue-200 rounded bg-white hover:bg-blue-50 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-500 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded bg-white hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {toastMsg && (
        <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce transition-all">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
