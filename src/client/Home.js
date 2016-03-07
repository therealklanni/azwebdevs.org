import React from 'react'
import TabContentContainer from './TabContentContainer'

const Home = () => (
  <div className="home-content">
    <input type="radio" name="tabs" id="tab1" defaultChecked />
    <input type="radio" name="tabs" id="tab2" />
    <input type="radio" name="tabs" id="tab3" />
    <div className="tabs">
      <label htmlFor="tab1">Intro</label>
      <label htmlFor="tab2">About Us</label>
      <label htmlFor="tab3">Meetups</label>
    </div>
    <TabContentContainer />
    <div className="logo home-content__logo">
      <span>{'{az}'}</span>
    </div>
  </div>
)

export default Home
