import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Kommentarsapp</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
