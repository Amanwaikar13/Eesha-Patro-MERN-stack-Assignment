import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
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
        <div style={{marginLeft:"60px"}}>
            <div style={{marginLeft:"50px"}}>
            <h1 >Transactions</h1>
            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={handleSearchChange}
            />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : transactions.length > 0 ? (
                <div>
                    <table>
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
                    <div>
                        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                        <span>Page {page} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                    </div>
                </div>
            ) : (
                <p>No transactions found</p>
            )}
        </div>
    );
};

export default Transactions;
