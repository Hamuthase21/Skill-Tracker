import './ProgressBar.css';

function ProgressBar({ points, maxPoints, level }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-label">Progress</span>
        <span className="progress-value">{points}/{maxPoints} pts</span>
      </div>
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill level-${level}`}
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-percentage">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
