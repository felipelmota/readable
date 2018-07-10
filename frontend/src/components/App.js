import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Posts from './Posts';
import PostsDetail from './PostsDetail';
import PostsNew from './PostsNew';
import PostsEdit from './PostsEdit';
import NavbarHeader from './NavbarHeader';
import CommentsNew from './CommentsNew';
import CommentsEdit from './CommentsEdit';
import NotFound from './NotFound';

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
            <div>
                <NavbarHeader />    
                <Grid>
                    <Switch>
                        <Route path="/" exact component={Posts} />
                        <Route path="/posts/new" exact component={PostsNew} />
                        <Route path="/:category" exact component={props => <Posts {...props} />} />
                        <Route path="/:category/edit/:id" children={props => <PostsEdit {...props}/>} />
                        <Route path="/:category/:id" exact component={PostsDetail} />
                        <Route path="/:category/:id/comments/new" component={CommentsNew} />
                        <Route path="/:category/:postId/comments/edit/:id" component={props => <CommentsEdit {...props}/>} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Grid>
            </div>
            </BrowserRouter>
        );
    }
});

export default App;
