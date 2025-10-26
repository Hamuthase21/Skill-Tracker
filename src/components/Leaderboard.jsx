import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Leaderboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Leaderboard({ skills, darkMode }) {
  const completedSkills = skills.filter(skill => skill.completed).length;
  const remainingSkills = skills.length - completedSkills;
  const totalPoints = skills.reduce((sum, skill) => sum + skill.points, 0);
  const maxTotalPoints = skills.reduce((sum, skill) => sum + skill.maxPoints, 0);

  const data = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        data: [completedSkills, remainingSkills],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: 'bold'
          },
          color: darkMode ? '#e5e7eb' : '#1f2937'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const categoryBreakdown = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = { completed: 0, total: 0 };
    }
    acc[skill.category].total += 1;
    if (skill.completed) {
      acc[skill.category].completed += 1;
    }
    return acc;
  }, {});

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Learning Progress</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{completedSkills}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{remainingSkills}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round((totalPoints / maxTotalPoints) * 100)}%</div>
          <div className="stat-label">Overall Progress</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Skills Completion</h3>
        <div className="chart-wrapper">
          <Pie data={data} options={options} />
        </div>
      </div>

      <div className="category-breakdown">
        <h3 className="breakdown-title">Category Progress</h3>
        {Object.entries(categoryBreakdown).map(([category, stats]) => (
          <div key={category} className="category-stat">
            <div className="category-stat-header">
              <span className="category-stat-name">{category}</span>
              <span className="category-stat-value">{stats.completed}/{stats.total}</span>
            </div>
            <div className="category-progress-bar">
              <div
                className="category-progress-fill"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
