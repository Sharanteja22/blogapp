import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Articles() {
    const [articles,setArticles]=useState([]);
    const [error,setError]=useState('');  
    const navigate = useNavigate();
    function gotoArticleById(articleObj){
     navigate(`../${articleObj.articleId}`,{state:{articleObj}});
    }

    async function  getArticles(){
      let res=await axios.get('http://localhost:3000/author-api/articles');
      if(res.data.message=="articles"){
        setArticles(res.data.payload);
        setError('');
      }else{
        setError(res.data.message);
      }
    }
    useEffect(()=>{
      getArticles();
    },[])
  return (
    <div className='w-100 container'>
      <div>
        <h3 className='text-center p-2'>Articles</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {
            articles.map((articleObj)=>
              <div className='col py-2' key={articleObj.articleId}>
                  <div className="card h-100">
                    <div className="card-body">
                      <div>
                        <div className='d-flex  justify-content-between align-items-center'>
                          <img src={articleObj.authorData.profileImageUrl} className="card-img-top rounded-circle" alt="NOIMG"  style={{width:"40px",height:"40px"}}/>
                          <p>
                            <small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small>
                          </p>
                        </div>
                        <h5 className='card-title py-2'>{articleObj.title}</h5>
                        <p className='card-text'>{articleObj.content.substring(0,100)+"..."}<span><button className="btn btn-4 btn-sm float-end text-primary" onClick={()=>gotoArticleById(articleObj)}>Read More</button></span></p>
                      </div>
                      {/* <div className="card-footer">
                      </div> */}
                    </div>
                  </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Articles