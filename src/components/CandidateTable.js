import React from 'react';
import './CandidateTable.css';

const CandidateTable = ({ candidates, onCandidateClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  const getLinkedInUrl = (linkedin) => {
    if (!linkedin) return null;
    if (linkedin.startsWith('http')) return linkedin;
    return `https://linkedin.com/in/${linkedin}`;
  };

  const getCofounderMatchUrl = (slug) => {
    return `https://www.startupschool.org/cofounder-matching/candidate/${slug}`;
  };

  if (!candidates || candidates.length === 0) {
    return (
      <div className="no-candidates">
        <p>No candidates found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="candidate-table-container">
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Technical</th>
            <th>Location</th>
            <th>Last Seen</th>
            <th>LinkedIn</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr 
              key={candidate.slug} 
              className="candidate-row"
              onClick={() => onCandidateClick(candidate)}
            >
              <td className="avatar-cell">
                <div className="candidate-avatar">
                  {candidate.avatarUrl ? (
                    <img src={candidate.avatarUrl} alt={candidate.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {(candidate.firstName || candidate.name || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </td>
              
              <td className="name-cell">
                <div className="candidate-name">
                  <span className="name">{candidate.name || candidate.firstName}</span>
                </div>
              </td>

              <td className="gender-cell">
                  {candidate.isWoman !== null && (
                    <span className={`gender-badge ${candidate.isWoman ? 'woman' : 'man'}`}>
                      {candidate.isWoman ? 'W' : 'M'}
                    </span>
                  )}
              </td>
              
              <td className="age-cell">
                {candidate.age || 'N/A'}
              </td>
              
              <td className="technical-cell">
                {candidate.isTechnical !== null ? (
                  <span className={`technical-badge ${candidate.isTechnical ? 'technical' : 'non-technical'}`}>
                    {candidate.isTechnical ? 'Tech' : 'Non-Tech'}
                  </span>
                ) : 'N/A'}
              </td>
              
              <td className="location-cell">
                <div className="location-info">
                  {candidate.location && <span className="location">{candidate.location}</span>}
                </div>
              </td>
              
              <td className="last-seen-cell">
                {formatDate(candidate.lastSeenAt)}
              </td>
              
              <td className="linkedin-cell">
                <button
                  className={`action-btn linkedin-btn ${!candidate.linkedin ? 'disabled' : ''}`}
                  disabled={!candidate.linkedin}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (candidate.linkedin) {
                      window.open(getLinkedInUrl(candidate.linkedin), '_blank');
                    }
                  }}
                >
                  LinkedIn
                </button>
              </td>
              
              <td className="profile-cell">
                <button
                  className="action-btn profile-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(getCofounderMatchUrl(candidate.slug), '_blank');
                  }}
                >
                  YC Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;