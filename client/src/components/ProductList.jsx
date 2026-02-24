import { useState } from "react";

function AddProductForm({ onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(product);
        setProduct({ name: "", description: "", price: "", quantity: "" });
      }}
      className="bg-white p-6 rounded-lg shadow mb-6"
    >
      <h3 className="font-bold mb-4">Add Product</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Description"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Price"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Quantity"
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}

export default AddProductForm;