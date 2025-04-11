// import React, { useState }from 'react';
// import './Donate.css'

// // import "bootstrap/dist/css/bootstrap.min.css"; 
// const Donate = () => {
//     const [isBarVisible,setisBarVisible]=useState(true);
//     const [isOpen, setIsOpen] = useState(false);
//     const handleCloseBar=()=>{
//         setisBarVisible(false);
//     }
//     if (!isBarVisible) return null;
   

//     const openModal = () => {
//       setIsOpen(true);
//     };
  
//     const closeModal = () => {
//       setIsOpen(false);
//     };
  
//   return (
//     <>
//     <div className="donate">
//       <div className='text'> 💙 Make a Difference Today! 💙
//       <br/>
//       Your support matters—click here to donate and spread kindness! </div>
//       <button type="button" onClick={handleCloseBar} class="btn-close" aria-label="Close"></button>
//       <button className="donate-button" onClick={openModal}>Donate</button>
//     </div>
    

//     {isOpen && (
//             <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={closeModal}>&times;</span>
//                 <h2>🌼 Donate & Earn Rewards! 🌼</h2>
//                 <ul>
//                     <li>✔ Support a Cause: Your donations go directly to trusted NGOs, making a real impact</li>
//                     <li>✔ Minimum 5 Items: Donate at least 5 clothes to contribute</li>
//                     <li>✔ Earn Rewards: Get 100 points per donation—stack up to 500 points to unlock exclusive discounts & coupons!</li>
//                     <li>✔ Quality Matters: Clothes should have no more than 20% damage—let’s keep it wearable for those in need!</li>
//                     💙 Give. Earn. Save. Start donating today!
//                 </ul>
//                 <a href="donation-link.html" className="donate-button">Donate Now</a>
//             </div>
//             </div>
//     )}




//     </>
//   )
// }

// export default Donate

import React, { useState } from 'react';
import './Donate.css';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Donate = ({ isBarVisible, setIsBarVisible }) => {
  // const [isBarVisible, setIsBarVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  


  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
  };

  return (
    <>
      {/* ✅ Donate Section */}
      {isBarVisible && (
        <div className="donate">
          <p>💜 Make a Difference Today! 💜 Your support matters—click to donate and spread kindness!</p>
          <div className="donate-in">
            <button className="para" onClick={openModal}>Donate</button>
            <button className="text" onClick={() => setIsBarVisible(false)}>X</button>
          </div>
        </div>
      )}

      {/* ✅ Modal (Pop-up Window) */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>🌼 Donate & Earn Rewards! 🌼</h2>
            <ul>
              <li>✔ <b>Support a Cause:</b> Your donations go directly to trusted NGOs.</li>
              <li>✔ <b>Minimum 5 Items:</b> Donate at least 5 clothes to contribute.</li>
              <li>✔ <b>Earn Rewards:</b> Get 100 points per donation—stack up to 500 points to unlock exclusive discounts & coupons!</li>
              <li>✔ <b>Quality Matters:</b> Clothes should have no more than 20% damage.</li>
              💙 Give. Earn. Save. Start donating today!
            </ul>
            {/* <button className="donate-button" > <Link style={{ textDecoration: 'none', color:'white'}} to='/donation'>Donate Now</Link> }
            </button> */}
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/donation">
              <button className="donate-button" onClick={() => { setIsBarVisible(false); setIsOpen(false); }}>
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Donate;
