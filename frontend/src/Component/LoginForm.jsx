// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import emailimg from '../images/vector.png';
// import passimg from '../images/fi-rr-lock.png';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     // Validation checks
//     if (!email || !password) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/login', { email, password });
//       if (response.status === 200) {
//         alert('Login successful!');
//         navigate('/email');
//       } else {
//         alert('Login failed: ' + response.data.msg);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed: ' + error.message);
//     }
//   };

//    // Validation checks
// //    if (!email || !password) {
// //     alert('Please fill in all required fields.');
// //     return;
// //   }

// //   try {
// //     const response = await axios.post('http://localhost:5000/login', formData);
// //     if (response.status === 200) {
// //       alert('Login successful!');
// //       // Redirect or perform further actions after successful login
// //     } else {
// //       alert('Login failed: ' + response.data.msg);
// //     }
// //   } catch (error) {
// //     console.error('Login failed:', error);
// //     alert('Login failed: ' + error.message);
// //   }
// // };

//   return (
//     <div className='w-full fixed'>
//       <h1 className='text-4xl mb-9'>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <label className='text-base'>Email</label>
//         <br />
//         <div className='w-[500px] flex relative justify-end mb-2 pt-1.5'>
//           <input
//             type="email"
//             name="email"
//             placeholder='Enter your Email'
//             className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
//             onChange={handleChange}
//             required
//           />
//           <img src={emailimg} className='w-[22px] h-[20px] mr-6 mt-4 mb-4' />
//         </div>
//         <br />

//         <label className='text-base'>Password</label>
//         <br />
//         <div className='w-[500px] flex relative justify-end mb-2 pt-1.5'>
//           <input
//             type="password"
//             name="password"
//             placeholder='Enter your Password'
//             className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
//             onChange={handleChange}
//             required
//           />
//           <img src={passimg} className='w-[22px] h-[22px] mr-6 mt-4 mb-4' />
//         </div>
//         <br /><br />

//         <button type="submit" className='w-[500px] h-[64px] text-2xl border-1 rounded-2xl bg-black text-white'>
//            Login
//         </button>
//       </form>

//       <p className='text-[#8A8A8A] gap-3.5 mt-6'>
//         Don’t Have an Account? <a href="/register" className='w-full h-full text-black cursor-pointer'>Register</a>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailimg from '../assets/images/vector.png';
import passimg from '../assets/images/fi-rr-lock.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      if (response.status === 200) {
        alert('Login successful!');
        navigate('/dashboard', { state: { email } });
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className='w-full fixed'>
      <h1 className='text-4xl mb-9'>Login</h1>

      <form onSubmit={handleSubmit}>
        <label className='text-base'>Email</label>
        <br />
        <div className='w-[500px] flex relative justify-end mb-2 pt-1.5'>
          <input
            type="email"
            name="email"
            placeholder='Enter your Email'
            className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
            onChange={handleChange}
            required
          />
          <img src={emailimg} className='w-[22px] h-[20px] mr-6 mt-4 mb-4' />
        </div>
        <br />

        <label className='text-base'>Password</label>
        <br />
        <div className='w-[500px] flex relative justify-end mb-2 pt-1.5'>
          <input
            type="password"
            name="password"
            placeholder='Enter your Password'
            className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
            onChange={handleChange}
            required
          />
          <img src={passimg} className='w-[22px] h-[22px] mr-6 mt-4 mb-4' />
        </div>


        <p className='text-base mt-6 mb-3'>Forgot Password</p>


        {errorMessage && (
          <p className="text-red-500 mb-2">{errorMessage}</p>
        )}

        <button type="submit" className='w-[500px] h-[64px] text-2xl border-1 rounded-2xl bg-black text-white'>
          Login
        </button>
      </form>

      <p className='text-[#8A8A8A] gap-3.5 mt-6'>
        Don’t Have an Account?{' '}
        <a href="/register" className='w-full h-full text-black cursor-pointer'>Register</a>
      </p>
    </div>
  );
};

export default LoginForm;
