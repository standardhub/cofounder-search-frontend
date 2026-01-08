import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    searchName: '',
    searchCompany: '',
    ageMin: '',
    ageMax: '',
    isWoman: '',
    isTechnical: '',
    location: '',
    country: '',
    region: '',
    timing: '',
    interests: [],
    responsibilities: [],
    hasIdea: '',
    hasCf: '',
    hasCompany: '',
    hasCompanyUrl: '',
    cfIsTechnical: '',
    cfLocation: '',
    cfAgeMin: '',
    cfAgeMax: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const interestOptions = [
    'Technology', 'Business', 'Marketing', 'Finance', 'Design', 'Sales',
    'Product', 'Operations', 'Healthcare', 'Education', 'Environment',
    'Social Impact', 'Entertainment', 'Travel', 'Food', 'Fashion'
  ];

  const responsibilityOptions = [
    'CEO', 'CTO', 'CMO', 'CFO', 'CPO', 'COO', 'VP Engineering',
    'VP Marketing', 'VP Sales', 'Head of Product', 'Head of Design',
    'Business Development', 'Strategy', 'Operations', 'Legal'
  ];

  const timingOptions = [
    'Immediately', 'Within 1 month', 'Within 3 months', 
    'Within 6 months', 'Within 1 year', 'Flexible'
  ];

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleArrayChange = (field, value, checked) => {
    const currentArray = filters[field] || [];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    const newFilters = { ...filters, [field]: newArray };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const cleanFilters = {};
    
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== '' && value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          cleanFilters[key] = value;
        } else if (!Array.isArray(value)) {
          if (key === 'isWoman' || key === 'isTechnical' || key === 'hasCf' || key === 'cfIsTechnical' || key === 'hasCompany' || key === 'hasCompanyUrl') {
            cleanFilters[key] = value === 'true';
          } else if (key === 'ageMin' || key === 'ageMax' || key === 'cfAgeMin' || key === 'cfAgeMax') {
            cleanFilters[key] = parseInt(value);
          } else {
            cleanFilters[key] = value;
          }
        }
      }
    });

    onFilterChange(cleanFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      searchName: '',
      searchCompany: '',
      ageMin: '',
      ageMax: '',
      isWoman: '',
      isTechnical: '',
      location: '',
      country: '',
      region: '',
      timing: '',
      interests: [],
      responsibilities: [],
      hasIdea: '',
      hasCf: '',
      hasCompany: '',
      hasCompanyUrl: '',
      cfIsTechnical: '',
      cfLocation: '',
      cfAgeMin: '',
      cfAgeMax: ''
    };
    setFilters(emptyFilters);
    onFilterChange({});
  };

  return (
    <div className="filter-panel">
      <h3>Search Filters</h3>
      
      <div className="filter-group">
        <label>Search by Name</label>
        <input
          type="text"
          placeholder="Search by candidate name..."
          value={filters.searchName}
          onChange={(e) => handleInputChange('searchName', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>General Search</label>
        <input
          type="text"
          placeholder="Search by intro or achievements..."
          value={filters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Age Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => handleInputChange('ageMin', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => handleInputChange('ageMax', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Gender</label>
        <select
          value={filters.isWoman}
          onChange={(e) => handleInputChange('isWoman', e.target.value)}
        >
          <option value="">Any</option>
          <option value="true">Woman</option>
          <option value="false">Man</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Technical Background</label>
        <select
          value={filters.isTechnical}
          onChange={(e) => handleInputChange('isTechnical', e.target.value)}
        >
          <option value="">Any</option>
          <option value="true">Technical</option>
          <option value="false">Non-technical</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <input
          type="text"
          placeholder="City or location"
          value={filters.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={filters.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Timing</label>
        <select
          value={filters.timing}
          onChange={(e) => handleInputChange('timing', e.target.value)}
        >
          <option value="">Any</option>
          {timingOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button 
        className="toggle-advanced"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
      </button>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Interests</label>
            <div className="checkbox-group">
              {interestOptions.map(interest => (
                <label key={interest} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.interests.includes(interest)}
                    onChange={(e) => handleArrayChange('interests', interest, e.target.checked)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Responsibilities</label>
            <div className="checkbox-group">
              {responsibilityOptions.map(responsibility => (
                <label key={responsibility} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.responsibilities.includes(responsibility)}
                    onChange={(e) => handleArrayChange('responsibilities', responsibility, e.target.checked)}
                  />
                  {responsibility}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Has Business Idea</label>
            <select
              value={filters.hasIdea}
              onChange={(e) => handleInputChange('hasIdea', e.target.value)}
            >
              <option value="">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Has Company</label>
            <select
              value={filters.hasCompany}
              onChange={(e) => handleInputChange('hasCompany', e.target.value)}
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {filters.hasCompany === 'true' && (
            <>
              <div className="filter-group">
                <label>Search Company Name</label>
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={filters.searchCompany}
                  onChange={(e) => handleInputChange('searchCompany', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Has Company URL</label>
                <select
                  value={filters.hasCompanyUrl}
                  onChange={(e) => handleInputChange('hasCompanyUrl', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </>
          )}

          <div className="filter-group">
            <label>Already Has Co-founder</label>
            <select
              value={filters.hasCf}
              onChange={(e) => handleInputChange('hasCf', e.target.value)}
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Seeking Technical Co-founder</label>
            <select
              value={filters.cfIsTechnical}
              onChange={(e) => handleInputChange('cfIsTechnical', e.target.value)}
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Preferred Co-founder Location</label>
            <input
              type="text"
              placeholder="Preferred location for co-founder"
              value={filters.cfLocation}
              onChange={(e) => handleInputChange('cfLocation', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Preferred Co-founder Age Range</label>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.cfAgeMin}
                onChange={(e) => handleInputChange('cfAgeMin', e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.cfAgeMax}
                onChange={(e) => handleInputChange('cfAgeMax', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="filter-actions">
        <button className="apply-btn" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="clear-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;