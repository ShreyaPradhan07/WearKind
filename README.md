WearKind is an e-commerce website focused on clothing, featuring a unique social responsibility aspect. Apart from regular features we integrated a donation module.Users can donate old clothes to partnered NGOs through our platform. For every donations, users earn some coins, which can later be redeemed for discounts during checkout.

Features:-

->Home Page: A visually appealing landing page showcasing categories for Men, Women, and Kids.

->Product Page: Clicking on any product redirects users to a dedicated page with detailed product information.

->Login/Signup: Secure user authentication for a personalized shopping experience.

->Donation Page:In this website, users can fill in their necessary details along with information about the clothes they wish to donate.They can view and select from a list of nearby NGOs and directly donate their clothes through the platform.

->Shopping Cart: Displays selected items and the total cost, ensuring easy checkout.

->Admin Panel:

    1)Add new products to the inventory.
    
    2)View the complete list of available products.
    
    3)Remove products from the database effortlessly.

    4)NGOs that are willing to partner with the website can be added to the platform, making it easier for users to find trusted organizations for their donations.
    
->Database Integration: All changes, including product additions, removals, and cart updates, are dynamically reflected in the MongoDB database.

Technologies Used:-

->Frontend: HTML, CSS, JavaScript,React

->Backend: Node.js, Express.js

->Database: MongoDB

->Authentication: JWT or any preferred authentication method


## ⚡ Setup Instructions  
```bash

### ⿡ Clone the repository and set up all parts  

# Clone the repo
git clone https://github.com/your-username/WearKind.git
cd Shoppers-E-commerce-Website

# Backend
cd backend
# Create a .env file with the following variables:
# RAZORPAY_KEY_ID=your_razorpay_key
# RAZORPAY_SECRET=your_razorpay_secret
# MONGO_URI=your_mongodb_connection_uri
node index.js
# Runs on http://localhost:4000

# Frontend
cd ../frontend
npm install
npm run start
# Runs on http://localhost:3000

# Admin Panel
cd ../admin
npm install
npm run dev
# Runs on http://localhost:5173

