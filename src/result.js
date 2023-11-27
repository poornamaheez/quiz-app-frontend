import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './result.css';

export default function Result() {
  const name = localStorage.getItem('username');
  const [wrongAnswers, setWrongAnswers] = useState(null);
  const [scored, setScored] = useState(null);
  const [returned, setReturned] = useState(false);
  const shouldShow = localStorage.getItem('isSubmitClicked');

  useEffect(() => {
    if (shouldShow !== 'yes') {
      window.location.href = '/start';
    } else {
      fetchData();
    }
  }, [shouldShow]);

  const fetchData = async () => {
    if (returned) {
      return;
    }

    try {
      const [responseCalculate, responseEvaluation] = await Promise.all([
        axios.post('http://localhost:8080/api/calculate', {
          username: name,
        }),
        axios.get('http://localhost:8080/api/evaluation'),
      ]);

      console.log(responseCalculate.data);
      setScored(responseCalculate.data);

      console.log(responseEvaluation.data);
      setWrongAnswers(responseEvaluation.data);

      setReturned(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFinishClick = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  console.log(localStorage.getItem("questionCount"));

  return (
    <div className='bg'>
      <div className='total-msg'>
        <h1 className='greet'>Hey, {name}</h1>
        {scored != localStorage.getItem("questionCount")?
          <table className='evalTable'>
          <thead>
            <tr>
              <th>Question Number</th>
              <th>Question</th>
              <th>Option Chosen</th>
              <th>Correct Answer</th>
            </tr>
          </thead>

          <tbody>
            {wrongAnswers && wrongAnswers['Question Numbers'].map((number, index) => (
              <tr key={number}>
                <td>{number}</td>
                <td>{wrongAnswers['Question'][index]}</td>
                <td>{wrongAnswers['Option Chosen'][index]}</td>
                <td>{wrongAnswers['Correct Option'][index]}</td>
              </tr>
            ))}
          </tbody>
        </table>:<h3 className='greet'>Quiz Completed</h3>}
        {scored !== null ? (
          <p className='output'>Your score is {scored}</p>
        ) : (
          <p>Loading...</p>
        )}

        <button onClick={handleFinishClick} className='finishButton'>
          Finish and Logout
        </button>
      </div>
    </div>
  );
}