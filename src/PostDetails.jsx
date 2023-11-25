import React, { useState, useEffect } from 'react';
import './App.css';

// PostDetails component
const PostDetails = ({ post }) => {
  const [editable, setEditable] = useState(true);
  const [body, setBody] = useState(post.body);
  const [response, setResponse] = useState('');

  const handleSave = async () => {
    setResponse('Your post saved successfully!');
    setEditable(false);
  };

  return (
    <div className="post-details">
      <h2>Post Title : {post.title}</h2>
      <div>
        <h2><strong>Your Post:</strong></h2>
        {editable ? (
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        ) : (
          <p>{body}</p>
        )}
      </div>
      {editable && <button onClick={handleSave}>Save</button>}
      <p>{response}</p>
    </div>
  );
};

export default PostDetails;