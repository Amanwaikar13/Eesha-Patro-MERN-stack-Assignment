import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Statistics from './statistic-chart';
import PieChart from './pie-chart';
import BarChartComponent from './bar-chart';
import {FaSearch} from "react-icons/fa";

import '../styling/product-table-style.css'; 

const Transactions = () => {
    const [month, setMonth] = useState('3');
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, [search, page]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/transactions', {
                params: {
                    search,
                    page,
                    perPage
                }
            });
            setTransactions(response.data.transactions); 
            setTotalPages(response.data.totalPages); 
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('Error fetching transactions. Please try again later.');
        }
        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); 
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div style={{ margin: "30px 150px" }}>
            <div className="transactions-container" >
                <div className="search-container">
                    <FaSearch style={{fontSize:"20px",color:"black",cursor:"text"}} id="search-icon" />
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={search}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : transactions.length > 0 ? (
                <div>
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Sold</th>
                                <th>Date of Sale</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                    <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                    <td><img src={transaction.image} alt={transaction.title} style={{ width: '100px', height: 'auto' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                        <span>Page {page} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                    </div>
                </div>
            ) : (
                <p>No transactions found</p>
            )}

            <div className="header-container">
                <h1>Transaction Data</h1>
                <div className="month-selector-container">
                    <label htmlFor="month-selector">Select Month: </label>
                    <select id="month-selector" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <div style={{display:"flex", width:"100%", marginBottom:"30px"}}>
            <Statistics style={{width:"200px"}} month={month} />
            <PieChart month={month} />
            </div>
            <BarChartComponent month={month} />
        </div>
    );
};

export default Transactions;
