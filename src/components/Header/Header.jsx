import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          {/* Logo content goes here */}
        </Link>
        <nav className={styles.nav}>
          <Link to="/services">Services</Link>
          <Link to="/solve-error">Solve Error</Link>
        </nav>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signupBtn}>Sign Up</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;