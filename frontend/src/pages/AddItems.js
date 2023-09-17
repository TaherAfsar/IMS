import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  makeStyles,
  Snackbar,
  Card,
  FormControl, // Import FormControl and Select from MUI
  Select,
  MenuItem,
  FormLabel,
} from '@mui/material';
import Nav from '../layouts/dashboard/nav/index';

const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const currentDate = `${month} + "/" + ${date} + "/" + ${year}`;
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

function AddItems() {
  const inputStyle = {
    marginTop: '30px',
    width: '500px',
  };

  const form = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Center vertically within the viewport
  };

  const [formData, setFormData] = useState({
    name: '',
    category: '', // Add category field to your form data
    expirationDate: '',
    location: '',
    status: '',
    entryDate: currentDate,
  });

  const [categories, setCategories] = useState([]); // State to hold categories
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
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        'http://192.168.151.85:4000/item/add-item',
        formData,
        { headers }
      );
      if (response.data.message === 'item added') {
        setResponseMessage('Item added successfully');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    }
    if (role === "procurer") {
      navigator('/404');
    }
    // Fetch categories from the API
    axios
      .get('http://192.168.151.85:4000/category/view-category-list', { headers })
      .then((response) => {
        // Extract category types from the API response and set them in the state
        const categoryTypes = response.data.data.map((category) => category.categoryType);
        setCategories(categoryTypes);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <Card>
        <div>
          <Nav />
          <form onSubmit={handleSubmit} style={form}>
            <h1>Add Items</h1>
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
              <FormControl variant="outlined" style={inputStyle}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select a category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                style={inputStyle}

                name="expirationDate"
                variant="outlined"
                value={formData.expirationDate}
                onChange={handleChange}
                type="date"
              />
            </div>
            <div>
              <TextField
                style={inputStyle}
                label="Location"
                name="location"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                style={inputStyle}
                label="Status"
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
      </Card>
    </div>
  );
}

export default AddItems;
