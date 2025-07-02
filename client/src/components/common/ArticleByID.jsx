import React from 'react'
import {useLocation} from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function ArticleByID() {

  const {state}=useLocation();
  console.log(state)
  return (
    <div className='w-100 container my-2' >
      <div className="d-flex justify-content-between">
        <div className="mb-5 w-100 px-4 py-2 rounded-4 bg-secondary d-flex justify-content-between align-items-center">
          <p className="display-6 text-white">{state.articleObj.title}</p>
          <div className='d-flex flex-column gap-1'>
            <img src={state.articleObj.authorData.profileImageUrl} alt="" className='rounded-circle w-100 mx-auto' style={{maxWidth:"40px",height:"40px"}} />
            <p className='text-white'><span className='text-warningf'>Author: </span>{state.articleObj.authorData.nameOfAuthor}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleByID