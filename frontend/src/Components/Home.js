import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import UpdateBlog from './UpdateBlog.js'
import SearchBar from './SearchBar.js';

export default function Home() {
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        function getBlogs() {
            axios.get("http://localhost:8070/blog/getall")
                .then((res) => {
                    setBlogs(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getBlogs();
    }, []);

    const handleDelete =(id)=>{
        axios.delete("http://localhost:8070/blog/delete/"+id)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>alert(err.message))
    }

    const handleSearch = (searchResults) => {
        setBlogs(searchResults);
      };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <h1>All Blogs</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td>{blog.content}</td>
                            <td>
                                <Link to={`/update/${blog._id}`} className="btn">Edit</Link>
                                <button className="btn" onClick={(e)=>handleDelete(blog._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
