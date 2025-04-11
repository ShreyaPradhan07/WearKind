import React, { useContext,useEffect,useState } from 'react'
import './CartItems.css'
import { Shopcontext } from '../../Context/Shopcontext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,setCartItems}=useContext(Shopcontext);
    //***************payment */
    // const [amount, setAmount] = useState(100); // Example default value
   

 
     //handle payment
    const handlePayment = async () => {
        const totalAmount = getTotalCartAmount(); // Assuming you have a function that calculates the total amount

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount })
            });

            const data = await res.json();
            if (!data || !data.order) throw new Error("Payment order failed!");

            handlePaymentVerify(data.order);
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Payment initialization failed!");
        }
    };
    //handle payment verification

    // const handlePaymentVerify = async (data) => {
    //     if (!window.Razorpay) {
    //         toast.error("Razorpay SDK not loaded!");
    //         return;
    //     }
    
    //     const options = {
    //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    //         amount: data.amount,
    //         currency: data.currency,
    //         name: "Your Store",
    //         description: "Test Transaction",
    //         order_id: data.id,
    //         handler: async (response) => {
    //             try {
    //                 const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`, { 
    //                     method: "POST",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify(response)
    //                 });
    
    //                 const verifyData = await res.json();
    //                 if (verifyData.success) {
    //                     toast.success(verifyData.message);
    //                 } else {
    //                     toast.error("Payment verification failed!");
    //                 }
    //             } catch (error) {
    //                 console.error("Verification Error:", error);
    //                 toast.error("Payment verification failed!");
    //             }
    //         },
    //         theme: { color: "#5f63b8" }
    //     };
    
    //     const rzp1 = new window.Razorpay(options);
    //     rzp1.open();
    // };
    
    const handlePaymentVerify = async (data) => {
        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded!");
            return;
        }
    
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Your Store",
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    // Retrieve the token from localStorage (or sessionStorage)
                    const token = localStorage.getItem('auth-token'); // Make sure this is where the token is stored
    
                    if (!token) {
                        toast.error("Authentication token is missing!");
                        return;
                    }
                    console.log(response); 
                    // Include the token in the request headers
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "auth-token": token // Add the auth-token to headers
                        },
                        body: JSON.stringify(response) // Pass the response data
                    });
    
                    const verifyData = await res.json();
                    if (verifyData.success) {
                        toast.success(verifyData.message);
                        // Clear the cart on successful payment
                        // clearCart();
                    } else {
                        toast.error("Payment verification failed!");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    toast.error("Payment verification failed!");
                }
            },
            theme: { color: "#5f63b8" }
        };
    
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    
  
    //****************payment */


    // ************************************************
       const [userData, setUserData] = useState({
          coins: 0,
          donationCount: 0,
      });
    // State for promo code input and discount

      const [promoCode, setPromoCode] = useState('');
      const [discountApplied, setDiscountApplied] = useState(false);
      const [discountedTotal, setDiscountedTotal] = useState(getTotalCartAmount());

      // Function to fetch user data
      const fetchUserData = async () => {
          const token = localStorage.getItem("auth-token");
          if (!token) {
              console.log("User is not authenticated.");
              return;
          }
    
          try {
              const response = await fetch("http://localhost:4000/getuser", {
                  method: "GET",
                  headers: {
                      "auth-token": token,
                      "Content-Type": "application/json",
                  },
              });
    
              const data = await response.json();
              console.log("API Response:", data); // Debugging
    
              if (data.success) {
                  setUserData({
                      coins: data.coins || 0,
                      donationCount: data.donationCount || 0,
                  });
              } else {
                  console.error("Failed to fetch user data:", data.errors);
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };
    
      // Fetch user data when Navbar loads
      useEffect(() => {
          fetchUserData();
      }, []); 

    // Handle promo code submission
    const applyPromoCode = () => {
        if (promoCode === 'DONOR77' && userData.coins >= 500) {
            const newTotal = getTotalCartAmount() * 0.7; // Apply 30% discount
            setDiscountedTotal(newTotal);
            setDiscountApplied(true);
        } else {
            alert("Invalid promo code or insufficient coins!");
        }
    };
    // ************************************************
  return (
    
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return  <div>
                            <div className="cartiitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    
                            </div>
                            <hr />
                        </div> 
            }
            return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Coins</p>
                    <p>{userData.coins}</p>
                </div>
                <hr />
               
                {discountApplied && (
                    <>
                        <div className="cartitems-total-item">
                            <p>Discount (30%)</p>
                            <p>- ${getTotalCartAmount() * 0.3}</p>
                        </div>
                        <hr />
                    </>
                )}
                
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${discountApplied ? discountedTotal.toFixed(2) : getTotalCartAmount()}</h3>
                </div>

            </div>
            <button onClick={handlePayment} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code,Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code'
                 value={promoCode}
                 onChange={(e) => setPromoCode(e.target.value)}/>
                <button className='submit_btn' onClick={applyPromoCode}>Submit</button>
            </div>
            <div className='animated-box'>
            ✨ Exclusive Deal! ✨<br/>
            Got 500+ Coins? 💰<br></br>
            Apply Code DONOR77 !!<br/>
            Enjoy a Stylish 30% OFF on your total bill! 🛍️
            Because fashion loves rewards! 💖
            </div>
        </div>
      </div>

    </div>
  )
}

export default CartItems
