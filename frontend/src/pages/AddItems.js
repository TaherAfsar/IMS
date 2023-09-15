import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  makeStyles,
  Snackbar, // Import Snackbar component from MUI
} from '@mui/material';
import Nav from 'src/layouts/dashboard/nav/index';
const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const currentDate = `${month} + "/" + ${date} + "/" + ${year}`;
const token = localStorage.getItem('token');
console.log(token)
function AddItems() {
  const inputStyle = {
    marginTop: "30px",
    width: "500px"
  }
  const form = {
    marginLeft: "500px",
    marginTop: "200px"
  }
  console.log(token)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expirationDate: '',
    location: '',
    status: '',
    entryDate: currentDate,
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post('http://192.168.3.231:4000/item/add-item', formData, { headers });
      console.log(formData)
      if (response.data.message === 'item added') {
        setResponseMessage('Iytem added successfully');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      < Nav />
      <form onSubmit={handleSubmit} style={form}>
        <h1>
          Add Items
        </h1>
        <div>
          <TextField
            style={inputStyle}
            label="Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            style={inputStyle}
            label="category"
            name="category"
            variant="outlined"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            style={inputStyle}
            label=""
            name="expirationDate"
            variant="outlined"
            value={formData.expirationDate}
            onChange={handleChange}
            type='date'
          />
        </div>
        <div>
          <TextField
            style={inputStyle}
            label="location"
            name="location"
            variant="outlined"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            style={inputStyle}
            label="status"
            name="status"
            variant="outlined"
            value={formData.status}
            onChange={handleChange}
          />
        </div>

        <Button
          style={inputStyle}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>


      </form>

      {/* Snackbar to display the response message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message={responseMessage}
      />
    </div>
  );
}

export default AddItems;

