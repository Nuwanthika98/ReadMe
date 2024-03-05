import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

export default function UpdateBlog(){

    const {id} = useParams()
    
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8070/blog/get/"+id)
        .then((res) => {
            setTitle(res.data.title);
            setCategory(res.data.category);
            setContent(res.data.content);
        })
        .catch((err) => {
            alert(err.message);
        });
    },[])
    
    function sendData(e){
        e.preventDefault();
        
        const updatedBlog ={
            title,
            category,
            content
        }

        axios.put("http://localhost:8070/blog/update/"+id,updatedBlog).then(()=>{
            alert("Blog updated!")
            window.location.reload()
            
        }).catch((err)=>{
            alert(err);
        })  
    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
                <h1>Update Blog</h1>
                <div className="updateBlog">
                    <label htmlFor="title" className="title-label">Title  :</label>
                    <input type="text" className="title" id="title" placeholder="Enter the name here" 
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}/>
                </div>

                <div className="updateBlog">
                    <label htmlFor="category" className="category-label">Category  : </label>
                    <input type="text" className="category" id="category" placeholder="Enter the category here" 
                    onChange={(e)=>{
                        setCategory(e.target.value);
                    }}/>
                </div>

                <div className="updateBlog" >
                    <label htmlFor="content" className="text-label">Content  :</label>
                    <input type="text" className="content" id="content" placeholder="Enter the content here" 
                    onChange={(e)=>{
                        setContent(e.target.value);
                    }}/>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>

            </form>
        </div> 
    )
}