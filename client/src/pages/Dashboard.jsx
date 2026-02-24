import { useEffect, useState } from "react";
import API from "../api/axios";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    await API.post("/products", product);
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <AddProductForm onAdd={addProduct} />
      <EditProductForm
        product={editingProduct}
        onUpdate={updateProduct}
        onCancel={() => setEditingProduct(null)}
      />
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}

export default Dashboard;