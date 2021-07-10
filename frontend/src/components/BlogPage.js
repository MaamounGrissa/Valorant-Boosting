import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListBlog } from '../actions/blogActions';
import ErrorPage from './modules/ErrorPage';
import LoadingBox from './modules/LoadingBox';

export default function BlogPage() {

    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.blogList)
    const { loading, error, blog } = blogList;

    useEffect(() => {
        dispatch(ListBlog())
    }, [dispatch]);
    
    if (loading) {
        return (<LoadingBox></LoadingBox>)
    } else if (error) {
        return (<ErrorPage msg={error} />)
    } else {
        return (
            <div>
                <div className="product-page">
                    <div className="head-page">
                        <img src="/images/blog/blog-header.jpg" alt="Blog" />
                    </div>
                </div>
                {
                    blog.map(item =>
                        <div>
                            {item.title}
                        </div>
                    )
                }
            </div>
        )
    }
}
