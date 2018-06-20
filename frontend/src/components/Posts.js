import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Modal from 'react-modal';

class Posts extends Component {
    state = {
        createPostModalOpen: false
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }
      
    createPost = () => this.setState(() => ({ createPostModalOpen: true }))
    closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))

    render() {
        console.log('state props', this.props)
        return (
            <div>
            <button onClick={this.createPost}>Create Post</button>
            <Modal
              overlayClassName='overlay'
              isOpen={this.state.createPostModalOpen}
              onRequestClose={this.closeCreatePostModal}
              contentLabel='Modal'
            >
              <label>Title</label>
              <input
                  className='title-input'
                  type='text'
                  ref={(input) => this.input = input}
                />
                <label>Body</label>
              <input
                  className='body-input'
                  type='text'
                  ref={(input) => this.input = input}
                />
                <label>Author</label>
                <input
                    className='author-input'
                    type='text'
                    ref={(input) => this.input = input}
                  />
              <button onClick={this.closeCreatePostModal}>Close modal</button>
            </Modal>
            <ListGroup componentClass="ul">
                {this.renderPosts()}
            </ListGroup>
        </div>
        );
    }
}

function mapStateToProps (state) {
    console.log(state);
    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts })(Posts);
