import React, { useState } from 'react';
import search from "../assets/images/search.svg";
import Ellipse from "../assets/images/Ellipse.svg";

const Header = ({ showAllItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  let userInfo;
  if (showAllItems) {
    userInfo = (
      <div className='mr-2 flex fixed top-2 right-2 z-1'>
        <div className='flex-col pt-4'>
          <p className='font-bold'>Ann</p>
          <p>Seller</p>
        </div>
        <img src={Ellipse} alt="Ellipse icon" />
      </div>
    );
  } else {
    userInfo = (
      <div className='mr-2 flex fixed top-2 right-2'>
        <div className='flex-col pt-4'>
          <p className='font-bold'>jone</p>
          <p>Buyer</p>
        </div>
        <img src={Ellipse} alt="Ellipse icon" />
      </div>
    );
  }

  return (

    <>
      <div className={`fixed inset-0 transition-all duration-300 ${isOpen ? "backdrop-blur-[2px]" : ""}`} />


      <div className='fixed top-0 right-0 w-5/6 h-24 flex items-center px-4 bg-white rounded-br-3xl'>
        <div className="relative w-full max-w-xs ml-60">
          <input
            className='w-full h-10 pl-14 pr-3 text-grey-900 placeholder-gray-400 border-b-2 border-gray-300 rounded-none focus:outline-none'
            type="search"
            name="search"
            placeholder="Search"
          />
          <img
            src={search}
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-700"
          />
          <label htmlFor="search" className="sr-only">Search</label>
        </div>
        <button className='rounded-lg bg-black text-white px-8 py-2' onClick={handleOpen}>Add Product</button>

        {isOpen && (
          <div className='bg-[#EFEFEF] w-[640px] h-[931px] rounded-xl fixed top-0 left-0 right-0 bottom-0 m-auto'>
            <h1 className='text-5xl items-center pl-[80px] pt-[66px] mb-8'>Add Product</h1>
            <form>
              <div className='pl-[80px]'>
                <h1 className='text-xl mb-1.5'>Product Name</h1>
                <input type="text" placeholder='Enter Product Name'
                  className='h-16 w-[480px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
              </div>
              <div className='pl-[80px]'>
                <h1 className='text-xl mb-1.5'>Description</h1>
                <input type="text" placeholder='Enter a Short Description'
                  className='h-32 w-[480px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
              </div>
              <div className='pl-[80px]'>
                <h1 className='text-xl mb-1.5'>Price</h1>
                <input type="text" placeholder='₦'
                  className='h-16 w-[480px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
              </div>
              <div className='pl-[80px]'>
                <h1 className='text-xl mb-1.5'>Product Image</h1>
                <input type="file" onChange={handleImageChange} placeholder='Drop your image here, or Click to Browse Supported: jpg, png | File Size Limit: 5MB'
                  className='h-40 w-[480px] border-[#8A8A8A] bg-[#FFFFFF] border-[1px] rounded-xl pl-6 mb-5' />
                {image && <img src={image} alt="Product Preview" className='h-40 w-[480px] mt-4 rounded-xl' />}
              </div>
              <div className='flex w-[480px] gap-11 mt-6 ml-[80px]'>
                <button className='h-16 w-[220px] bg-[#FFFFFF] rounded-xl' type="button" onClick={handleClose}>Cancel</button>
                <button className='h-16 w-[220px] bg-black text-white rounded-xl' type="submit">Upload</button>
              </div>
            </form>
          </div>
        )}
        {userInfo}
      </div>
    </>
  );
};


export default Header;


