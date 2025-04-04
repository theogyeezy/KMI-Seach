import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TargetMunicipality } from '../types';

// This is a placeholder component that would use a charting library like Chart.js or Recharts
// In a real implementation, you would install and import the appropriate library
const BondAmountChart: React.FC = () => {
  const { filteredMunicipalities } = useSelector(
    (state: RootState) => state.municipalities
  );

  // Calculate bond amount ranges
  const bondRanges = {
    'Under $3M': 0,
    '$3M - $5M': 0,
    '$5M - $7M': 0,
    '$7M - $10M': 0,
    'Over $10M': 0
  };

  filteredMunicipalities.forEach((item: TargetMunicipality) => {
    const amount = item.bond.amount;
    if (amount < 3000000) {
      bondRanges['Under $3M']++;
    } else if (amount < 5000000) {
      bondRanges['$3M - $5M']++;
    } else if (amount < 7000000) {
      bondRanges['$5M - $7M']++;
    } else if (amount < 10000000) {
      bondRanges['$7M - $10M']++;
    } else {
      bondRanges['Over $10M']++;
    }
  });

  // This would be replaced with actual chart rendering
  return (
    <div className="chart">
      <h3>Bond Amount Distribution</h3>
      <div className="chart-placeholder">
        <div className="chart-legend">
          {Object.entries(bondRanges).map(([range, count]) => (
            <div key={range} className="legend-item">
              <div className={`color-box bond-${range.replace(/\$/g, '').replace(/\s/g, '-').toLowerCase()}`}></div>
              <span>{range}: {count}</span>
            </div>
          ))}
        </div>
        <div className="chart-message">
          [Bar chart showing distribution of bond amounts across target municipalities]
        </div>
      </div>
    </div>
  );
};

export default BondAmountChart;
