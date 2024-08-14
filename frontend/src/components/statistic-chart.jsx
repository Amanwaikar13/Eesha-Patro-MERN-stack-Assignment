import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/graph-styling.css';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, [month]);
    

    const fetchStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/statistics', {
                params: { month }
            });
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setError('Error fetching statistics. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <div className="statistics-container">
            <h1 className="statistics-title">Transaction Statistics</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : statistics ? (
                <div className="statistics-content">
                    <p><strong>Total Sale Amount:</strong> ${statistics.totalSaleAmount.toFixed(2)}</p>
                    <p><strong>Total Sold Items:</strong> {statistics.totalSoldItems}</p>
                    <p><strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}</p>
                </div>
            ) : (
                <p>No statistics available</p>
            )}
        </div>
    );
};

export default Statistics;
