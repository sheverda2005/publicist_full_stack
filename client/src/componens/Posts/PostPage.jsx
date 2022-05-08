import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import "./postPage.css"
function PagePost({ posts }) {
    const { id } = useParams()
    const post = posts.filter(post => post.id === id)
    const pageHtml = useRef(null)
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        if (post[0]) {
            pageHtml.current.innerHTML = post[0].htmlPage
        }
    }, [post])
    if (post[0]) {
        return (
            <div className="container mt-3">
                <div ref={pageHtml} className="allElemet">
                    Value
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.postImpotent.posts.concat(state.posts.posts.posts).concat(state.posts.newsDay.news)
})

export default connect(mapStateToProps, null)(PagePost);