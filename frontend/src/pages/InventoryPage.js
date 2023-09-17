import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (role === "procurer") {
      navigator("/404")
    }
    // Define your API endpoint URL
    const apiUrl = 'http://192.168.151.85:4000/item/get-allItems';
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch data from the API using Axios
    axios.get(apiUrl, { headers })
      .then((response) => {
        // Set the retrieved data to the "items" state
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Items</h1>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card>
              <CardHeader
                title={item.name}
                subheader={`Category: ${item.category}`}
              />
              <div>

                <QRCode
                  size={200}
                  style={{ height: "auto", maxWidth: "75%", width: "75%", align: "center", background: 'white', padding: '16px', marginLeft: '40' }}
                  value={item._id}
                  viewBox={`0 0 256 256`}
                />
              </div>
              {/* <CardMedia
                component="img"
                height="200"
                image="https://via.placeholder.com/200" // Replace with your actual image URL
                alt={item.name}
              /> */}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Location: {item.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Status: {item.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default InventoryPage;
