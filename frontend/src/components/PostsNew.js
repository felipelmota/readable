import _ from 'lodash';

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPost, fetchCategories } from '../actions';
import { capitalize } from '../utils/helpers';

class PostsNew extends Component {

    componentWillMount() {
        this.props.fetchCategories();
    }
    
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
    
    renderCategoryFields(field) {
        const { categories } = this.props;
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <select {...field.input} className="form-control">
                    <option value="" className="disabled">-- Select content</option>
                    {_.map(categories, category => (
                        <option key={category.name} value={category.name}>
                            {capitalize(category.name)}
                        </option>
                    ))}
                </select>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
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
        const { handleSubmit, categories, form } = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field label="Title:" name="title" component={this.renderField} />
              <Field label="Content:" name="body" component={this.renderField} />
              <Field label="Author:" name="author" component={this.renderField} />
              <label>Category</label>
              <Field label="Category:" name="category" component={field => this.renderCategoryFields(field)} />
              <br />
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

    if (!values.category) {
        errors.category = "Select some content!"
    }
    
    return errors;
}

function mapStateToProps(state) {
    return { categories: state.categories }
}


export default reduxForm({ validate, form: 'CreatePostForm'})(
    connect(mapStateToProps, { createPost, fetchCategories })(PostsNew)
);
