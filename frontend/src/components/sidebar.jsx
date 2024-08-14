import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCartFlatbed, faMagnifyingGlassChart, faChartPie, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import styles from '../styling/sidebar-style.module.css';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
    <div className='contact-background-image'></div>
    <div
      className={`${styles.sidebarModule} ${isHovered ? styles.sidebarModuleOpen : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className={styles.ulModule}>
        <li className={styles.liModule}>
        <Link to="/" className={styles.link}>
          <div className={styles.iconContainerModule}>
            <FontAwesomeIcon style={{color:" #006be6"}} icon={faHome} />
            {isHovered && <span>Dashboard</span>}
          </div>
         </Link> 
        </li>
        <li className={styles.liModule}>
        <Link to="/products" className={styles.link}>
          <div className={styles.iconContainerModule}>
          <FontAwesomeIcon style={{color:" #006be6"}} icon={faCartFlatbed} />
            {isHovered && <span>Products</span>}
          </div>
        </Link>  
        </li>
        <li className={styles.liModule}>
        <Link to="/statistics" className={styles.link}>
          <div className={styles.iconContainerModule}>
          <FontAwesomeIcon style={{color:" #006be6"}} icon={faMagnifyingGlassChart} />
            {isHovered && <span>Statertics</span>}
          </div>
        </Link>  
        </li>
        <li className={styles.liModule}>
        <Link to="/barchart" className={styles.link}>
          <div className={styles.iconContainerModule}>
          <FontAwesomeIcon style={{color:" #006be6"}} icon={faChartColumn} />
            {isHovered && <span>BarChart</span>}
          </div>
        </Link> 
        </li>
        <li className={styles.liModule}>
        <Link to="/piechart" className={styles.link}>
          <div className={styles.iconContainerModule}>
          <FontAwesomeIcon style={{color:" #006be6"}} icon={faChartPie} />
            {isHovered && <span>PieChart</span>}
          </div>
        </Link> 
        </li>
      </ul>
    </div>
    </>  
  );
};


export default Sidebar;
