import React,{useState} from 'react';
import axios from 'axios';

export default function AddBlog(){
    
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newBlog ={
            title,
            category,
            content
        }

        axios.post("http://localhost:8070/blog/add",newBlog).then(()=>{
            alert("Blog added!")
            
        }).catch((err)=>{
            alert(err);
        })  
    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
                <div className="newBlog">
                    <label htmlFor="title" className="title-label">Title  :</label>
                    <input type="text" className="title" id="title" placeholder="Enter the title here" 
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}/>
                </div>

                <div className="newBlog">
                    <label htmlFor="category" className="category-label">Category  : </label>
                    <input type="text" className="category" id="category" placeholder="Enter the category here" 
                    onChange={(e)=>{
                        setCategory(e.target.value);
                    }}/>
                </div>

                <div className="newBlog" >
                    <label htmlFor="content" className="text-label">Content  :</label>
                    <input type="text" className="content" id="content" placeholder="Enter the content here" 
                    onChange={(e)=>{
                        setContent(e.target.value);
                    }}/>
                </div>

                <button type="submit" className="btn btn-primary">Add</button>

            </form>
        </div> 
    )
}