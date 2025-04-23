
import React, { useState } from 'react';
import axios from 'axios';
import userimg from '../assets/images/fi-rr-user.png';
import emailimg from '../assets/images/vector.png';
import passimg from '../assets/images/fi-rr-lock.png';
import Toggle from '../Component/ToggleButton';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Validation checks
    if (!name || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid Gmail address.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, and one number = 8character.');
      return;
    }

    try {

      const checkResponse = await axios.post('http://localhost:5001/check-user', { name, email });
      if (checkResponse.data.exists) {
        alert('User with this name or email already exists. Please choose another one.');
        return;
      }

      const response = await axios.post('http://localhost:5001/register', formData);
      if (response.status === 201) {
        localStorage.setItem('email', response.data.user.email);
        window.location.href = '/email';
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='w-full flex flex-col fixed'>
      <div className='w-full'>
        <h1 className='text-[40px]'>Register</h1>

        <form onSubmit={handleSubmit}>
          <label className='text-base'>Name</label>
          <br />
          <div className='w-[500px] flex relative justify-end'>
            <input
              type="text"
              name="name"
              placeholder='Enter name here'
              className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
              onChange={handleChange}
              required
            />
            <img src={userimg} className='w-[22px] h-[22px] mr-6 mt-4 mb-4' />
          </div>
          <br />

          <label className='text-base'>Email</label>
          <br />
          <div className='w-[500px] flex relative justify-end'>
            <input
              type="email"
              name="email"
              placeholder='Enter your Gmail address'
              className='w-full h-[54px] absolute border-[1px] border-[#8A8A8A] rounded-xl pl-[24px] pt-[21px] pb-[21px]'
              onChange={handleChange}
              required
            />
            <img src={emailimg} className='w-[22px] h-[20px] mr-6 mt-4 mb-4' />
          </div>
          <br />

          <label className='text-base'>Password</label>
          <br />
          <div className='w-[500px] flex relative justify-end'>
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
          <br /><br />

          <Toggle role={formData.role} onRoleChange={handleRoleChange} />
          <br /><br />

          <div className='w-[500px] flex flex-row pt-6'>
            <input type="checkbox" className='w-6 h-6' required />
            <p className='w-[500px] h-[22px] text-[16px] pl-[16px] text-[#B8B8B8] flex-row'>
              I agree to all the <strong className='text-black'>Terms, Privacy Policy</strong> and <strong className='text-black'>Fees.</strong>
            </p>
          </div>

          <button type="submit" className='w-[500px] h-[54px] text-2xl border-1 rounded-2xl cursor-pointer bg-black text-white mt-11'>
            Register
          </button>
        </form>

        <p className='text-[#B8B8B8] mt-6'>
          Already have an Account? <a href="/login" className='w-full h-full text-black cursor-pointer'>Log in.</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;