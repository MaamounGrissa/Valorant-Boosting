import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListBlog } from '../../actions/blogActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function Blog (props) {

    const dispatch = useDispatch();
    const blogList = useSelector( state => state.blogList);
    const {loading, error, blog} = blogList;

    useEffect(() => {
        dispatch(ListBlog());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingBox></LoadingBox> );
    
    } else if (error) {

        return ( <MessageBox variant="danger">{error}</MessageBox> );

    } else {
        return <div className="blog-block">
            <h2>Blog</h2>
            <p>Latest news from the blog</p>

            <div className="blog-container">
                {
                blog.map(item =>
                        <div className="blog-item" key={item._id}>
                            <img src={item.image} alt="News" />
                            <div className="blog-infos">
                                <div className="date">{item.date}</div>
                                <h3> {item.title} </h3>
                            </div>
                            <button className="view-all"><Link to="/news">Read more</Link></button>   
                        </div>
                )}
            </div>
            <button className="view-all"><Link to="/blog">View all posts</Link></button>
        </div>
    }

    
}

export default Blog;