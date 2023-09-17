import React, { useEffect, useState } from 'react';
import Nav from '../layouts/dashboard/nav/index';

const ViewReportsPage = () => {
    const [reports, setReports] = useState([]);

    // Fetch data from your API endpoint
    useEffect(() => {
        fetch('http://192.168.151.85:4000/report/getAllReports')
            .then((response) => response.json())
            .then((data) => setReports(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '75%',
        margin: 'right',
        marginLeft: '300px',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
        backgroundColor: '#f2f2f2',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    };

    return (
        <div>
            <Nav />
            <h1>View Reports</h1>
            <table style={tableStyle}>

                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Report Details</th>
                        <th style={thStyle}>Report Status</th>
                        <th style={thStyle}>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id}>
                            <td style={tdStyle}>{report._id}</td>
                            <td style={tdStyle}>{report.reportDetails}</td>
                            <td style={tdStyle}>{report.reportStatus}</td>
                            <td style={tdStyle}>{new Date(report.createdDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewReportsPage;
