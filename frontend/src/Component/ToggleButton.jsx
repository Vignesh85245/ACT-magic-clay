// import React, { useState } from 'react'

// const ToggleButton = () => {
//     const [isChecked, setIsChecked] = useState(false)

//     const handleCheckboxChange = () => {
//         setIsChecked(!isChecked)
//     }

//     return (
//         <div className='  w-full'>
//             <label className='themeSwitcherTwo shadow-card relative border-[#8A8A8A] border-[1px] rounded-xl inline-flex w-[500px] h-10 cursor-pointer select-none items-center justify-center bg-nones '>
//                 <input
//                     type='checkbox'
//                     className='sr-only'
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                 />
//                 <span
//                     className={`flex items-center justify-center space-x-[6px] text-[#B8B8B8] rounded-xl w-[250px] h-10 text-sm font-medium ${!isChecked ? 'text-primary bg-black' : 'text-body-color'
//                         }`}
//                 >

//                     Buyer
//                 </span>
//                 <span
//                     className={`flex items-center justify-center space-x-[6px] text-[#B8B8B8] rounded-xl w-[250px] h-[40px] text-sm font-medium ${isChecked ? 'text-primary bg-black' : 'text-body-color'
//                         }`}
//                 >
//                     Seller
//                 </span>
//             </label>
//         </div>
//     )
// }

// export default ToggleButton
import React, { useState } from 'react';

const ToggleButton = ({ role, onRoleChange }) => {
  const handleCheckboxChange = () => {
    onRoleChange(role === 'buyer' ? 'seller' : 'buyer');
  };

  return (
    <div className='w-full'>
      <label className='themeSwitcherTwo shadow-card relative border-[#8A8A8A] border-[1px] rounded-xl inline-flex w-[500px] h-10 cursor-pointer select-none items-center justify-center bg-nones'>
        <input
          type='checkbox'
          className='sr-only'
          checked={role === 'seller'}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center justify-center space-x-[6px] text-[#B8B8B8] rounded-xl w-[250px] h-10 text-sm font-medium ${role === 'buyer' ? 'text-primary bg-black' : 'text-body-color'}`}
        >
          Buyer
        </span>
        <span
          className={`flex items-center justify-center space-x-[6px] text-[#B8B8B8] rounded-xl w-[250px] h-[40px] text-sm font-medium ${role === 'seller' ? 'text-primary bg-black' : 'text-body-color'}`}
        >
          Seller
        </span>
      </label>
    </div>
  );
};

export default ToggleButton;

