
import React from "react";
import marketplace from "../assets/images/marketplace.svg";
import cart from "../assets/images/cart.svg";
import orders from "../assets/images/orders.svg";
import saved from "../assets/images/saved.svg";
import wallet from "../assets/images/wallet.svg";
import account from "../assets/images/account.svg";
import logout from "../assets/images/logout.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Sidebar = ({ showAllItems }) => {

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/logout", { email: userEmail }, { withCredentials: true });

      alert("Logged out successfully");
      navigate("/login");  // Ensure this is correctly imported from 'react-router-dom'
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };



  return (
    <div className="flex flex-col h-full justify-between  w-1/6 bg-white dark:bg-gray-900 rounded-br-3xl fixed">
      <div className="space-y-4 ">
        <h1 className="text-5xl font-normal" style={{ fontFamily: 'Macondo Swash Caps, cursive' }}>Magic Clay</h1>
        <p className="mb-6 mt-12 text-sm text-gray-400 dark:text-gray-100 pl-4">MENU</p>
        <div className="flex items-center space-x-2 pl-4">
          <img src={marketplace} alt="Marketplace Icon" className="h-6 w-6" />
          <a href="#" className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Marketplace</a>
        </div>
        {
          (() => {
            if (showAllItems) {
              return (
                <>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={account} alt="Account Icon" className="h-6 w-6" />
                    <span className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Account</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-12 pl-4   mt-[344px]">
                    <img src={logout} alt="Logout Icon" className="h-6 w-6" />
                    <span className="text-lg font-medium text-gray-400 hover:text-black dark:text-gray-100 dark:hover:text-white">Logout</span>
                  </div>
                </>

              );
            } else {
              return (

                <>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={cart} alt="Cart Icon" className="h-6 w-6 hover-cart text-yellow-200" />
                    <a href="#" className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Cart</a>
                  </div>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={orders} alt="Orders Icon" className="h-6 w-6 hover-orders" />
                    <a href="#" className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Orders</a>
                  </div>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={saved} alt="Saved Icon" className="h-6 w-6 hover-saved" />
                    <a href="#" className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Saved</a>
                  </div>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={wallet} alt="Wallet Icon" className="h-6 w-6 hover-wallet" />
                    <a href="#" className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Wallet</a>
                  </div>
                  <div className="flex items-center space-x-2 pl-4">
                    <img src={account} alt="Account Icon" className="h-6 w-6" />
                    <span className="text-lg font-medium text-gray-400 m-2 hover:text-black dark:text-gray-100 dark:hover:text-white">Account</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-8 pl-4  mt-[400px]">
                    <img src={logout} alt="Logout Icon" className="h-6 w-6" />
                    <span onClick={handleLogout} className="text-lg font-medium text-gray-400 hover:text-black dark:text-gray-100 dark:hover:text-white">Logout</span>
                  </div>
                </>
              );
            }
          })()
        }
      </div>

    </div>
  );
};

export default Sidebar;