import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Posts from './Posts';
import PostsDetail from './PostsDetail';
import '../App.css';

class App extends Component {
  state = {
    createPostModalOpen: false
  }

  createPost = () => this.setState(() => ({ createPostModalOpen: true }))
  
  closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))

  render() {
    return (
      <div>
        <Route path="/" exact component={Posts} />
        <Route path="/posts/:id" component={PostsDetail} />
      </div>
    );
  }
}

export default App;
