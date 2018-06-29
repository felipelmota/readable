import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Posts from './Posts';
import PostsDetail from './PostsDetail';
import PostsNew from './PostsNew';
import PostsEdit from './PostsEdit';
import NavbarHeader from './NavbarHeader';

class App extends Component {
    render() {
        return (
            <div>
                <NavbarHeader />    
                <Grid>
                    <Switch>
                        <Route path="/" exact component={Posts} />
                        <Route path="/posts/new" component={PostsNew} />
                        <Route path="/posts/edit/:id" children={props => <PostsEdit {...props}/>} />
                        <Route path="/posts/:id" component={PostsDetail} />
                    </Switch>
                </Grid>
            </div>
        );
    }
}

export default App;
