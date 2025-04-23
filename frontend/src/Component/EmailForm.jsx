// import React, { useState } from 'react';
// import axios from 'axios';
// import OtpValidation from './OtpValidation';

// const EmailForm = () => {
//   const [email, setEmail] = useState('us****me@gmail.com'); // Masked email for display
//   const [otpSent, setOtpSent] = useState(false);

//   const sendOtp = async () => {
//     try {
//       await axios.post('http://localhost:5001/send-otp', { email: email.replace(/\*\*\*\*\*/g, 'myemail') });
//       setOtpSent(true);
//       console.log("otp success")
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//     }
//   };

//   return (
//     <div className="w-full fixed">
//       <h1 className="w-full text-5xl ">Email Verification</h1>
//       <p className="w-[500px] text-[14px] mt-11 text-[#B8B8B8] flex gap-3.5 ">
//         A 6-digit code has been sent to your email {email} <strong className="text-black">Change</strong>
//       </p>
//       <OtpValidation />


//       <p className="text-[16px] ">0:45 remaining</p>
//       <button type="submit" className="w-[500px] h-[70px] text-2xl border-1 mt-6  fixed left-180 bottom-48 rounded-2xl cursor-pointer bg-black text-white">
//         Verify Email  </button>

//       <p className="mt-28 text-[#B8B8B8] flex gap-3.5">
//         Didn’t receive the code? <strong className="text-black">Resend</strong>
//       </p>
//     </div>
//   );
// };

// export default EmailForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpValidation from './OtpValidation';

const EmailForm = () => {
  const [email, setEmail] = useState(''); // Masked email for display
  const [timer, setTimer] = useState(45); // Countdown timer for OTP expiry

  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0)
      return;
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [timer]);

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5001/verify-otp', { email: localStorage.getItem('email') });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/resend-otp', {
        email: localStorage.getItem('email'),
      });

      if (response.data.success) {
        setTimer(45);
        alert('A new OTP has been sent to your email.');
      } else {
        alert('Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Error resending OTP. Please try again.');
    }
  };


  const [otp, setOtp] = useState(Array(6).fill(""));

  // const verifyOtp = async () => {
  //   console.log(otp);
  //   // return;
  //   try {
  //     const response = await axios.post('http://localhost:5001/verify-otp', {
  //       email: localStorage.getItem('email'),
  //       otp: otp.join('')
  //     });
  //     console.log(response.status, response.data)
  //     if (response.data.success) {

  //       navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     console.error('Error sending OTP:', error);
  //   }
  // };

  const verifyOtp = async () => {
    console.log(otp);

    try {
      const response = await axios.post('http://localhost:5001/verify-otp', {
        email: localStorage.getItem('email'),
        otp: otp.join(''),
      });

      console.log(response.status, response.data);

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert('Incorrect OTP! Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || 'Incorrect OTP! Please try again.');
      } else {
        console.error('Error sending OTP:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = localStorage.getItem('email');

    // Validation checks
    if (!email) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/send-otp', { email });
      if (response.status === 200) {
        alert('Login successful!');

        navigate('/email', { state: { email } });
      } else {
        alert('Login failed: ' + response.data.msg);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  }


  return (
    <div className="w-full fixed">
      <h1 className="w-full text-5xl">Email Verification</h1>
      <p className="w-[500px] text-[14px] mt-11 text-[#B8B8B8] flex gap-3.5">
        A 6-digit code has been sent to your email {email} <strong className="text-black">Change</strong>
      </p>
      {/* <OtpValidation /> */}
      <OtpValidation setOtp={setOtp} otp={otp} />
      <p className="text-[16px]">{timer} seconds remaining</p>
      <button onClick={verifyOtp} className="w-[500px] h-[70px] text-2xl border-1 mt-2  left-230  rounded-2xl cursor-pointer bg-black text-white">
        Verify Email
      </button>
      <p className=" text-[#B8B8B8] mt-5 flex gap-3.5">
        Didn't receive the code?
        <strong className="text-black cursor-pointer" onClick={resendOtp}>Resend</strong>
      </p>
    </div>
  );
};

export default EmailForm;