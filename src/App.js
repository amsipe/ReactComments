import React, { Component } from 'react';
import './App.css';
import Post from './Posts.js'


const postDefault = {
                post: "",
                likes: null,
                dislikes: null,
                replying: false,
                comments: []
              }
const commentDefault = {
                        message: null,
                        likes: null,
                        dislikes: null
                      }
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      input: '',
      replyMessage: ''
      
    }
    this.handlePost = this.handlePost.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handlePostReply = this.handlePostReply.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handlePostOpinion = this.handlePostOpinion.bind(this);
    this.handleCommentOpinion = this.handleCommentOpinion.bind(this);
  }
  handlePost(e) {
    e.preventDefault();
    let newPost = Object.assign({},postDefault);
    let modifiedState = this.state.posts.slice();
    newPost.post = this.state.input;
    this.setState({
      posts: [...modifiedState,newPost],
      input: '',
    });

  }

  handlePostChange(e){
    let inputChange = e.target.value;
    this.setState({
      input: inputChange
    })
  }

  handleDeleteComment (indexPost,curComment){

    let modifiedState = this.state.posts.slice();
    let removeComment = modifiedState[indexPost].comments.filter(function(comment){
      return curComment !== comment;
    })
    modifiedState[indexPost].comments = removeComment;
    console.log(removeComment)
    this.setState({
      posts: modifiedState
    })
  }
  handleDeletePost (curPost){
    console.log(curPost);
    let removedPost = this.state.posts.filter(function(post){
      return curPost !== post;
    })
    this.setState({
      posts: removedPost
    })
  }

  handlePostReply (index) {
    let isReplying = this.state.posts.slice();
    isReplying[index].replying = true;
    this.setState({
      posts: isReplying
     }
    )
  }
  handlePostOpinion(index,delta){
    let modifiedOpinion = this.state.posts.slice();
    if(delta > 0){
      modifiedOpinion[index].likes++;
    }else if(delta < 0){
      modifiedOpinion[index].dislikes++;
    }
    this.setState({
      posts: modifiedOpinion
    })
  }
  handleCommentSubmit(e,index){
    e.preventDefault();
    let modifyPosts = this.state.posts.slice();
    let modifyComments = modifyPosts[index].comments.slice();
    let newComment = Object.assign({},commentDefault);
    newComment.message = this.state.replyMessage;
    modifyComments.push(newComment);
    modifyPosts[index].comments = modifyComments;
    modifyPosts[index].replying = false;
    this.setState({
      posts: modifyPosts,
      replyMessage: ''
    })
  }

  handleCommentChange(e,index){
    this.setState({
      replyMessage: e.target.value
    })
  }

  handleCommentOpinion(indexPost,indexCom,delta){
    console.log(indexPost,indexCom,delta);
    let modifiedOpinion = this.state.posts.slice();
    if(delta > 0){
      modifiedOpinion[indexPost].comments[indexCom].likes++;
    }else if(delta < 0){
      modifiedOpinion[indexPost].comments[indexCom].dislikes++;
    }
    this.setState({
      posts: modifiedOpinion
    })
  }

  render() {
    
    return (
      <div className="App">
          <div className="wrapper-input">
            <div className="container-input">
                <form onSubmit={(event)=>{this.handlePost(event)}}>
                    <label htmlFor="input-post">Write your post:</label>
                    <button>Post</button>
                    <textarea name="input-post" id="input-post" cols="60" rows="4" value={this.state.input} onChange={this.handlePostChange}></textarea>
                </form>
            </div>
          </div>
          <div className="container-posts">
          <ul>
            {this.state.posts.map(function(post,index){
              return (
                <Post 
                key={index} 
                newPost={post} 
                index={index}
                likes={this.state.posts[index].likes}
                dislikes={this.state.posts[index].dislikes}
                replyMessage={this.state.replyMessage}
                onDeleteComment={this.handleDeleteComment}
                onCommentChange={this.handleCommentChange}
                onCommentSubmit={this.handleCommentSubmit}
                onPostReply={this.handlePostReply}
                onPostOpinion={this.handlePostOpinion}
                onCommentOpinion={this.handleCommentOpinion}
                onDeletePost={this.handleDeletePost}
                
                />
              )
            }.bind(this))
            }
          </ul>
      </div>
    </div>
    );
  }
}

export default App;
