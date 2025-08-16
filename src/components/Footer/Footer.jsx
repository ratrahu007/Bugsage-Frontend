import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-white fw-bold">BugSage</h5>
            <p>Your partner in code clarity and power.</p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="text-white">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-secondary">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Careers</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Press</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="text-white">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-secondary">Documentation</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Blog</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="text-white">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 BugSage. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
