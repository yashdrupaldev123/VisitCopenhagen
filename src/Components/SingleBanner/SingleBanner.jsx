import React from 'react'
import './SingleBanner.css'
const SingleBanner = ({className,image,title,subTitle}) => {
  return (
    <section className={`single-banner ${className}`}>
      <div className="container inner-container">
        <img src={image} alt={title}/>
        <div className="text-content">
                <h1 className='title'>
                        { title }
                </h1>
                <p className='subTitle'>
                        { subTitle }
                </p>
        </div>
      </div>
    </section>
  )
}

export default SingleBanner
