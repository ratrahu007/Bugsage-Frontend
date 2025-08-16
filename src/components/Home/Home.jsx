
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.hero}>
      <div className="container">
        <h1 className={styles.heroTitle}>Conquer Your Code</h1>
        <p className={styles.heroSubtitle}>
          BugSage is your trusted partner in debugging. We provide powerful tools and expert insights to resolve errors faster and build more reliable software.
        </p>
        <button className={`btn btn-primary btn-lg px-5 py-3 fw-bold ${styles.ctaButton}`}>
          Get Started Now
        </button>
      </div>
    </main>
  );
};

export default Home;


