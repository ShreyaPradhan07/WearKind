// import React from 'react'
import './CSS/Donation.css'
// import Donate from '../Components/Donate/Donate'
import React, { useState,useEffect } from 'react';
// const ngoLinks = {
//   ngo1: { name: "Helping Hands Foundation", url: "https://www.helpinghands.org" },
//   ngo2: { name: "Hope for All", url: "https://www.hopeforall.org" },
//   ngo3: { name: "Bright Future Trust", url: "https://www.brightfuturetrust.org" },
//   ngo4: { name: "Care & Share", url: "https://www.careandshare.org" },
// };
const Donation = () => {
  const [clothesDetails, setClothesDetails] = useState([
    { type: '', quantity: '', damagePercent: '' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNGO,setSelectedNGO]=useState('');
  const [ngoLinks, setNgoLinks] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    pincode: ''
  });
  // ***************************************ngo
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetch('http://localhost:4000/getngos');
        const data = await response.json();
        if (data.success) {
          const ngoData = {};
          data.ngos.forEach((ngo, index) => {
            ngoData[`ngo${index + 1}`] = { name: ngo.name, url: ngo.url };
          });
          setNgoLinks(ngoData);
        } else {
          console.error('Failed to fetch NGOs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      }
    };

    fetchNgos();
  }, []);
  // ****************************************ngo


  const handleNGOChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedNGO(selectedValue);

    // if (selectedValue && ngoLinks[selectedValue]) {
    //   window.open(ngoLinks[selectedValue], '_blank'); // Opens the link in a new tab
    // }
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
  };
  

  const handleClothesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedClothes = [...clothesDetails];
    updatedClothes[index][name] = value;
    setClothesDetails(updatedClothes);
  };

  const handleAddClothes = () => {
    setClothesDetails([...clothesDetails, { type: '', quantity: '', damagePercent: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', clothesDetails);
  };
  const handleRemoveClothes = (index) => {
    const updatedClothes = clothesDetails.filter((_, i) => i !== index); // Remove the item at the given index
    setClothesDetails(updatedClothes);
  };
  //********************************* */
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (let i = 0; i < clothesDetails.length; i++) {
      totalQuantity += clothesDetails[i].quantity || 0;
    }
    return totalQuantity;
  };
  //Proceed button working only when TotalQuantity of items>=5
  const handleProceedClick = () => {
    if (calculateTotalQuantity() >= 5) {
      openModal(); // Opens the NGO selection modal
    } else {
      alert("You must donate at least 5 clothing items to proceed.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    console.log("Donation function executed", clothesDetails);

    const donationData = {
      ...formData, // Spread the form data
      clothesDetails,
      ngo: { name: ngoLinks[selectedNGO]?.name || "" },
      donationDate: document.getElementById("collection-date").value, // Get the selected date
    };

    let responseData;
    await fetch('http://localhost:4000/donation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Donation Successful! Thank you for your contribution.");
      window.location.replace("/");
    } else {
      alert(responseData.error || "An error occurred. Please try again.");
    }
  };
  
  // ***********************************
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
        </div>

        <div className="clothes-details-section">
          <h3>Give Details of Clothes</h3>
          {clothesDetails.map((clothes, index) => (
            <div key={index} className="clothes-details">
              <div className="clothes-item">
                <label>Type:</label>
                <select
                  name="type"
                  value={clothes.type}
                  onChange={(e) => handleClothesChange(index, e)}
                >
                  <option value="">Select Type</option>
                  <option value="Tshirt">T-shirt</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Trousers">Trousers</option>
                </select>
              </div>
              <div className="clothes-item">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={clothes.quantity}
                  onChange={(e) => handleClothesChange(index, e)}
                  min="0"
                />
              </div>
              <div className="clothes-item">
                <label>Damage Percentage:</label>
                <input
                  type="number"
                  name="damagePercent"
                  value={clothes.damagePercent}
                  onChange={(e) => handleClothesChange(index, e)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="remove-clothes-item">
                <button
                  type="button"
                  onClick={() => handleRemoveClothes(index)}
                //   style={{ color: 'red', fontSize: '1rem' }}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddClothes}>
            Add Clothes
          </button>
        </div>

        <button type="submit" onClick={handleProceedClick} >Proceed</button>
      </form>
      {isOpen && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            <span className="close1" onClick={closeModal}>&times;</span>
            <h2>🌼 Make a Donation 🌼</h2>

            <form className="donation-form" onSubmit={handleDonationSubmit}>
              {/* NGO Selection Dropdown */}
              <label htmlFor="ngo-select" >Select an NGO:</label>
              <select id="ngo-select" className="dropdown1" value={selectedNGO} onChange={handleNGOChange}>
                {/* <option value="">-- Choose an NGO --</option>
                <option value="ngo1">Helping Hands Foundation</option>
                <option value="ngo2">Hope for All</option>
                <option value="ngo3">Bright Future Trust</option>
                <option value="ngo4">Care & Share</option> */}
                <option value="">-- Choose an NGO --</option>
                {Object.entries(ngoLinks).map(([key, ngo]) => (
                  <option key={key} value={key}>{ngo.name}</option>
                ))}
              </select>
              {selectedNGO && (
                <div className="ngo-details">
                  <p><b>Selected NGO:</b> {ngoLinks[selectedNGO].name}</p>
                  <button 
                    className="visit-site-button"
                    onClick={() => window.open(ngoLinks[selectedNGO].url, "_blank")}
                  >
                    Visit Site
                  </button>
                </div>
              )}

              {/* Date Picker for Collection */}
              <label htmlFor="collection-date" >Preferred Collection Date:</label>
              <input type="date" id="collection-date" className="date-picker" />

              {/* Submit Button */}
              <button type="submit" className="donate-button1">Make Your Donation</button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
