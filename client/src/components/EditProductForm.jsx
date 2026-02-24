import { useState, useEffect } from "react";

function EditProductForm({ product, onUpdate, onCancel }) {
  const [form, setForm] = useState(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Edit Product
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Update product details below
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-5">

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Product Name
              </label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Description
              </label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Quantity
              </label>
              <input
                type="number"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                required
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-4">

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Update Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProductForm;