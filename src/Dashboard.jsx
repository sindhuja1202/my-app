import './App.css';
import React, { useState, useEffect } from 'react';

// Dashboard component
const Dashboard = ({ userId , callback}) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos,setTodos] = useState([]);
const handleGetPost = async (postId) => {
    // Fetch the selected post data
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();
    callback(post);
  };

  // Delete the selected post
  const handleDeletePost = async (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await userResponse.json();
      setUserData(user);

      // Fetch todos of user
      const todos=[];
      const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      const todosOfUsers = await todosResponse.json();
      setTodos(todosOfUsers);
    
      // Fetch posts of user
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const userPosts = await postsResponse.json();
      setPosts(userPosts);

      // Fetch comments for each post of user
      const comments = [];
      for(const post of userPosts){
        const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
        const comment = await commentResponse.json();
        comments.push(comment);
      }
      setComments(comments);
    };

    fetchUserData();
  }, [userId]);

  return (
      <div>
      <div className="summary">
        <p>Number of Posts: {posts.length}</p>
        <p>Number of Comments: {comments.length}</p>
        <p>Number of Todos: {todos.length}</p>
      </div>
      <div className="post-list">
        <h2>Post List</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title}
              <button className='getButton' onClick={() => handleGetPost(post.id)}>Get</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default Dashboard;