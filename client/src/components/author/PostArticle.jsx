import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { userContextObj } from '../../contexts/userContext'
import { useNavigate } from 'react-router-dom'

function PostArticle() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { currentUser } = useContext(userContextObj);
  const navigate=useNavigate();
  const onSubmit = async (formData) => {
    console.log(formData);
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    };
    formData.authorData=authorData;
    formData.articleId=Date.now();
    let currentDate=new Date();
    formData.dateOfCreation=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+currentDate.toLocaleTimeString("en-US",{hour12:true});
    formData.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+currentDate.toLocaleTimeString("en-US",{hour12:true});
    formData.comments=[] 
    try {
      const res = await axios.post("http://localhost:3000/author-api/article", formData);
      console.log(res);
      reset();
      if(res.status===201){
        navigate(`/author-profile/${currentUser.email}/articles`);
      }else{
        console.log("error got")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form className='w-75 mx-auto mt-5 bg-white' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group px-4 py-3">
          <label htmlFor="title" className='my-1'>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Artificial Intelligence"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        <div className="form-group px-4 py-3">
          <label htmlFor="category" className='my-1'>Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="e.g. Tech, Health"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="text-danger">{errors.category.message}</p>}
        </div>

        <div className="form-group px-4 pb-3">
          <label htmlFor="content" className='my-1'>Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            {...register("content", { required: "Content is required" })}
          ></textarea>
          {errors.content && <p className="text-danger">{errors.content.message}</p>}
        </div>

        <button className="btn btn-success m-2 px-3 py-2" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PostArticle
