import { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { page, pageImpotent } from "../../store/actions";
import Loading from "../Loading";
import Post from "./Post";
import PostImpotent from "./PostImpotent";
import "./posts.css"

function Posts({ posts, page, pageState, count, loading, impotentPosts, countImpotent, pageStateImpotent, pageImpotent }) {
    const countPage = Math.ceil(count / 10)
    const countPageImpotent = Math.ceil(countImpotent / 10)
    const observer = useRef()
    const lastElement = useCallback((element) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(element => {
            if (element[0].isIntersecting) {
                if (pageState < countPage && loading === false) {
                    page()
                }
            }
        })
        if (element) observer.current.observe(element)
    })
    const observerImpotent = useRef()
    const lastElementImpotent = useCallback((element) => {
        if (observerImpotent.current) observerImpotent.current.disconnect()
        observerImpotent.current = new IntersectionObserver(element => {
            if (element[0].isIntersecting) {
                if (pageStateImpotent < countPageImpotent && loading === false) {
                    pageImpotent()
                }
            }
        })
        if (element) observerImpotent.current.observe(element)
    })
    return (
        <div className="row">
            <div className="col col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                <h3>Головні новини</h3>
                {impotentPosts.map((post) => {
                    return <PostImpotent key={post.id} id={post.id} title={post.title} text={post.text} useName={post.useName} surName={post.surName} email={post.email} />
                })}
                <div ref={lastElementImpotent} className="lastElement col col-12" ></div>
            </div>
            <div className="col col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                <h3>Основні новини</h3>
                {posts.map((post) => {
                    return <Post key={post.id} id={post.id} title={post.title} text={post.text} useName={post.useName} surName={post.surName} email={post.email} />

                })}
                <div ref={lastElement} className="lastElement col col-12" ></div>
            </div>
            <div className="col col-12 mt-4 mb-4">
                {loading ? <Loading /> : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    posts: state.posts.posts.posts,
    impotentPosts: state.posts.postImpotent.posts,
    pageState: state.posts.posts.page,
    pageStateImpotent: state.posts.postImpotent.page,
    countImpotent: state.posts.postImpotent.count,
    count: state.posts.posts.count,
    loading: state.loading.loading
})

const mapDispatchToProps = {
    page: page,
    pageImpotent: pageImpotent,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);