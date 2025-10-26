import ProgressBar from './ProgressBar';
import './SkillCard.css';

function SkillCard({ skill, onToggleComplete, onShowDetails }) {
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

  return (
    <div className={`skill-card ${skill.completed ? 'completed' : ''}`}>
      <div className="skill-card-header">
        <div className="skill-info">
          <h3 className="skill-name">{skill.name}</h3>
          <span className="skill-category">{skill.category}</span>
        </div>
        <span
          className="skill-level-badge"
          style={{ background: badge.color }}
        >
          {badge.text}
        </span>
      </div>

      <ProgressBar
        points={skill.points}
        maxPoints={skill.maxPoints}
        level={skill.level}
      />

      <div className="skill-card-footer">
        <button
          className={`complete-button ${skill.completed ? 'completed' : ''}`}
          onClick={() => onToggleComplete(skill.id)}
        >
          {skill.completed ? '✓ Completed' : 'Mark Complete'}
        </button>
        <button
          className="details-button"
          onClick={() => onShowDetails(skill)}
        >
          View Details
        </button>
      </div>

      {skill.completed && (
        <div className="completion-badge">
          <span className="badge-icon">🏆</span>
        </div>
      )}
    </div>
  );
}

export default SkillCard;
