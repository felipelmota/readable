import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Button,
    Row,
    Col,
    Label,
    Glyphicon
} from 'react-bootstrap';
import CommentsList from './CommentsList';
import { fetchPost, deletePost, voteForPost } from '../actions';
import { timestampToDate } from '../utils/dateHelper';

class PostsDetail extends Component {

    componentWillMount() {
        console.log(this.props)
        this.props.fetchPost(this.props.match.params.id);
    }
        
    componentDidReceiveProps(nextProps) {
        console.log(nextProps)
    }

    deleteButtonPress() {
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push('/')
        });
    }
    
    render() {
        const { post, voteForPost } = this.props;
        if (!post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/"><Button>Back</Button></Link>
                <Link to={`/posts/edit/${post.id}`}>
                    <Button bsStyle="warning">
                        Edit Post
                    </Button>
                </Link>
                <Button bsStyle="danger" onClick={this.deleteButtonPress.bind(this)}>
                    Delete Post
                </Button>
                <Row>
                    <Col md={12}>
                        <Col md={8} className="text-left">
                            <h2>{post.title}<br/><small>Posted by {post.author}</small></h2>
                            <div className="badge">{timestampToDate(post.timestamp)}</div>
                            <h4><Label bsStyle="primary">{post.category}</Label></h4>
                            <p>{post.body}</p>
                        </Col>
                        <Col md={4} className="text-right">
                            <h3><Label bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}</Label></h3>
                            <Button onClick={() => voteForPost(post.id, 'upVote')}>
                                <Glyphicon glyph="thumbs-up" />
                            </Button>
                            <Button onClick={() => voteForPost(post.id, 'downVote')}>
                                <Glyphicon glyph="thumbs-down" />
                            </Button>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-right">
                      <Link to={`/posts/${post.id}/comments/new`}>
                            <Button bsStyle="primary">Add comment</Button>
                        </Link>  
                    </Col>
                </Row>

                <CommentsList postId={post.id} />
            </div>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost, voteForPost })(PostsDetail);

