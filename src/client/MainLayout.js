import React from 'react'
import MainNav from './MainNav'

const MainLayout = (props) => (
  <div className="page">
    <MainNav />
    {props.children}
  </div>
)

export default MainLayout
