import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchMunicipalities } from '../store/municipalitiesSlice';
import FilterPanel from './FilterPanel';
import MunicipalityList from './MunicipalityList';
import RegionalDistributionChart from './RegionalDistributionChart';
import BondAmountChart from './BondAmountChart';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMunicipalities());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>KMI Sports Construction Strategic Scaling Tool</h1>
        <p>Identify small towns with active municipal bonds for athletic facilities near DIII, DII, and NAIA schools</p>
      </header>
      
      <div className="dashboard-content">
        <aside className="filter-sidebar">
          <FilterPanel />
        </aside>
        
        <main className="results-area">
          <div className="charts-container">
            <div className="chart-box">
              <RegionalDistributionChart />
            </div>
            <div className="chart-box">
              <BondAmountChart />
            </div>
          </div>
          
          <MunicipalityList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
