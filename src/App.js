import './App.css';
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard.jsx'
import PostDetails  from './PostDetails';

// App component
const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const setCallBack  = (selectedPost) =>{
    setSelectedPost(selectedPost);
  }

  return (
    <div className="app">
      <div className="dashboard">
      <div className='header-div'>
      <h2 className="header">User Dashboard</h2>
      </div>
      {selectedPost==null && < Dashboard userId={1} callback={setCallBack} />}
      {selectedPost && <PostDetails post={selectedPost} />}
    </div>
    </div>
  );
};

export default App;