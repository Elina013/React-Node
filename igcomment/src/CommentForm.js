import React, { useState } from 'react';
import axios from 'axios';


const CommentForm = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/comments', {
        text: commentText,
        // Lägg till andra nödvändiga fält här (användar-ID, bild-ID, etc.)
      });
      onAddComment(response.data); // Uppdatera lokalt tillstånd efter att kommentaren har lagts till
      setCommentText(''); // Rensa inmatningsfältet
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleAddComment}>Lägg till kommentar</button>
    </div>
  );
};

export default CommentForm;
