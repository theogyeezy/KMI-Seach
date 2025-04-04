import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TargetMunicipality } from '../types';

// This is a placeholder component that would use a charting library like Chart.js or Recharts
// In a real implementation, you would install and import the appropriate library
const RegionalDistributionChart: React.FC = () => {
  const { filteredMunicipalities } = useSelector(
    (state: RootState) => state.municipalities
  );

  // Calculate regional distribution
  const regionCounts = filteredMunicipalities.reduce((acc, item: TargetMunicipality) => {
    const region = item.municipality.region;
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // This would be replaced with actual chart rendering
  return (
    <div className="chart">
      <h3>Regional Distribution</h3>
      <div className="chart-placeholder">
        <div className="chart-legend">
          {Object.entries(regionCounts).map(([region, count]) => (
            <div key={region} className="legend-item">
              <div className={`color-box ${region.toLowerCase()}`}></div>
              <span>{region}: {count}</span>
            </div>
          ))}
        </div>
        <div className="chart-message">
          [Pie chart showing distribution of target municipalities by region]
        </div>
      </div>
    </div>
  );
};

export default RegionalDistributionChart;
