import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styling/graph-styling.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/pie-chart', {
                    params: { month }
                });
                const counts = response.data;
                const labels = Object.keys(counts);
                const values = Object.values(counts);

                setCategoryCounts(counts);

                setData({
                    labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF9F40',
                            '#4BC0C0',
                            '#9966FF',
                            '#FFD700',
                            '#00CED1',
                            '#FF6347',
                            '#7B68EE',
                            '#20B2AA',
                            '#FFA07A'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF9F40',
                            '#4BC0C0',
                            '#9966FF',
                            '#FFD700',
                            '#00CED1',
                            '#FF6347',
                            '#7B68EE',
                            '#20B2AA',
                            '#FFA07A'
                        ],
                        borderWidth: 1,
                    }]
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching pie chart data:', err);
                setError('Error fetching pie chart data. Please try again later.');
            }
            setLoading(false);
        };

        fetchData();
    }, [month]);

    return (
        <div className="pie-chart-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="chart-container">
                    <h1 style={{marginBottom:"0"}}> Pie Chart </h1>
                    <Pie    
                                        
                    data={data} 
                            options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                            legend: {
                                position: 'right',
                            },
                            tooltip: {
                                callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                                }
                                }
                            }
                            },
                            layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                            }
                        }} 
                        width={300}
                        height={300}
                        />
                    </div>
                    <ul className="category-list" style={{width:"300px"}}>
                        <h2>Pie Chart for Month: <span style={{color:"#6b6b6b"}}>{month}</span></h2>
                        {Object.entries(categoryCounts).map(([category, count], index) => (
                            <li key={index} className="category-item">
                                <span className="category-name">{category}: </span>
                                <span className="category-count">{count} items</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PieChart;