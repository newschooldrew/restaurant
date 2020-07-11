import React, { Component } from 'react'
const mongoose = require('mongoose');
const Post = mongoose.model('post')

export default class CreatePost extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:'',
            content:''
        }
    }

    onChange = e =>{
        const {name, value } = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const {title,content} = this.state;
        const post = new Post({content})
        post.save()
    }

    render() {
        return (
            <form>
                <label>Title</label>
                    <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
                <label>Content</label>
                    <input type="textarea" name="content" onChange={this.onChange} value={this.state.content} />
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
            </form>
            
        )
    }
}
