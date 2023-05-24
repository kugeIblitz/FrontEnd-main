import React from 'react';
import Sidebar from './Sidebar';
import './About.css';

const Favorites = ({ favorites, questions }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="about-container">
        <Sidebar />
        <div className="about-content">
          <br/><br/><br/>
          <h2>Favorites</h2>
          <div className="paragraph-container">
            <p>No favorites added yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      <Sidebar />
      <div className="about-content">
        <br/><br/><br/>
        <h2>Favorites</h2>
        <div className="paragraph-container">
          <ul className="list-group">
            {favorites.map((favorite) => {
              const question = questions.find((q) => q.id === favorite);
              if (question) {
                return (
                  <li className="list-group-item" key={question.id}>
                    {question.title}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
