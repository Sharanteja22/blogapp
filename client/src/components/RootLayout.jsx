import React from 'react'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div>
        <Header/>
        <div style={{minHeight:"90vh"}}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout