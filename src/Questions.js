import React, { Component } from 'react';
import axios from 'axios';
import './questions.css'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: null,
      loading: true,
      error: null,
      qId : 1
    };
  }

  componentDidMount(qId) {
    // Make a GET request to your API endpoint
    axios.get('http://localhost:8080/api/get/question', {
      params: { questionId: qId },
    })
      .then((response) => {
        this.setState({
          questionData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }

  

  render() {
    const { questionData, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className='total'>
        <table className='tbl'>
            <tr>
                <td>{questionData.Question_number}</td>
                <td>{questionData.Question}</td>
            </tr>
            <tr>
                <td>A:</td>
                <td>{questionData.op_a}</td>
            </tr>
            <tr>
                <td>B:</td>
                <td>{questionData.op_b}</td>
            </tr>
            <tr>
                <td>C:</td>
                <td>{questionData.op_c}</td>
            </tr>
            <tr>
                <td>D:</td>
                <td>{questionData.op_d}</td>
            </tr>
        </table>
        <button>Next</button>
      </div>
    );
  }
}

export default Questions;