import React from 'react';
import './App.css';

function Post (props) {
    // console.log(props.newPost)
    return (
      <div>
        <li>
            <div className="outer-post">
                <p>{props.newPost.post}</p>
                <button className="reply-button" onClick={()=>{props.onPostReply(props.index)}}>Reply</button>
                <button className="reply-like" onClick={()=>{props.onPostOpinion(props.index,1)}}>{props.likes} Like</button>
                <button className="reply-dislike" onClick={()=>{props.onPostOpinion(props.index,-1)}}>{props.dislikes} Dislike</button>
                <button className="reply-delete" onClick={()=>{props.onDeletePost(props.newPost)}}>Delete</button>
            </div>
            {(props.newPost.replying) ? 
                <div>
                    <form>
                        <textarea cols="60" rows="4" value={props.replyMessage} onChange={(event)=>{props.onCommentChange(event,props.index)}}></textarea>
                        <button onClick={(event)=>{props.onCommentSubmit(event,props.index)}}>Comment</button>
                    </form>
                </div>
            : null
            }
                
            <ul className="comment-list">
                {props.newPost.comments.map(function(comment,index){
                    if(comment.message){
                        return (
                            <Comment 
                            key={index} 
                            postIndex={props.index}
                            index={index} 
                            comment={comment} 
                            likes={props.newPost.comments[index].likes}
                            dislikes={props.newPost.comments[index].dislikes}
                            onDeleteComment={props.onDeleteComment}
                            onCommentOpinion={props.onCommentOpinion}
                            />
                        )
                    }else{
                        return null;
                    }
                    })
                }

            </ul>
        </li>
      </div>
    );

}

function Comment (props){
    return (
        <li>
            <div>
                <p>{props.comment.message}</p>
                <button className="reply-like" onClick={()=>{props.onCommentOpinion(props.postIndex,props.index,1)}}>{props.likes} Like</button>
                <button className="reply-dislike" onClick={()=>{props.onCommentOpinion(props.postIndex,props.index,-1)}}>{props.dislikes} Dislike</button>
                <button className="reply-delete" onClick={()=>{props.onDeleteComment(props.postIndex,props.comment)}}>Delete</button>
            </div>
        </li>
    )
}
export default Post;


