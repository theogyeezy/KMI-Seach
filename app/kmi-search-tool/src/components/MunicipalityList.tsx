import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TargetMunicipality } from '../types';

const MunicipalityList: React.FC = () => {
  const { filteredMunicipalities, loading, error } = useSelector(
    (state: RootState) => state.municipalities
  );

  if (loading) {
    return <div className="loading">Loading municipalities data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (filteredMunicipalities.length === 0) {
    return <div className="no-results">No municipalities match your filter criteria.</div>;
  }

  return (
    <div className="municipality-list">
      <h2>Target Municipalities</h2>
      <div className="list-header">
        <div className="header-cell">Municipality</div>
        <div className="header-cell">State</div>
        <div className="header-cell">Population</div>
        <div className="header-cell">Region</div>
        <div className="header-cell">Bond Amount</div>
        <div className="header-cell">Bond Purpose</div>
        <div className="header-cell">Institution</div>
        <div className="header-cell">Division</div>
        <div className="header-cell">Contact</div>
      </div>
      {filteredMunicipalities.map((item: TargetMunicipality) => (
        <div key={`${item.municipality.id}-${item.institution.id}`} className="list-row">
          <div className="cell">{item.municipality.name}</div>
          <div className="cell">{item.municipality.state}</div>
          <div className="cell">{item.municipality.population.toLocaleString()}</div>
          <div className="cell">{item.municipality.region}</div>
          <div className="cell">${item.bond.amount.toLocaleString()}</div>
          <div className="cell">{item.bond.purpose}</div>
          <div className="cell">{item.institution.name}</div>
          <div className="cell">{item.institution.athletic_division}</div>
          <div className="cell">
            {item.contact ? (
              <>
                {item.contact.name}
                <br />
                <small>{item.contact.role}</small>
                {item.contact.email && (
                  <>
                    <br />
                    <a href={`mailto:${item.contact.email}`}>{item.contact.email}</a>
                  </>
                )}
              </>
            ) : (
              'N/A'
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MunicipalityList;
