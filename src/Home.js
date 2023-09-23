import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

function HomePage() {
  return (
    <div className="home">
      <header>
        <h1>Welcome to the Quiz-App</h1>
      </header>
      <main>
        <section className="start-quiz">
          <h2>Ready to Test Your Knowledge?</h2>
          <p>Click the login button to start the quiz.</p>
            <Link to="/login" className='Linkbutton'>Login</Link>
        </section>
        </main>
        <section className="about">
          <h2>About the Quiz</h2>
          <p>
            This quiz will challenge your knowledge on various topics. It consists
            of multiple-choice questions that cover a wide range of subjects.
          </p>
        </section>
      <footer>
        <p>&copy; 2023 Quiz App</p>
      </footer>
    </div>
  );
}

export default HomePage;