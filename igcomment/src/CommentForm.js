import React, { useState } from 'react';
import axios from 'axios';


const CommentForm = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/comments', {
        text: commentText,
        // Legg til andra nødvendiga felt hær (anvændar-ID, bild-ID, etc.)
      });
      onAddComment(response.data); // Uppdatera lokalt tillstånd efter att kommentaren har lagts til
      setCommentText(''); // Rensa inmatningsfeltet
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <input
        type="text" placeholder='Komentar...'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleAddComment}>Legg til kommentar</button>
    </div>
  );
};

export default CommentForm;
