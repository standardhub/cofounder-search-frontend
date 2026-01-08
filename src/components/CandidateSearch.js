import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import FilterPanel from './FilterPanel';
import CandidateTable from './CandidateTable';
import CandidateModal from './CandidateModal';
import Pagination from './Pagination';
import './CandidateSearch.css';

const GET_CANDIDATES = gql`
  query GetCandidates($filters: FilterInput, $limit: Int, $offset: Int) {
    candidates(filters: $filters, limit: $limit, offset: $offset) {
      slug
      name
      firstName
      age
      isWoman
      avatarUrl
      linkedin
      education
      employment
      isTechnical
      location
      country
      region
      timing
      emailSettings
      videoLink
      calendlyLink
      intro
      impressiveThing
      interests
      responsibilities
      companyName
      companyUrl
      hasIdea
      ideas
      hasCf
      currentCfLinkedin
      currentCfTechnical
      reqFreeText
      equity
      cfHasIdea
      cfHasIdeaImportance
      cfIsTechnical
      cfIsTechnicalImportance
      cfResponsibilities
      cfResponsibilitiesImportance
      cfLocation
      cfLocationImportance
      cfLocationKmRange
      cfAgeMin
      cfAgeMax
      cfAgeImportance
      cfTimingImportance
      cfInterestsImportance
      lastSeenAt
      savedAt
    }
    candidatesCount(filters: $filters)
  }
`;

const CandidateSearch = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasFiltered, setHasFiltered] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_CANDIDATES, {
    variables: {
      filters,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage
    }
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setHasFiltered(true);
    // Don't automatically hide filters - let user control visibility
    refetch({
      filters: newFilters,
      limit: itemsPerPage,
      offset: 0
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch({
      filters,
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    refetch({
      filters,
      limit: newItemsPerPage,
      offset: 0
    });
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (error) return <div className="error">Error: {error.message}</div>;

  const totalPages = data ? Math.ceil(data.candidatesCount / itemsPerPage) : 0;
  const candidates = data?.candidates || [];

  return (
    <div className="candidate-search">
      <div className="search-header">
        <button className="filter-toggle-btn" onClick={toggleFilters}>
          <span className="filter-icon">⚙️</span>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className="results-info">
          <span className="results-count">
            {loading ? 'Loading...' : `${data?.candidatesCount || 0} candidates found`}
          </span>
          
          <div className="items-per-page">
            <label>Show: </label>
            <select 
              value={itemsPerPage} 
              onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span> per page</span>
          </div>
        </div>
      </div>

      <div className={`search-container ${showFilters ? 'filters-visible' : 'filters-hidden'}`}>
        <div className={`filter-sidebar ${showFilters ? 'visible' : 'hidden'}`}>
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
        
        <div className="results-section">
          {loading ? (
            <div className="loading">Loading candidates...</div>
          ) : (
            <>
              <CandidateTable 
                candidates={candidates}
                onCandidateClick={handleCandidateClick}
              />
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={data?.candidatesCount || 0}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          )}
        </div>
      </div>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CandidateSearch;