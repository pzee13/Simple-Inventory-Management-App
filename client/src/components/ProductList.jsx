function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td className="space-x-2">
                <button onClick={() => onEdit(p)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => onDelete(p._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;