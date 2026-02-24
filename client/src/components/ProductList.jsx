import { useState, useMemo } from "react";

function ProductList({ products, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete._id);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">

        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Product List
          </h2>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Product Name</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr
                    key={p._id}
                    onClick={() => setViewProduct(p)}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-5 font-medium align-middle">
                      {p.name}
                    </td>

                    <td className="px-6 py-5 max-w-xs align-middle">
                      <div className="truncate text-gray-700">
                        {p.description}
                      </div>
                    </td>

                    <td className="px-6 py-5 align-middle">
                      ₹{p.price}
                    </td>

                    <td className="px-6 py-5 text-center align-middle">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {p.quantity}
                      </span>
                    </td>

                    <td
                      className="px-6 py-5 text-right align-middle"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-3">

                        <button
                          onClick={() => onEdit(p)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="Edit"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => setProductToDelete(p)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Delete"
                        >
                          🗑️
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW PRODUCT MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {viewProduct.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Product Details
                </p>
              </div>

              <button
                onClick={() => setViewProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-gray-700">

              <div>
                <span className="text-sm text-gray-500">Description</span>
                <p className="mt-1 leading-relaxed">
                  {viewProduct.description}
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Price</span>
                  <p className="font-medium">₹{viewProduct.price}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Quantity</span>
                  <p className="font-medium">{viewProduct.quantity}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {productToDelete.name}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;