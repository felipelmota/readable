import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <FormControl type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }
    
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    
    render() {
        const { handleSubmit } = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field label="Title" name="title" component={this.renderField} />
              <Field label="Content" name="body" component={this.renderField} />
              <Field label="Author" name="author" component={this.renderField} />
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Title"
    }
    
    if (!values.author) {
        errors.author = "Author's name"
    }
    
    if (!values.body) {
        errors.body = "Content"
    }
    
    return errors;
}

export default reduxForm({ validate, form: 'CreatePostForm'})(
    connect(null, { createPost })(PostsNew)
);
