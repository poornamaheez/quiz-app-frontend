import axios from 'axios'
import React from 'react'

function Result() {
    const name = localStorage.getItem('username')

    const score = ()=>{
        axios
            .post('http://localhost:8080/api/calculate',{
                username:name
            })
            .then((response) => {
                // Handle the response from the server if needed
                console.log(response.data);
              })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
              });
    }
  return (
    <div>
      <h1>Hey, {name}</h1>
      <p>Your score is {score()}</p>
    </div>
  )
}

export default Result
