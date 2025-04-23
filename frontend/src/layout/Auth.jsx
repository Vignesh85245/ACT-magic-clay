import React from 'react'
import authImage from "../assets/images/auth3.png"

const Auth = ({ children }) => {
    return (
        <div className=' h-screen w-screen flex '>
            <img src={authImage} className='h-screen w-1/3' />
            <div className=' flex w-full h-full justify-center items-center'>
                <div className='w-[500px] h-screen flex flex-col justify-center mx-auto'>

                    {children}
                </div>
            </div>

        </div>

    )
}

export default Auth


