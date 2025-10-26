import { useEffect } from 'react';
import './Modal.css';

function Modal({ skill, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const getLevelBadge = (level) => {
    const badges = {
      1: { text: 'Beginner', color: '#94a3b8' },
      2: { text: 'Novice', color: '#10b981' },
      3: { text: 'Intermediate', color: '#3b82f6' },
      4: { text: 'Advanced', color: '#f59e0b' },
      5: { text: 'Expert', color: '#ef4444' }
    };
    return badges[level] || badges[1];
  };

  const badge = getLevelBadge(skill.level);
  const percentage = (skill.points / skill.maxPoints) * 100;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2 className="modal-title">{skill.name}</h2>
          <span
            className="modal-level-badge"
            style={{ background: badge.color }}
          >
            Level {skill.level} - {badge.text}
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">Category</h3>
            <span className="modal-category">{skill.category}</span>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Description</h3>
            <p className="modal-description">{skill.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Progress</h3>
            <div className="modal-progress">
              <div className="modal-progress-bar">
                <div
                  className="modal-progress-fill"
                  style={{
                    width: `${percentage}%`,
                    background: badge.color
                  }}
                />
              </div>
              <div className="modal-progress-text">
                {skill.points} / {skill.maxPoints} points ({Math.round(percentage)}%)
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Status</h3>
            <div className={`modal-status ${skill.completed ? 'completed' : 'in-progress'}`}>
              {skill.completed ? (
                <>
                  <span className="status-icon">✓</span>
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <span className="status-icon">⏳</span>
                  <span>In Progress</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
