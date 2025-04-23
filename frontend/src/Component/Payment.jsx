import React from 'react'

const Payment = () => {
    return (
        <div className='bg-[#EFEFEF] w-[560px] h-[791px] rounded-xl m-auto mt-[115px]'>

            <h1 className=' text-5xl items-center pl-[80px] pt-[66px] mb-8'>Payment</h1>
            <form className=''>
                <div className=' pl-[80px]'>
                    <h1 className=' text-xl mb-1.5'>Amount</h1>
                    <input type="text" placeholder='160.00'
                        className='h-16 w-[400px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                </div>
                <div className=' pl-[80px]'>
                    <h1 className=' text-xl mb-1.5'>Card Number</h1>
                    <input type="text" placeholder='0000 0000 0000 0000'
                        className='h-16 w-[400px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                </div>
                <div className=' pl-[80px]'>
                    <h1 className=' text-xl mb-1.5'>Card holder name</h1>
                    <input type="text" placeholder='Enter card holder name'
                        className='h-16 w-[400px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                </div>

                <div className=' pl-[80px] gap-11 flex flex-row ' >

                    <div className='  gap-11'>
                        <h1 className=' text-xl mb-1.5'>Expiry date</h1>
                        <input type="Month" placeholder=''
                            className='h-16 w-[180px]  border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                    </div>
                    <div>
                        <h1 className=' text-xl mb-1.5'>CVC</h1>
                        <input type="text" placeholder='000'
                            className='h-16 w-[180px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                    </div>
                </div>


                <div className=' flex w-[480px] gap-11 mt-8 ml-[80px] '>
                    <button className='h-16 w-[180px] bg-[#FFFFFF] rounded-xl'>Cancel</button>
                    <button className='h-16 w-[180px] bg-black text-white rounded-xl'>Proceed</button>
                </div>

            </form>

        </div>
    )
}

export default Payment
