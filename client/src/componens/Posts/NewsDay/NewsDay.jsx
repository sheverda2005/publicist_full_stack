import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./slider.css"

function NewsDay({ news }) {
  const history = useNavigate()
  if (news.length > 0) {
    return (
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ backgroundImage: `url(${news[0].img})` }} >
          <div className="card">
            <div className="black card-img-overlay"></div>
          </div>
          <div onClick={()=> history(`/post/page/${news[0].id}`)} className="carousel-caption">
            <h1>{news[0].title}</h1>
            <h5>{news[0].text}</h5>
          </div>
        </div>
        <div className="carousel-item" style={{ backgroundImage: `url(${news[1].img})` }} >
          <div className="card">
            <div className="black card-img-overlay"></div>
          </div>
          <div onClick={()=> history(`/post/page/${news[1].id}`)} className="carousel-caption">
            <h1>{news[1].title}</h1>
            <h5>{news[1].text}</h5>
          </div>
        </div>
        <div className="carousel-item" style={{ backgroundImage: `url(${news[2].img})` }} >
          <div className="card">
            <div className="black card-img-overlay"></div>
          </div>
          <div onClick={()=> history(`/post/page/${news[2].id}`)} className="carousel-caption">
            <h1>{news[2].title}</h1>
            <h5>{news[2].text}</h5>
          </div>
        </div>
        <div className="carousel-item" style={{ backgroundImage: `url(${news[3].img})` }} >
          <div className="card">
            <div className="black card-img-overlay"></div>
          </div>
          <div onClick={()=> history(`/post/page/${news[3].id}`)} className="carousel-caption">
            <h1>{news[3].title}</h1>
            <h5>{news[3].text}</h5>
          </div>
        </div>
        <div className="carousel-item" style={{ backgroundImage: `url(${news[4].img})` }} >
          <div className="card">
            <div className="black card-img-overlay"></div>
          </div>
          <div onClick={()=> history(`/post/page/${news[4].id}`)} className="carousel-caption">
            <h1>{news[4].title}</h1>
            <h5>{news[4].text}</h5>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    );
  }
}


const mapStateToProps = state => ({
  news: state.posts.newsDay.news
})

export default connect(mapStateToProps, null)(NewsDay);
