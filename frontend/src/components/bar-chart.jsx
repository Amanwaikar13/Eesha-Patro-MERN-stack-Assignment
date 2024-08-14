import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styling/graph-styling.css';


const BarChartComponent = ({ month }) => {
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBarData();
    }, [month]);

    const fetchBarData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/bar-chart', {
                params: { month }
            });
            const data = response.data;

            const formattedData = Object.keys(data).map(key => ({
                range: key,
                count: data[key]
            }));

            setBarData(formattedData);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
            setError('Error fetching bar chart data. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <div className="barchart-container">
            <h2>Transaction Bar Chart for Month: {month}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};


export default BarChartComponent;
