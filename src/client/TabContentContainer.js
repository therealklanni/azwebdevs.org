import React from 'react'

const TabContentContainer = () => (
  <div className="tab-content-wrapper">
    <div id="tab-content1" className="tab-content">
      <h1 className="primary-header">Get Involved</h1>
      <p className="tab-content__details">AZ Web Devs is a community created
      by and for local web developers as a place for us to connect,
      communicate and collaborate. This community aims to be a great place to
      chat and get help or advice, for those of us who attend every possible
      meetup and those who can't attend any—and everyone in between.</p>
      <p><a className="btn" href="/signin">Join now &raquo;</a></p>
      <p className="tab-content__details--subtext">We look forward to seeing you there!</p>
    </div>
    <div id="tab-content2" className="tab-content">
      <h1 className="primary-header">About Us</h1>
      <p className="secondary-description">We are AZ Web Devs</p>
      <p className="tab-content__details">Many local developers don't have
      time to attend meetups, simply can't go as often as they'd like to, or
      live too far away from ones they would like to attend. For these
      reasons, we created this community so more developers can network with
      each other. This community is less formal than the various Meetup
      groups, and we don't (yet) have any regular meetings. It's more just a
      place to gather and chat, collaborate, get help, offer help, advice,
      network, etc. Join us and meet more devs!</p>
      <p><a className="btn" href="">View details &raquo;</a></p>
    </div>
    <div id="tab-content3" className="tab-content meetups">
      <div>
        <h1 className="primary-header">Phoenix JavaScript</h1>
        <p className="tab-content__details">
          Phoenix JavaScript hosts monthly events that allows members to network
          and hear technology presentations. Meetings are generally held on
          Wednesdays and usually there is pizza and a t-shirt drawing.
        </p>
        <p>
          <a className="btn" href="http://www.meetup.com/Phoenix-JavaScript/">
            View details &raquo;
          </a>
        </p>
      </div>
      <div>
        <h1 className="primary-header">NodeAZ</h1>
        <p className="tab-content__details">
          Phoenix developer group for server-side JavaScript/CoffeeScript using
          Node.js. Real-time web, websockets, HTML5 and much more. 7PM 3rd Mon
          at UAT.
        </p>
        <p>
          <a className="btn" href="http://www.meetup.com/NodeAZ/">
            View details &raquo;
          </a>
        </p>
      </div>
      <div>
        <h1 className="primary-header">Phoenix AngularJS (Official)</h1>
        <p className="tab-content__details">
          Trying to revive the Angular community in Arizona. We are going to try
          to have monthly meetings around the valley. Everything Angular!
        </p>
        <p>
          <a className="btn" href="http://www.meetup.com/Phoenix-AngularJS-Official/">
            View details &raquo;
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default TabContentContainer
