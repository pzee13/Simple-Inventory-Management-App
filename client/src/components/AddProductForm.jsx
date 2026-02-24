import { useState } from "react";

function AddProductForm({ onAdd, onClose }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    setProduct({ name: "", description: "", price: "", quantity: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Add New Product
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Enter product details below
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-6">

            {/* Product Name */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Product Name
              </label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Description
              </label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                required
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                required
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Quantity
              </label>
              <input
                type="number"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
                required
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Add Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddProductForm;