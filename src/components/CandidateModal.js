import React from 'react';
import './CandidateModal.css';

const CandidateModal = ({ candidate, onClose }) => {
  console.log(candidate);
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  const formatTextWithLineList = (text) => {
    if (!text) return null;
    // Split on actual newline characters, not literal '\n'
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
      <ul className="formatted-list">
        {lines.map((line, index) => (
          <li key={index}>
            <div className="list-item-content">{line.trim()}</div>
          </li>
        ))}
      </ul>
    );
  };

  const formatTextWithLineBreaks = (text) => {
    if (!text) return null;
    // Convert \n to <br /> tags
    const formattedText = text.split('\n').map((line, index, array) => (
      <p key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </p>
    ));
    return <div className="impressive-content-formatted">{formattedText}</div>;
  };

  const getLinkedInUrl = (linkedin) => {
    if (!linkedin) return null;
    if (linkedin.startsWith('http')) return linkedin;
    return `https://linkedin.com/in/${linkedin}`;
  };

  const getCofounderMatchUrl = (slug) => {
    return `https://www.startupschool.org/cofounder-matching/candidate/${slug}`;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="candidate-header-info">
            <div className="candidate-avatar-large">
              {candidate.avatarUrl ? (
                <img src={candidate.avatarUrl} alt={candidate.name} />
              ) : (
                <div className="avatar-placeholder-large">
                  {(candidate.firstName || candidate.name || '?').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="candidate-basic-info">
              <h2>{candidate.name || candidate.firstName}</h2>
              <div className="candidate-meta">
                <span className="age">{candidate.age ? `${candidate.age} years old` : 'Age not specified'}</span>
                {candidate.isWoman !== null && (
                  <span className="gender">{candidate.isWoman ? 'Woman' : 'Man'}</span>
                )}
                {candidate.isTechnical !== null && (
                  <span className={`technical ${candidate.isTechnical ? 'is-technical' : 'non-technical'}`}>
                    {candidate.isTechnical ? 'Technical' : 'Non-technical'}
                  </span>
                )}
              </div>
              <div className="location-info">
                {candidate.location && <span className="location">{candidate.location}</span>}
              </div>
              <div className=''>
                {candidate.timing && (
                  <div className="detail-item">
                    <strong>Timing:</strong> {candidate.timing}
                  </div>
                )}
                {candidate.hasIdea && (
                  <div className="detail-item">
                    <strong>Business Idea: </strong> {candidate.hasIdea}
                  </div>
                )}
              </div>
              {candidate.videoLink && (
                <div className="detail-item">
                  <strong>Video:</strong>
                  <a href={candidate.videoLink} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </div>
              )}
              {candidate.calendlyLink && (
                <div className="detail-item">
                  <strong>Schedule Meeting:</strong>
                  <a href={candidate.calendlyLink} target="_blank" rel="noopener noreferrer">
                    Book on Calendly
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              className={`action-btn linkedin-btn ${!candidate.linkedin ? 'disabled' : ''}`}
              disabled={!candidate.linkedin}
              onClick={() => {
                if (candidate.linkedin) {
                  window.open(getLinkedInUrl(candidate.linkedin), '_blank');
                }
              }}
            >
              LinkedIn
            </button>
            <button
              className="action-btn profile-btn"
              onClick={() => window.open(getCofounderMatchUrl(candidate.slug), '_blank')}
            >
              YC Profile
            </button>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body">
          {candidate.intro && (
            <div className="section intro-section">
              <h3>Introduction</h3>
              <p>{candidate.intro}</p>
            </div>
          )}

          <div className="section details-section">
            <h3>Professional Background</h3>
            <div className="professional-info">
              {candidate.impressiveThing && (
                <div className="impressive-achievement-box">
                  <h4>Impressive Achievement</h4>
                  <div className="impressive-content">
                    {formatTextWithLineBreaks(candidate.impressiveThing)}
                  </div>
                </div>
              )}

              {candidate.education && (
                <div className="education-box">
                  <h4>Education</h4>
                  {formatTextWithLineList(candidate.education)}
                </div>
              )}

              {candidate.employment && (
                <div className="employment-box">
                  <h4>Employment</h4>
                  {formatTextWithLineList(candidate.employment)}
                </div>
              )}

              {candidate.companyName && (
                <div className="company-info-box">
                  <h4>Company</h4>

                  <div className="company-name">
                    <strong>Company: </strong>
                    <strong>{candidate.companyName}</strong>
                  </div>
                  {candidate.companyUrl && (
                    <div className="company-url">
                      <strong>Company URL: </strong>
                      <a href={candidate.companyUrl} target="_blank" rel="noopener noreferrer">
                        {candidate.companyUrl}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {(candidate.hasCf || candidate.currentCfLinkedin || candidate.currentCfTechnical) && (
                <div className="cofounder-info-box">
                  <h4>Current Co-founder Information</h4>
                  {candidate.hasCf !== null && (
                    <div className="cf-status">
                      <strong>Has Co-founder: </strong> {candidate.hasCf}
                      <strong>Has Co-founder: </strong> {candidate.hasCf ? 'Yes' : 'No'}
                    </div>
                  )}
                  {candidate.currentCfLinkedin && (
                    <div className="cf-linkedin">
                      <strong>Co-founder LinkedIn: </strong>
                      <a href={getLinkedInUrl(candidate.currentCfLinkedin)} target="_blank" rel="noopener noreferrer">
                        View Linkedin Profile
                      </a>
                    </div>
                  )}
                  {candidate.currentCfTechnical && (
                    <div className="cf-technical">
                      <strong>Co-founder Technical Background: </strong> {candidate.currentCfTechnical}
                      <strong>Co-founder Technical Background: </strong> {candidate.currentCfTechnical ? 'Tech' : 'Non-Tech'}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="other-details">
              {candidate.equity && (
                <div className="detail-item">
                  <strong>Equity Expectations:</strong> {candidate.equity}
                </div>
              )}

              {candidate.emailSettings && candidate.emailSettings.length > 0 && (
                <div className="detail-item">
                  <strong>Email Settings:</strong> {candidate.emailSettings.join(', ')}
                </div>
              )}
            </div>
          </div>

          {candidate.interests && candidate.interests.length > 0 && (
            <div className="section interests-section">
              <h3>Interests</h3>
              <div className="tags">
                {candidate.interests.map((interest, index) => (
                  <span key={index} className="tag interest-tag">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {candidate.responsibilities && candidate.responsibilities.length > 0 && (
            <div className="section responsibilities-section">
              <h3>Preferred Responsibilities</h3>
              <div className="tags">
                {candidate.responsibilities.map((responsibility, index) => (
                  <span key={index} className="tag responsibility-tag">{responsibility}</span>
                ))}
              </div>
            </div>
          )}

          {candidate.ideas && (
            <div className="section ideas-section">
              <h3>Business Ideas</h3>
              <p>{candidate.ideas}</p>
            </div>
          )}

          <div className="section cofounder-preferences">
            <h3>Co-founder Preferences</h3>
            <div className="cf-details">
              {candidate.cfHasIdea !== null && (
                <div className="cf-detail">
                  <strong>Wants Co-founder with Idea:</strong> {candidate.cfHasIdea ? 'Yes' : 'No'}
                  {candidate.cfHasIdeaImportance && (
                    <span className="importance"> (Importance: {candidate.cfHasIdeaImportance})</span>
                  )}
                </div>
              )}
              {candidate.cfIsTechnical !== null && (
                <div className="cf-detail">
                  <strong>Seeking Technical Co-founder:</strong> {candidate.cfIsTechnical ? 'Yes' : 'No'}
                  {candidate.cfIsTechnicalImportance && (
                    <span className="importance"> (Importance: {candidate.cfIsTechnicalImportance})</span>
                  )}
                </div>
              )}
              {candidate.cfLocation && (
                <div className="cf-detail">
                  <strong>Preferred Location:</strong> {candidate.cfLocation}
                  {candidate.cfLocationImportance && (
                    <span className="importance"> (Importance: {candidate.cfLocationImportance})</span>
                  )}
                  {candidate.cfLocationKmRange && (
                    <span className="range"> (Within {candidate.cfLocationKmRange} km)</span>
                  )}
                </div>
              )}
              {(candidate.cfAgeMin || candidate.cfAgeMax) && (
                <div className="cf-detail">
                  <strong>Preferred Age Range:</strong>
                  {candidate.cfAgeMin && candidate.cfAgeMax ? ` ${candidate.cfAgeMin}-${candidate.cfAgeMax}` :
                    candidate.cfAgeMin ? ` ${candidate.cfAgeMin}+` :
                      candidate.cfAgeMax ? ` Up to ${candidate.cfAgeMax}` : ''}
                  {candidate.cfAgeImportance && (
                    <span className="importance"> (Importance: {candidate.cfAgeImportance})</span>
                  )}
                </div>
              )}
              {candidate.cfTimingImportance && (
                <div className="cf-detail">
                  <strong>Timing Importance:</strong> {candidate.cfTimingImportance}
                </div>
              )}
              {candidate.cfInterestsImportance && (
                <div className="cf-detail">
                  <strong>Interests Match Importance:</strong> {candidate.cfInterestsImportance}
                </div>
              )}
              {candidate.cfResponsibilities && candidate.cfResponsibilities.length > 0 && (
                <div className="cf-detail">
                  <strong>Preferred Co-founder Responsibilities:</strong>
                  {candidate.cfResponsibilitiesImportance && (
                    <span className="importance"> (Importance: {candidate.cfResponsibilitiesImportance})</span>
                  )}
                  <div className="tags">
                    {candidate.cfResponsibilities.map((responsibility, index) => (
                      <span key={index} className="tag cf-responsibility-tag">{responsibility}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {candidate.reqFreeText && (
            <div className="section requirements-section">
              <h3>Additional Requirements</h3>
              <p>{candidate.reqFreeText}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="timestamps">
            <div className="timestamp-item">
              <strong>Last Seen:</strong> {formatDate(candidate.lastSeenAt)}
            </div>
            <div className="timestamp-item">
              <strong>Profile Created:</strong> {formatDate(candidate.savedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;