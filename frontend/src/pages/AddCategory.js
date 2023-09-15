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
function AddCategory() {
    const inputStyle = {
        marginTop: "30px",
        width: "500px"
    }
    const form = {
        marginLeft: "500px",
        marginTop: "300px"
    }
    console.log(token)
    const [formData, setFormData] = useState({
        categoryType: '',
        categoryItems: '',
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
            const response = await axios.post('http://192.168.3.231:4000/category/create-category', formData, { headers });
            console.log(formData)
            if (response.data.message === 'item added') {
                setResponseMessage('Item added successfully');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (
        <>
            < Nav />
            <div style={form}>
                <h1>
                    Add Category
                </h1>
                <form onSubmit={handleSubmit} >
                    <div>
                        <TextField
                            style={inputStyle}
                            label="Category Type"
                            name="categoryType"
                            variant="outlined"
                            value={formData.categoryType}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            style={inputStyle}
                            label="Category Items"
                            name="categoryItems"
                            variant="outlined"
                            value={formData.categoryItems}
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
        </>
    );
}

export default AddCategory;

