import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';

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
  // localStorage.setItem('isSubmitClicked','no');


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

    axios
      .get('http://localhost:8080/api/totalquestions')
      .then((response) => {
        setQuestionCount(response.data);
      })
      .catch((error) => {
        setQuestionCount(0);
        console.log(error);
      });
  }, [qId]);
    // console.log(localStorage.getItem('username'));
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  const submitQn = () => {
    // Send the selected option to the server using Axios when the "Next" button is clicked
    axios
      .post('http://localhost:8080/api/chosenOption', {
        questionId: qId.toString(), // Use the stored question ID
        Option: (selectedOption==='')?'Blank':selectedOption,
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
  };
  const handleSubmitClick = () =>{
    submitQn();
    localStorage.setItem('isSubmitClicked','yes');
    window.location.href='/result'
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
      <div className="top-left-message">
        <h1>Welcome {uname}</h1>
      </div>
      <div className="logout-button">
        <button onClick={logOut}>Logout</button>
      </div>
      <div className='box'>
        
        <div className='questionTable'>
        <table className='tbl'>
        <tbody>
          <tr className='rw'>
            <td className='col'>{questionData.Question_number}. {questionData.Question}</td>
          </tr>
          <tr className='rw'>
            <td className={`cl ${selectedOption === 'A' ? 'selected-option' : ''}`}>
            <label className='optionButton'>
          <input
            type="radio"
            name="option"
            value="A"
            checked={selectedOption === 'A'}
            onChange={handleOptionChange}
            className='radButton'
          />A. {questionData.op_a}
        </label>
            </td>
          </tr>
          <tr className='rw'>
            <td className={`cl ${selectedOption === 'B' ? 'selected-option' : ''}`}>
            <label className='optionButton'>
          <input
            type="radio"
            name="option"
            value="B"
            checked={selectedOption === 'B'}
            onChange={handleOptionChange}
            className='radButton'
          />B. {questionData.op_b}
        </label>
            </td>
          </tr>
          <tr className='rw'>
            <td className={`cl ${selectedOption === 'C' ? 'selected-option' : ''}`}>
            <label className='optionButton'>
          <input
            type="radio"
            name="option"
            value="C"
            checked={selectedOption === 'C'}
            onChange={handleOptionChange}
            className='radButton'
          />C. {questionData.op_c}
        </label>
            </td>
          </tr>
          <tr className='rw'>
            <td className={`cl ${selectedOption === 'D' ? 'selected-option' : ''}`}>
            <label className='optionButton'>
          <input
            type="radio"
            name="option"
            value="D"
            checked={selectedOption === 'D'}
            onChange={handleOptionChange}
            className='radButton'
          />D. {questionData.op_d}
        </label>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
        <div className='responseButton'>
        {(qId===questionCount)?<button onClick={handleSubmitClick} className='submitButton'>Submit</button>:<button onClick={handleNextClick} className='nextButton'>Next</button>}
        {(qId!==1)&&<button onClick={handlePrevClick} className='prevButton'>Previous</button>}
        </div>
      </div>
      
    
    </div>
  );
}

export default Questions;