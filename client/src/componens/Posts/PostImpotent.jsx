import React from 'react'
import { connect } from "react-redux";
import { deletePost, deletePostImpotent } from "../../store/actions";
import {useNavigate} from "react-router-dom";

function PostImpotent({id, title, text, useName, surName, userEmail, email, deletePost}) {
    const history = useNavigate()

    return (
        <div className="col col-12 my-4">
            <div className="card">
                <div onClick={(event)=> {
                    if (event.target.localName !== 'button') history(`/post/page/${id}`)
                }} className="card-body">
                    <h5>{title}</h5>
                    <p className="card-text">{text}</p>
                    {userEmail === email ? <button className="btn btn-danger" onClick={() => {
                        deletePost(id)}
                    }>Видалити пост</button> : ''}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    deletePost: deletePostImpotent
}

const mapStateToProps = state => ({
    userEmail: state.account.user.user === null ? false : state.account.user.user.email
})

export default connect(mapStateToProps, mapDispatchToProps)(PostImpotent);