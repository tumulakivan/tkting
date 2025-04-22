import React from "react";
import Facebook from "../assets/icons8-facebook.svg";
import Instagram from "../assets/icons8-instagram.svg";
import LinkedIn from "../assets/icons8-linkedin.svg";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="main-footer-section">
        <div className="billboard">
          <h1 className="footer-logo">
            <span className="footer-logo-motif">T</span>tkting
          </h1>
          <h2 className="motto">Parking simplified.</h2>
        </div>
        <div className="category-section">
          <div className="category">
            About us
            <div className="sub-categories">
              <p>
                We are a group of students from CSIT321-G02, with the goal of
                creating a parking management solution app that would hopefully
                help with the parking issues found in universities.
              </p>
              <p className="about-hide">Placeholder</p>
              <p className="about-hide">Placeholder</p>
            </div>
          </div>
          <div className="category">
            Contact us
            <div className="sub-categories">
              <div className="socials">
                <img src={Facebook} alt="fb" />
                <p>Facebook</p>
              </div>
              <div className="socials">
                <img src={Instagram} alt="ig" />
                <p>Instagram</p>
              </div>
              <div className="socials">
                <img src={LinkedIn} alt="ln" />
                <p>LinkedIn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sub-footer">
        <p className="copyright">© 2025, Dy & co.</p>
      </div>
    </div>
  );
};

export default Footer;
