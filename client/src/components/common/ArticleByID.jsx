import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRestorePage } from "react-icons/md";
import { userContextObj } from '../../contexts/userContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '@clerk/clerk-react'
function ArticleByID() {
  const { currentUser } = useContext(userContextObj);
  const { state } = useLocation();
  const [editStatus, setEditStatus] = useState(false);
  const navigate=useNavigate();
  const { title, category, content } = state.articleObj;
  const {getToken}=useAuth();

  async function deleteArticle(){
    const token=await getToken();
    state.articleObj.isArticleActive=false;
    let res=await axios.put(`http://localhost:3000/author-api/articleDelete/${state.articleObj.articleId}`,state.articleObj,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(res.data.message=="article deleted"){
      navigate(`/author-profile/articles/${state.articleObj.articleId}`,{state:{articleObj:res.data.payload}});
    }else{
      alert("❌ Failed to delete article");
    }
  }


  async function addComment(e){
    const token=await getToken();
    e.preventDefault();
    const commentObj ={comment:e.target.comment.value}
    if (commentObj.comment.trim() === "") return;
    e.target.reset();
    commentObj.nameOfUser=currentUser.firstName;
    console.log(commentObj)
    let res=await axios.put(`http://localhost:3000/user-api/comment/${state.articleObj.articleId}`,commentObj,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(res.data.message=="comment added"){
      alert("✅ Comment added successfully");
      navigate(`/user-profile/articles/${state.articleObj.articleId}`,{state:{articleObj:res.data.payload}});
    }else{
      alert("❌ Failed to add comment");
    }
  }

  async function restoreArticle(){
    const token=await getToken();
    state.articleObj.isArticleActive=true;
    let res=await axios.put(`http://localhost:3000/author-api/articleDelete/${state.articleObj.articleId}`,state.articleObj,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(res.data.message=="article restored"){
      navigate(`/author-profile/articles/${state.articleObj.articleId}`,{state:{articleObj:res.data.payload}});
    }else{
      alert("❌ Failed to restore article");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title,
      category,
      content,
    }
  });

  function enableEdit() {
    setEditStatus(true);
    reset({
      title: state.articleObj.title,
      category: state.articleObj.category,
      content: state.articleObj.content,
    });
  }

  async function onSubmit(updatedData) {
    const modifiedData = {...state.articleObj,...updatedData};  
    const currentDate=new Date();
    const token=await getToken();
    modifiedData.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+currentDate.toLocaleTimeString("en-US", { hour12: true });
    
    try {
      const res = await axios.put(
        `http://localhost:3000/author-api/article/${state.articleObj.articleId}`,
        modifiedData,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log(res)
      if (res.data.message === "article updated") {
        alert("✅ Article updated successfully");
        setEditStatus(false);
        navigate(`/author-profile/articles/${state.articleObj.articleId}`,{state:{articleObj:res.data.payload}});
      } else {
        alert("❌ Failed to update article");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Internal server error while updating article");
    }
  }

  return (
    <div className="w-100 container my-2">
      {!editStatus ? (
        <div className="d-flex flex-column justify-content-between">
          {/* Article Display View */}
          <div className="mb-3 w-100 px-4 py-2 rounded-4 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex flex-row gap-3 ">
              <p className="display-6 text-white">{title}</p>
              {
                currentUser.firstName === state.articleObj.authorData.nameOfAuthor &&
                <div>
                  <button className="btn btn-lg text-warning" onClick={enableEdit}>
                    <FaRegEdit />
                  </button>
                  {
                    state.articleObj.isArticleActive ? (
                      <button className="btn btn-lg text-warning" onClick={deleteArticle}><RiDeleteBin6Fill /></button>
                    ) : (
                      <button className="btn btn-lg text-warning" onClick={restoreArticle}><MdRestorePage /></button>
                    )
                  }
                </div>
              }
            </div>
            <div className='d-flex flex-column gap-1'>
              <img src={state.articleObj.authorData.profileImageUrl} alt="" className='rounded-circle w-100 mx-auto' style={{ maxWidth: "40px", height: "40px" }} />
              <p className='text-white'>
                <span className='text-warning'>Author: </span>{state.articleObj.authorData.nameOfAuthor}
              </p>
            </div>
          </div>

          <div className='container w-100 px-4 py-4 rounded-4 bg-secondary'>
            <p>{content}</p>
          </div>

          <div className='w-100 container my-2 rounded-4 bg-secondary'>
            {
              state.articleObj.comments.length === 0
                ? <p className='text-center p-3'>No comments yet</p>
                : state.articleObj.comments.map(commentObj => (
                  <div key={commentObj._id}>
                    <p>{commentObj?.nameOfUser}</p>
                    <p>{commentObj.comment}</p>
                  </div>
                ))
            }
          </div>
          {
            currentUser.role=='user' && 
              <div>
                <form onSubmit={addComment}>
                  <input
                    type="text"
                    className={`form-control m-2`}
                    id="comment"
                    name='comment'
                    
                  />
                  <button className="btn btn-success m-2 " type='submit'>Add Comment</button>
                </form>
              </div>
          }
        </div>        
      ) : (
        <div className='w-100 container my-2 rounded-4 bg-secondary'>
          {/* Article Edit Form */}
          <form className="article-form p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                {/* Title */}
                <div className="form-group mb-3">
                  <label htmlFor="title">Title<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    id="title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                {/* Category */}
                <div className="form-group mb-3">
                  <label htmlFor="category">Category<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                    id="category"
                    {...register("category", { required: "Category is required" })}
                  />
                  {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                </div>
              </div>

              {/* Content */}
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="content">Content<span className="text-danger">*</span></label>
                  <textarea
                    rows="7"
                    className={`form-control ${errors.content ? "is-invalid" : ""}`}
                    id="content"
                    {...register("content", { required: "Content is required" })}
                  ></textarea>
                  {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
                </div>
              </div>
            </div>

            <button className="btn btn-success mt-3 px-4 py-2" type="submit">
              Update Article
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ArticleByID;
