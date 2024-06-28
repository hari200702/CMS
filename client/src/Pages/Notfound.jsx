import React from 'react'
import {Link} from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='not-found'>
        <h1>404 no found</h1>
        <h2>Go to <Link to="/">Home</Link></h2>
    </div>
  )
}

export default Notfound
