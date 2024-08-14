
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/search-bar'
// import Statistics from './components/_statistic'
// import PieChart from './components/_pie-chart';
// import BarChartComponent from './components/_barChart';
import ProductTable from './components/product-table';
import NavBar from './components/navbar';
import Sidebar from './components/sidebar';
import './App.css';

const Layout = ({ children }) => (
  <div className="layout">
    <NavBar />
    <Sidebar />
    {children}
  </div>
);

function App() {
  // const [month, setMonth] = useState('3');
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<ProductTable />} />
                  <Route path="/products" element={<SearchBar />} />
                  {/* <Route path="/statistics" element={<Statistics />} />
                  <Route path="/barchart" element={<BarChartComponent />} />
                  <Route path="/piechart" element={<PieChart />} />
                  <Route path="/settings" element={<Statistics />} /> */}
                  
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
