import React, { useState, useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Nav from '../layouts/dashboard/nav/index';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const ProcurerHome = () => {
    const [procurers, setProcurers] = useState([]);
    const navigator = useNavigate()

    useEffect(() => {
        console.log(role)
        if (role === "admin") {
            navigator("/404")
        }
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        // Fetch data from the backend API
        axios.get('http://192.168.151.85:4000/procurer/getAllprocurers', { headers })
            .then((response) => {
                console.log(response.data)
                setProcurers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const changeStatus = (id, currentStatus) => {
        // Display a confirmation prompt
        const confirmStatusChange = window.confirm(
            `Are you sure you want to change the status to ${currentStatus === 'pending' ? 'approved' : 'pending'
            }?`
        );

        if (confirmStatusChange) {
            // Determine the new status
            const newStatus = currentStatus === 'pending' ? 'approved' : 'pending';
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            // Send a request to update the status
            axios.put(`http://192.168.151.85:4000/procurement/approve-procurement/${id}`, { headers })
                .then((response) => {
                    // Assuming the API returns updated data, you can update the state with it
                    setProcurers((prevProcurers) =>
                        prevProcurers.map((procurer) =>
                            procurer._id === id ? { ...procurer, procurementStatus: newStatus } : procurer
                        )
                    );
                })
                .catch((error) => {
                    console.error('Error changing status:', error);
                });
        }
    };

    const form = {
        marginLeft: "400px",
        marginTop: "300px"
    }

    return (
        <>
            <Nav />
            <div style={form}>
                <h1>Procurer Home</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {procurers.map((procurer) => (
                                <TableRow key={procurer._id}>
                                    <TableCell>{procurer._id}</TableCell>
                                    <TableCell>{procurer.totalAmount}</TableCell>
                                    <TableCell>{procurer.totalQuantityProcured}</TableCell>
                                    <TableCell>{procurer.procurementStatus}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => changeStatus(procurer._id, procurer.procurementStatus)}
                                        >
                                            Change Status
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default ProcurerHome;
