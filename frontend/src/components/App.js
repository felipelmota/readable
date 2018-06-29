import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Posts from './Posts';
import PostsDetail from './PostsDetail';
import PostsNew from './PostsNew';
import PostsEdit from './PostsEdit';

import '../App.css';

class App extends Component {

    state = {
        createPostModalOpen: false
    }

    createPost = () => this.setState(() => ({ createPostModalOpen: true }))

    closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))
    
    render() {
        return (
            <Grid>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/posts/new" component={PostsNew} />
                    <Route path="/posts/edit/:id" children={props => <PostsEdit {...props}/>} />
                    <Route path="/posts/:id" component={PostsDetail} />
                </Switch>
            </Grid>
        );
    }
}

export default App;
