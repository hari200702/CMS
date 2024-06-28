import React from 'react'
import Navbar from '../Components/Navbar'
import '../assets/css/home.css'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className='home'>
        <h1 className='home-title'>
            CMS
        </h1>
        <p>
            Start Colleccting your contacts
        </p>
    </div>
    </>
  )
}

export default Home
