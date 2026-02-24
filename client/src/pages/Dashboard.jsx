import { useEffect, useState } from "react";
import API from "../api/axios";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    await API.post("/products", product);
    setShowAddForm(false);
    fetchProducts();
  };

  const updateProduct = async (product) => {
    await API.put(`/products/${product._id}`, product);
    setEditingProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Inventory Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Manage your products efficiently
            </p>
          </div>

          <div className="flex gap-4">

            {/* Add Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              ➕ <span>Add</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => setConfirmLogout(true)}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              🚪 <span>Logout</span>
            </button>

          </div>
        </div>

        {/* Add Product Modal */}
        {showAddForm && (
          <AddProductForm
            onAdd={addProduct}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onUpdate={updateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        {/* Logout Confirmation Modal */}
        {confirmLogout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-4">
                  <span className="text-red-600 text-2xl">🚪</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Logout
                </h3>
              </div>

              <p className="text-gray-600 text-center mb-8">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setConfirmLogout(false);
                    logout();
                  }}
                  className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow"
                >
                  Logout
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Product List OR Empty State */}
        {products.length > 0 ? (
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={deleteProduct}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">

            <div className="text-7xl mb-6">📦</div>

            <h2 className="text-2xl font-semibold text-gray-700">
              No Products Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start by adding your first product.
            </p>

            <button
              onClick={() => setShowAddForm(true)}
              className="mt-8 flex items-center gap-2 mx-auto px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              ➕ Add Product
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;