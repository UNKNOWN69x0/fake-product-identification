import React, { useState } from 'react';
import '../styles/addproductmanufacturer.css'; // We'll extract the CSS separately

const AddProductManufacturer = () => {
  const [formData, setFormData] = useState({
    manufacturerID: '',
    productName: '',
    productSN: '',
    productBrand: '',
    productPrice: ''
  });

  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically connect to your blockchain smart contract
    console.log('Form submitted:', formData);
    // Add your blockchain interaction logic here
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className="app">
      {/* Modern Navigation */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            ChainVerify
          </a>
          <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
            <a href="/">Home</a>
            <a href="/manufacturer" className="active">Manufacturer</a>
            <a href="/seller">Seller</a>
            <a href="/consumer">Consumer</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h2>Add New Product</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="manufacturerID">Manufacturer ID</label>
                <input 
                  type="text" 
                  id="manufacturerID" 
                  value={formData.manufacturerID}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="productName">Product Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  value={formData.productName}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="productSN">Serial Number</label>
                <input 
                  type="text" 
                  id="productSN" 
                  value={formData.productSN}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="productBrand">Brand</label>
                <input 
                  type="text" 
                  id="productBrand" 
                  value={formData.productBrand}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="productPrice">Price</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  value={formData.productPrice}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <button type="submit">Register Product on Blockchain</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductManufacturer;