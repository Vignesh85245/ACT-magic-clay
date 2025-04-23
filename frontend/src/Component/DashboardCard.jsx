import React from 'react'

const DashboardCard = (props) => {
    return (

        <div className=' flex pl-16 pt-10'>
            <div className='relative w-[200px] h-[300px]'>
                <img src={props.src} className='w-[200px] h-[300px] object-cover rounded-xl' />
                <div className='w-[200px] h-[130px] bg-[#D9D9D9] rounded-xl opacity-70 absolute bottom-0 flex flex-col justify-center items-center'>
                    <p className=' text-4xl'>Calco</p>
                    <p className=' text-[32px] text-gray-700'>$ 80.00</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard



