import React, { useState } from 'react';
import styles from './Signup.module.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [otpMethod, setOtpMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    contact: '', // Holds email or mobile for step 1
    otp: '',
    fullName: '',
    userName: '',
    password: '',
    email: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
     // Clear errors when user starts typing
    if (Object.keys(errors).length > 0) {
        setErrors({});
    }
  };

  const validateContact = () => {
    const newErrors = {};
    if (otpMethod === 'email') {
      if (!formData.contact) {
        newErrors.contact = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.contact)) {
        newErrors.contact = 'Email address is invalid.';
      }
    } else { // mobile
      if (!formData.contact) {
        newErrors.contact = 'Mobile number is required.';
      } else if (!/^\d{10}$/.test(formData.contact)) {
        newErrors.contact = 'Mobile number must be 10 digits.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- UPDATED API CALL ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validateContact()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8082/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Assuming the backend expects an object with the contact info
        body: JSON.stringify({ [otpMethod]: formData.contact }),
      });

      if (!response.ok) {
        // If the server responds with an error status (4xx, 5xx)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP.');
      }

      // If the request was successful
      const result = await response.json();
      console.log('API Response:', result);
      setStep(2); // Move to the next step

    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrors({ contact: error.message || 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Verifying OTP:', formData.otp);
    // --- API CALL TO VERIFY OTP (placeholder) ---
    // Replace this with your actual verify OTP API call
    setTimeout(() => {
      const finalContact = { [otpMethod]: formData.contact };
      setFormData(prev => ({ ...prev, ...finalContact }));
      
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Registering user:', formData);
    // --- API CALL TO REGISTER USER (placeholder) ---
    // Replace this with your actual register API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful!');
    }, 1500);
  };

  const renderStepOne = () => (
    <form onSubmit={handleRequestOtp}>
      <div className={styles.methodSwitcher}>
        <button type="button" onClick={() => setOtpMethod('email')} className={otpMethod === 'email' ? styles.active : ''}>Email</button>
        <button type="button" onClick={() => setOtpMethod('mobile')} className={otpMethod === 'mobile' ? styles.active : ''}>Mobile</button>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="contact">{otpMethod === 'email' ? 'Email Address' : 'Mobile Number'}</label>
        <input
          type={otpMethod === 'email' ? 'email' : 'tel'}
          name="contact"
          id="contact"
          placeholder={otpMethod === 'email' ? 'you@example.com' : 'Enter 10-digit number'}
          value={formData.contact}
          onChange={handleChange}
          required
        />
        {errors.contact && <p className={styles.errorText}>{errors.contact}</p>}
      </div>
      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send OTP'}
      </button>
    </form>
  );

  const renderStepTwo = () => (
    <form onSubmit={handleVerifyOtp}>
      <p className={styles.subtitle}>
        We've sent a 6-digit code to {formData.contact}.
      </p>
      <div className={styles.inputGroup}>
        <label htmlFor="otp">Verification Code</label>
        <input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter 6-digit code"
          maxLength="6"
          value={formData.otp}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  );

  const renderStepThree = () => (
    <form onSubmit={handleRegister}>
      <div className={styles.inputGroup}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="userName">Username</label>
        <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
      </div>
      {formData.email && (
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email (Verified)</label>
          <input type="email" name="email" id="email" value={formData.email} readOnly className={styles.readOnlyInput} />
        </div>
      )}
      {formData.mobile && (
        <div className={styles.inputGroup}>
          <label htmlFor="mobile">Mobile (Verified)</label>
          <input type="tel" name="mobile" id="mobile" value={formData.mobile} readOnly className={styles.readOnlyInput} />
        </div>
      )}
      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Create Account'}
      </button>
    </form>
  );

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>
          {step === 1 && 'Create Your Account'}
          {step === 2 && 'Verify Your Identity'}
          {step === 3 && 'Complete Your Profile'}
        </h2>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </div>
    </div>
  );
};

export default SignUp;
