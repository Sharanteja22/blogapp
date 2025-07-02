import React from 'react'
import {useLocation} from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { userContextObj } from '../../contexts/userContext';
import { useContext } from 'react';
import { MdRestorePage } from "react-icons/md";

function ArticleByID() {
  const {currentUser}=useContext(userContextObj);
  // console.log(currentUser)
  const {state}=useLocation();
  // console.log(state)
  return (
    <div className='w-100 container my-2' >
      <div className="d-flex flex-column justify-content-between">
        <div className="mb-3 w-100 px-4 py-2 rounded-4 bg-secondary d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row gap-3 ">
            <p className="display-6 text-white">{state.articleObj.title}</p>
            <div>
              {
                currentUser.firstName==state.articleObj.authorData.nameOfAuthor &&  <div>
                    <button className="btn btn-lg text-warning"><FaRegEdit /></button>
                    {
                      state.articleObj.isArticleActive ?
                      <button className="btn btn-lg text-warning"><RiDeleteBin6Fill /></button>
                      :
                      <button className="btn btn-lg text-success"><MdRestorePage /></button>
                    }
                  </div>
              }
            </div>
          </div>
          <div className='d-flex flex-column gap-1'>
            <img src={state.articleObj.authorData.profileImageUrl} alt="" className='rounded-circle w-100 mx-auto' style={{maxWidth:"40px",height:"40px"}} />
            <p className='text-white'><span className='text-warning'>Author: </span>{state.articleObj.authorData.nameOfAuthor}</p>
          </div>
        </div>
        <div className='container w-100 px-4 py-4 rounded-4 bg-secondary' >
          <p className=''>{state.articleObj.content}</p>
        </div>
        <div className='w-100 container my-2 rounded-4 bg-secondary'>
          {
            state.articleObj.comments.length==0? <p className='text-center  p-3'>No comments yet</p>:
              state.articleObj.comments.map((commentObj)=>{
                return <div key={commentObj._id} >
                  {console.log(commentObj)}
                    <p>{commentObj?.nameOfUser}</p> 
                    <p>{commentObj.comment}</p>
                  </div>
              })
            }
        </div>
      </div>
    </div>
  )
}

export default ArticleByID