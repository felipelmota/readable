import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editPost, fetchPost } from '../actions';

class PostsEdit extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id);
    }
    
    componentDidMount() {
        this.handleInitialize();
    }
    
    handleInitialize() {
        if (this.props.post) {
          const initData = {
            "title": this.props.post.title,
            "body": this.props.post.body
          };
          this.props.initialize(initData);
        }
    }
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (
            <FormGroup validationState={className}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }
    
    onSubmit(values) {
        const { editPost, match: { params: { id, category } }, history } = this.props;
        editPost(id, values, () => {
            history.push(`/${category}/${id}`);
        });
    }
    
    render() {
        const { handleSubmit, post } = this.props;
        console.log('post', this.props.post)
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title:" name="title" component={this.renderField} />
                <Field label="Content:" name="body" component={this.renderField} />
                <FormGroup>
                    <ControlLabel>Author</ControlLabel>
                    <FormControl.Static>{post ? post.author : ''}</FormControl.Static>
                </FormGroup>
                <Button type="submit" bsStyle="primary">Update</Button>
                
                <Link to={'/'} className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Title!"
    }
    
    if (!values.author) {
        errors.author = "Author's name!"
    }
    
    if (!values.body) {
        errors.body = "Content"
    }
    
    return errors;
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default reduxForm({
    validate,
    form: 'EditPostForm'
})(
    connect(mapStateToProps, { editPost, fetchPost })(PostsEdit)
);
