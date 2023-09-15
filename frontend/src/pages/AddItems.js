import React, { useState } from 'react';

function AddItems() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    entryDate: '',
    expirationDate: '',
    location: '',
    status: 'Broken', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access all the form data in the 'formData' object
    console.log(formData);
    // Here, you can perform any further actions like sending the data to a server or updating the state in your app.
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="Beverages">Beverages</option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>
        <div>
          <label htmlFor="entryDate">Entry Date:</label>
          <input type="text" id="entryDate" name="entryDate" value={formData.entryDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="Broken">Broken</option>
            <option value="Fixing">Fixing</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddItems;
