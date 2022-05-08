import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../store/actions";

function Post({id, title, text, useName, surName, userEmail, email, deletePost}) {
    const history = useNavigate()

    return (
        <div className="col col-12  my-4">
            <div className="card">
                <div onClick={(event)=> {
                    if (event.target.localName !== 'button') history(`/post/page/${id}`)
                }} className="card-body">
                    <h6>{title}</h6>
                    <p className="card-text">{text}</p>
                    {userEmail === email ?  <button onClick={()=> deletePost(id)} className="btn btn-danger" >Видалити пост</button> : ''}
                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = {
    deletePost: deletePost
}

const mapStateToProps = state => ({
    userEmail: state.account.user.user === null ? false : state.account.user.user.email
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);