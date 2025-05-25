import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>Popular Hostels</p>
          </div>
          <div className="list">
            <ul>
              <li>Manas</li>
              <li>Disang</li>
              <li>Lohit</li>
              <li>Brahma</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About IITG Campus OLX</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>Team Members</p>
          </div>
          <div className="list">
            <ul>
            <li>Durgesh K. Meena</li>
              <li>Monu Kumar</li>
              <li>Aisha Ray</li>
              <li>Meghna Barnwal</li>
              <li>Aishwarya Kamble</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>IITG Coding Club </p>
        <p> © IITG Campus OLX - 2022</p>
      </div>
    </div>
  );
}

export default Footer;
