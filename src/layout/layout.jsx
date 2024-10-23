import React from 'react'
import Navbar from '../component/navbar'
const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
    {children}
    </div>
  )
}

export default Layout