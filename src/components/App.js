import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

// Sample product data
const initialProducts = [
  { id: 1, name: "iPhone 14", description: "Apple iPhone 14 with A15 Bionic chip.", price: "$799" },
  { id: 2, name: "Samsung Galaxy S23", description: "Samsung Galaxy S23 with Snapdragon 8 Gen 2.", price: "$999" },
  { id: 3, name: "Google Pixel 7", description: "Google Pixel 7 with Google Tensor chip.", price: "$599" },
];

// Home Page Component
function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Mobile Store</h1>
      <input
        type="text"
        placeholder="Search for a product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

// Product Details Component
function ProductDetails() {
  const { id } = useParams();
  const product = initialProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

// Admin Page Component
function Admin() {
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (id) => {
    const newName = prompt("Enter new name:");
    const newDescription = prompt("Enter new description:");
    const newPrice = prompt("Enter new price:");

    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, name: newName, description: newDescription, price: newPrice }
          : product
      )
    );
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <button onClick={() => editProduct(product.id)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
