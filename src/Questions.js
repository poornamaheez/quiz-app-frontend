import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';

function Qids(setQuestionCount){
  useEffect(()=> {
    axios.get('http://localhost:8080/api/totalquestions')
         .then((response)=>{
          setQuestionCount(response.data);
         })
         .catch((error)=>{
          setQuestionCount(0);
          console.log(error);
         })
    });
}


function Questions() {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qId, setQid] = useState(1); // You can set the initial question ID here
  const [questionCount,setQuestionCount] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  if(localStorage.getItem('isLoggedin')!=='true'){
    window.location.href='/login';
  }
  const uname = localStorage.getItem('username');

  // console.log(localStorage.getItem('username'));
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  Qids(setQuestionCount);

  useEffect(() => {
    // Make a GET request to your API endpoint
    axios
      .get('http://localhost:8080/api/get/question', {
        params: { questionId: qId },
      })
      .then((response) => {
        setQuestionData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [qId]);

  const submitQn = () => {
    // Send the selected option to the server using Axios when the "Next" button is clicked
    axios
      .post('http://localhost:8080/api/chosenOption', {
        questionId: qId.toString(), // Use the stored question ID
        Option: selectedOption,
      })
      .then((response) => {
        // Handle the response from the server if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
      
    // Clear the selected option after sending the request
    setSelectedOption('');
  };
  const handleNextClick = () => {
    
    if(qId<questionCount){
      submitQn();
      setQid((prevQId) => prevQId+1);
    }
    if(qId===questionCount){
      submitQn();
    }
  };
  const handlePrevClick = () => {
    // Increment qId when "Next" button is clicked
    if(0<qId && qId<=questionCount){
      setQid((prevQId) => prevQId-1);
    }
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href='/';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='total'>
      <h1>WELCOME {uname}</h1>
      <table className='tbl'>
        <tr className='rw'>
          <td className='cl'>{questionData.Question_number}</td>
          <td className='cl'>{questionData.Question}</td>
        </tr>
        <tr className='rw'>
          <td className='cl'>
          <label>
        <input
          type="radio"
          name="option"
          value="A"
          checked={selectedOption === 'A'}
          onChange={handleOptionChange}
        />A
      </label>
          </td>
          <td className='cl'>{questionData.op_a}</td>
        </tr>
        <tr className='rw'>
          <td className='cl'>
          <label>
        <input
          type="radio"
          name="option"
          value="B"
          checked={selectedOption === 'B'}
          onChange={handleOptionChange}
        />B
      </label>
          </td>
          <td className='cl'>{questionData.op_b}</td>
        </tr>
        <tr className='rw'>
          <td className='cl'>
          <label>
        <input
          type="radio"
          name="option"
          value="C"
          checked={selectedOption === 'C'}
          onChange={handleOptionChange}
        />C
      </label>
          </td>
          <td className='cl'>{questionData.op_c}</td>
        </tr>
        <tr className='rw'>
          <td className='cl'>
          <label>
        <input
          type="radio"
          name="option"
          value="D"
          checked={selectedOption === 'D'}
          onChange={handleOptionChange}
        />D
      </label>
          </td>
          <td className='cl'>{questionData.op_d}</td>
        </tr>
      </table>
      {(qId===questionCount)?<button onClick={handleNextClick}>Submit</button>:<button onClick={handleNextClick}>Next</button>}
      {(qId!==1)&&<button onClick={handlePrevClick}>Previous</button>}
      <button onClick={logOut}>Logout</button>
    </div>
  );
}

export default Questions;