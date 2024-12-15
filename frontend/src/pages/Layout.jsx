// import React from 'react'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import { Outlet } from 'react-router-dom'

// const Layout = () => {
//   return (
//    <div>
//   <div className="tap-top"><i data-feather="chevrons-up" /></div>
//   <div className="page-wrapper compact-wrapper" id="pageWrapper">
//     <Header/>
//     <div className="page-body-wrapper">
//     <Sidebar/>
//     <Outlet/>
//     <Footer/>
//     </div>
//   </div>
// </div>

//   )
// }

// export default Layout

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   

      <div>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>

      )
}

export default Layout