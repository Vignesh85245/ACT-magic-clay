
import React, { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function OtpValidation({ otp, setOtp }) {
    // const [otp, setOtp] = useState(Array(6).fill("")); // Array with 6 empty strings
    const inputRefs = useRef([]); // Array of refs for each input field
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target);
            if (index > 0) {
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index - 1),
                    "",
                    ...prevOtp.slice(index),
                ]);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                target.value,
                ...prevOtp.slice(index + 1),
            ]);
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setOtp(digits);
    };
    //   const handleSubmit = async (e) => {
    //         e.preventDefault();
    //         const enteredOtp = otp.join('');
    //   try {
    //     const response = await axios.post('http://localhost:5000/verify-otp', { email, otp: enteredOtp });
    //     if (response.status === 200) {
    //       navigate('/dashboard'); // Redirect to dashboard if OTP is valid
    //     }
    //   } catch (error) {
    //     alert('Invalid OTP');
    //   }
    // };        

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email: localStorage.getItem('email'), otp: enteredOtp, });
            if (response.status === 200) {
                navigate('/dashboard'); // Redirect to dashboard if OTP is valid
            } else {
                setError('Invalid OTP');
            }
        } catch (error) {
            setError('Error verifying OTP');
        }
    };

    return (
        <section className="bg-white py-10 dark:bg-dark">
            <div className="container">
                <div>
                    <form id="otp-form" className="flex flex-row w-[54px] h-[54px] justify-around gap-[34px]">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="shadow-xs flex w-[54px] items-center justify-center
                                 rounded-lg border border-stroke bg-white p-2 text-center 
                                 text-2xl font-medium text-gray-5 outline-none sm:text-4xl border-[#8A8A8A]"
                            />
                        ))}

                    </form>
                </div>
            </div>
        </section>
    );
}