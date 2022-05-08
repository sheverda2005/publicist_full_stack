import { connect } from "react-redux";
import { createPostHTML, createPostImg, createPostImpotent, createPostText, createPostTitle, submitCreatePost } from "../../store/actions";
import Alert from "../Alert";
import AlertSuccess from "../AlertSUCESS";
import { Editor } from '@tinymce/tinymce-react';
import {useRef} from 'react'

function CreatePost({ titleDispatch, textDispatch, title, text, submit, img, imgDispatch, impotent, impotentState, done, error, htmlPage, htmlPageState }) {
    const editorRef = useRef()
    const log = () => {
        if (editorRef.current) {
            htmlPage(editorRef.current.getContent())
        }
    };
    return (
        <div className="container">
            {done ? <AlertSuccess done={done} /> : ""}
            {error ? <Alert error={error} /> : ''}
            <form className="mt-4" onSubmit={(event) => submit(event, title, text, img, impotentState, htmlPageState)} >
                <div className="mb-3">
                    <label className="form-label">Заголовок</label>
                    <input value={title} onChange={(event) => titleDispatch(event.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Підзаголовок</label>
                    <input value={text} onChange={(event) => textDispatch(event.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Зображення (силка)</label>
                    <input value={img} onChange={(event) => imgDispatch(event.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <select value={impotentState} class="form-select" id="inputGroupSelect02" onChange={(event) => impotent(event.target.value)}>
                        <option value="USUALLY">Основні новини</option>
                        <option value="IMPOTENT_NEWS">Головні новини</option>
                        <option value="NEWS_DAY">Розмістити новину на слайдер</option>
                    </select>
                </div>
                <label className="form-label">Вміст веб-сторінки</label>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={done? ' ': null}
                    initialValue=""
                    apiKey="x8a0nriqxxvxt62v8htnzdd4k8tv8eak0atd0hhsghh6db6g"
                    init={{
                        selector: 'textarea', 
                        plugins: 'media image',
                        image_dimensions: false,
                        image_class_list: [
                            {title: 'Responsive', value: 'img-fluid'}
                        ],
                        mobile: {
                            menubar: true
                        },
                        media_filter_html: true
                    }}
                />
                <button onClick={log} type="submit" className="btn btn-primary mt-3">Створити пост</button>
            </form>
        </div >
    );
}

const mapDispatchToProps = {
    titleDispatch: createPostTitle,
    textDispatch: createPostText,
    imgDispatch: createPostImg,
    impotent: createPostImpotent,
    htmlPage: createPostHTML,
    submit: submitCreatePost,
}

const mapStateToProps = state => ({
    title: state.posts.createPost.title,
    text: state.posts.createPost.text,
    img: state.posts.createPost.img,
    htmlPageState: state.posts.createPost.htmlPage,
    impotentState: state.posts.createPost.impotent,
    done: state.alert.doneAlert.done,
    error: state.alert.error.error.error
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);