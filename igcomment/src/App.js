import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm'; // Se till att importera din CommentForm-komponent

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleEditComment = (commentId) => {
    // Implementera redigeringslogik här
    console.log(`Redigera kommentar med ID ${commentId}`);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h1>Kommentarsapp</h1>
      <CommentForm onAddComment={handleAddComment} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}{' '}
            <button onClick={() => handleEditComment(comment.id)}>Redigera</button>{' '}
            <button onClick={() => handleDeleteComment(comment.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
