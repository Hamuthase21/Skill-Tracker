import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import SkillCard from './components/SkillCard';
import Leaderboard from './components/Leaderboard';
import Modal from './components/Modal';
import { mockSkills } from './data/mockSkills';
import './App.css';

function App() {
  const [skills, setSkills] = useState(mockSkills);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const handleToggleComplete = (skillId) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === skillId
          ? { ...skill, completed: !skill.completed }
          : skill
      )
    );
  };

  const handleShowDetails = (skill) => {
    setSelectedSkill(skill);
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container">
        <Filter
          categories={categories}
          activeCategory={activeCategory}
          onFilterChange={setActiveCategory}
        />

        <div className="content-grid">
          <div className="skills-section">
            <h2 className="section-title">
              Your Skills
              <span className="skill-count">({filteredSkills.length})</span>
            </h2>
            <div className="skills-grid">
              {filteredSkills.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onToggleComplete={handleToggleComplete}
                  onShowDetails={handleShowDetails}
                />
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <Leaderboard skills={skills} darkMode={darkMode} />
          </div>
        </div>
      </main>

      {selectedSkill && (
        <Modal skill={selectedSkill} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
