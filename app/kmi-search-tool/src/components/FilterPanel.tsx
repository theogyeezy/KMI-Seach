import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setFilterOptions, resetFilters } from '../store/municipalitiesSlice';
// import { FilterOptions } from '../types';

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filterOptions } = useSelector((state: RootState) => state.municipalities);
  
  const regions = ['Northeast', 'Midwest', 'South', 'West'];
  const divisions = ['DIII', 'DII', 'NAIA'];
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const region = e.target.value;
    const isChecked = e.target.checked;
    
    let updatedRegions = [...filterOptions.regions];
    if (isChecked) {
      updatedRegions.push(region);
    } else {
      updatedRegions = updatedRegions.filter(r => r !== region);
    }
    
    dispatch(setFilterOptions({ regions: updatedRegions }));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const division = e.target.value;
    const isChecked = e.target.checked;
    
    let updatedDivisions = [...filterOptions.divisions];
    if (isChecked) {
      updatedDivisions.push(division);
    } else {
      updatedDivisions = updatedDivisions.filter(d => d !== division);
    }
    
    dispatch(setFilterOptions({ divisions: updatedDivisions }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStates = Array.from(e.target.selectedOptions, option => option.value);
    dispatch(setFilterOptions({ states: selectedStates }));
  };

  const handlePopulationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...filterOptions.populationRange] as [number, number];
    newRange[index] = value;
    dispatch(setFilterOptions({ populationRange: newRange }));
  };

  const handleBondAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...filterOptions.bondAmountRange] as [number, number];
    newRange[index] = value;
    dispatch(setFilterOptions({ bondAmountRange: newRange }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newRange = [...filterOptions.approvalDateRange] as [string, string];
    newRange[index] = value;
    dispatch(setFilterOptions({ approvalDateRange: newRange }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filter-panel">
      <h2>Filter Options</h2>
      
      <div className="filter-section">
        <h3>Region</h3>
        {regions.map(region => (
          <div key={region} className="filter-option">
            <input
              type="checkbox"
              id={`region-${region}`}
              value={region}
              checked={filterOptions.regions.includes(region)}
              onChange={handleRegionChange}
            />
            <label htmlFor={`region-${region}`}>{region}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-section">
        <h3>Athletic Division</h3>
        {divisions.map(division => (
          <div key={division} className="filter-option">
            <input
              type="checkbox"
              id={`division-${division}`}
              value={division}
              checked={filterOptions.divisions.includes(division)}
              onChange={handleDivisionChange}
            />
            <label htmlFor={`division-${division}`}>{division}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-section">
        <h3>Population Range</h3>
        <div className="range-inputs">
          <input
            type="number"
            min="0"
            max="200000"
            value={filterOptions.populationRange[0]}
            onChange={(e) => handlePopulationChange(e, 0)}
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            max="200000"
            value={filterOptions.populationRange[1]}
            onChange={(e) => handlePopulationChange(e, 1)}
          />
        </div>
      </div>
      
      <div className="filter-section">
        <h3>Bond Amount Range</h3>
        <div className="range-inputs">
          <input
            type="number"
            min="0"
            max="15000000"
            step="100000"
            value={filterOptions.bondAmountRange[0]}
            onChange={(e) => handleBondAmountChange(e, 0)}
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            max="15000000"
            step="100000"
            value={filterOptions.bondAmountRange[1]}
            onChange={(e) => handleBondAmountChange(e, 1)}
          />
        </div>
      </div>
      
      <div className="filter-section">
        <h3>Approval Date Range</h3>
        <div className="range-inputs">
          <input
            type="date"
            value={filterOptions.approvalDateRange[0]}
            onChange={(e) => handleDateChange(e, 0)}
          />
          <span>to</span>
          <input
            type="date"
            value={filterOptions.approvalDateRange[1]}
            onChange={(e) => handleDateChange(e, 1)}
          />
        </div>
      </div>
      
      <div className="filter-section">
        <h3>States</h3>
        <select
          multiple
          value={filterOptions.states}
          onChange={handleStateChange}
          className="state-select"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      <button className="reset-button" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
