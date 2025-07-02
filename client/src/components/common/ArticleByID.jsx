// import React, { useState } from 'react'
// import {useLocation} from 'react-router-dom'
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { userContextObj } from '../../contexts/userContext';
// import { useContext } from 'react';
// import { MdRestorePage } from "react-icons/md";

// function ArticleByID() {
//   const {currentUser}=useContext(userContextObj);
//   // console.log(currentUser)
//   const {state}=useLocation();
//   const [editStatus,setEditStatus]=useState(false);

//   function enableEdit(){
//     setEditStatus(true);
//   }
//   // console.log(state)
//   return (
//     <div className='w-100 container my-2' >
//       {
//         !editStatus?
//           <div className="d-flex flex-column justify-content-between">
//             <div className="mb-3 w-100 px-4 py-2 rounded-4 bg-secondary d-flex justify-content-between align-items-center">
//               <div className="d-flex flex-row gap-3 ">
//                 <p className="display-6 text-white">{state.articleObj.title}</p>
//                 <div>
//                   {
//                     currentUser.firstName==state.articleObj.authorData.nameOfAuthor &&  <div>
//                         <button className="btn btn-lg text-warning" onClick={enableEdit}><FaRegEdit /></button>
//                         {
//                           state.articleObj.isArticleActive ?
//                           <button className="btn btn-lg text-warning"><RiDeleteBin6Fill /></button>
//                           :
//                           <button className="btn btn-lg text-success"><MdRestorePage /></button>
//                         }
//                       </div>
//                   }
//                 </div>
//               </div>
//               <div className='d-flex flex-column gap-1'>
//                 <img src={state.articleObj.authorData.profileImageUrl} alt="" className='rounded-circle w-100 mx-auto' style={{maxWidth:"40px",height:"40px"}} />
//                 <p className='text-white'><span className='text-warning'>Author: </span>{state.articleObj.authorData.nameOfAuthor}</p>
//               </div>
//             </div>
//             <div className='container w-100 px-4 py-4 rounded-4 bg-secondary' >
//               <p className=''>{state.articleObj.content}</p>
//             </div>
//             <div className='w-100 container my-2 rounded-4 bg-secondary'>
//               {
//                 state.articleObj.comments.length==0? <p className='text-center  p-3'>No comments yet</p>:
//                   state.articleObj.comments.map((commentObj)=>{
//                     return <div key={commentObj._id} >
//                       {console.log(commentObj)}
//                         <p>{commentObj?.nameOfUser}</p> 
//                         <p>{commentObj.comment}</p>
//                       </div>
//                   })
//                 }
//             </div>
//           </div>
//         :
//         <div className='w-100 container my-2 rounded-4 bg-secondary'>
//            <form className="article-form" >
//             <div className="form-grid">
//               {/* Left Column - Title and Category */}
//               <div className="left-column">
//                 <div className="form-group">
//                   <label htmlFor="title" className="form-label">
//                     <span className="label-text">Title</span>
//                     <span className="label-required">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-input ${errors.title ? "error" : ""}`}
//                     id="title"
//                     placeholder="Enter your article title..."
//                     {...register("title", { required: "Title is required" })}
//                   />
//                   {errors.title && <p className="error-message">{errors.title.message}</p>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="category" className="form-label">
//                     <span className="label-text">Category</span>
//                     <span className="label-required">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-input ${errors.category ? "error" : ""}`}
//                     id="category"
//                     placeholder="e.g. Technology, Health, Lifestyle..."
//                     {...register("category", { required: "Category is required" })}
//                   />
//                   {errors.category && <p className="error-message">{errors.category.message}</p>}
//                 </div>

//                 {/* Button for desktop - hidden on mobile */}
//                 <button className="submit-btn desktop-btn" type="submit">
//                   <span className="btn-text">Publish Article</span>
//                   <span className="btn-icon">📝</span>
//                 </button>
//               </div>

//               {/* Right Column - Content */}
//               <div className="right-column">
//                 <div className="form-group">
//                   <label htmlFor="content" className="form-label">
//                     <span className="label-text">Content</span>
//                     <span className="label-required">*</span>
//                   </label>
//                   <textarea
//                     className={`form-textarea ${errors.content ? "error" : ""}`}
//                     id="content"
//                     rows="8"
//                     placeholder="Write your article content here..."
//                     {...register("content", { required: "Content is required" })}
//                   ></textarea>
//                   {/* {errors.content && <p className="error-message">{errors.content.message}</p>} */}
//                 </div>
//               </div>
//             </div>

//             {/* Button for mobile - hidden on desktop */}
//             <button className="submit-btn mobile-btn" type="submit">
//               <span className="btn-text">Publish Article</span>
//               <span className="btn-icon">📝</span>
//             </button>
//           </form>
//         </div>
//       }
//     </div>
//   )
// }

// export default ArticleByID




import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRestorePage } from "react-icons/md";
import { userContextObj } from '../../contexts/userContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function ArticleByID() {
  const { currentUser } = useContext(userContextObj);
  const { state } = useLocation();
  const [editStatus, setEditStatus] = useState(false);

  const { title, category, content } = state.articleObj;

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
    try {
      const res = await axios.put(
        `http://localhost:3000/author-api/article/${state.articleObj.articleId}`,
        updatedData
      );
      console.log(res)
      if (res.data.message === "article updated") {
        alert("✅ Article updated successfully");
        setEditStatus(false);
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
              <p className="display-6 text-white">{state.articleObj.title}</p>
              {
                currentUser.firstName === state.articleObj.authorData.nameOfAuthor &&
                <div>
                  <button className="btn btn-lg text-warning" onClick={enableEdit}>
                    <FaRegEdit />
                  </button>
                  {
                    state.articleObj.isArticleActive ? (
                      <button className="btn btn-lg text-warning"><RiDeleteBin6Fill /></button>
                    ) : (
                      <button className="btn btn-lg text-success"><MdRestorePage /></button>
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
            <p>{state.articleObj.content}</p>
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
