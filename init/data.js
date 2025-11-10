const properties = [
  { owner: "Rohit Sharma", title: "PG for Boys - Cozy Corner", type: "PG", location: "Mansarovar", description: "Fully furnished, rooftop laundry.", price: 5500, guestsAllowed: 2, amenities: ["WiFi","Laundry","Parking"], images: ["https://images.pexels.com/photos/7546550/pexels-photo-7546550.jpeg"], available: true },
  { owner: "Anjali Gupta", title: "Girls Hostel - Safe Stay", type: "Hostel", location: "Gopalpura", description: "CCTV, mess facility, 24x7 security.", price: 7000, guestsAllowed: 3, amenities: ["CCTV","Meals","WiFi"], images: [], available: true },
  { owner: "Vijay Singh", title: "Single AC Room - Quiet", type: "Room", location: "Vaishali Nagar", description: "AC, study table, close to market.", price: 8500, guestsAllowed: 1, amenities: ["AC","WiFi","Study Table"], images: [], available: true },
  { owner: "Neha Verma", title: "2 BHK Family Flat - Green View", type: "Flat", location: "Ajmer Road", description: "Family-friendly, parking included.", price: 16000, guestsAllowed: 4, amenities: ["Parking","Geyser","WiFi"], images: [], available: true },

  { owner: "Saurabh Jain", title: "Budget PG for Working Men", type: "PG", location: "Tonk Road", description: "Affordable, single/semi-sharing options.", price: 4800, guestsAllowed: 2, amenities: ["RO Water","WiFi"], images: [], available: true },
  { owner: "Kiran Patel", title: "Deluxe Girls Hostel", type: "Hostel", location: "Malviya Nagar", description: "AC rooms, regular housekeeping.", price: 9500, guestsAllowed: 3, amenities: ["AC","CCTV","Meals"], images: [], available: true },
  { owner: "Ravi Kumar", title: "Non-AC Student Room", type: "Room", location: "Jhotwara", description: "Really low-cost for students.", price: 3200, guestsAllowed: 1, amenities: ["Fan","RO Water"], images: [], available: true },
  { owner: "Deepak Meena", title: "1 BHK Semi-Furnished Flat", type: "Flat", location: "Sodala", description: "Semi-furnished near bus stop.", price: 9000, guestsAllowed: 2, amenities: ["WiFi","Kitchen Access"], images: [], available: true },

  { owner: "Pooja Sharma", title: "PG Near Coaching Hub", type: "PG", location: "Raja Park", description: "Shared mess, quiet study area.", price: 5200, guestsAllowed: 2, amenities: ["Meals","WiFi"], images: [], available: true },
  { owner: "Sunita Devi", title: "Girls Hostel with Mess", type: "Hostel", location: "Gopalpura Bypass", description: "Home-cooked food, caretakers.", price: 6500, guestsAllowed: 3, amenities: ["Meals","CCTV","WiFi"], images: [], available: true },
  { owner: "Manish Yadav", title: "Shared Student Room", type: "Room", location: "Lal Kothi", description: "Two-seater room near colleges.", price: 4500, guestsAllowed: 2, amenities: ["WiFi","Study Table"], images: [], available: true },
  { owner: "Rekha Saini", title: "2 BHK Family Flat - Secure", type: "Flat", location: "Mansarovar", description: "Gated society, play area nearby.", price: 13000, guestsAllowed: 4, amenities: ["Parking","Geyser"], images: [], available: true },

  { owner: "Rahul Saini", title: "Affordable Boys PG - Economy", type: "PG", location: "Kalwar Road", description: "Basic amenities, cheap rent.", price: 3800, guestsAllowed: 2, amenities: ["RO Water","Bed"], images: [], available: true },
  { owner: "Simran Kaur", title: "Premium Girls Hostel - Elite", type: "Hostel", location: "C-Scheme", description: "High-end rooms & supervision.", price: 12000, guestsAllowed: 3, amenities: ["AC","Meals","WiFi"], images: [], available: true },
  { owner: "Amit Sharma", title: "Single Room for Professional", type: "Room", location: "Ajmer Road", description: "Independent worker-friendly room.", price: 5000, guestsAllowed: 1, amenities: ["Fan","Bed"], images: [], available: true },
  { owner: "Tarun Raj", title: "3 BHK Shared Flat - Developers' Flat", type: "Flat", location: "Vaishali Nagar", description: "Flat shared by 3 working professionals.", price: 14000, guestsAllowed: 3, amenities: ["WiFi","Fridge"], images: [], available: true },

  { owner: "Harsh Chauhan", title: "PG with Gym Access", type: "PG", location: "Jagatpura", description: "Gym included in monthly fee.", price: 7500, guestsAllowed: 2, amenities: ["Gym","WiFi"], images: [], available: true },
  { owner: "Kajal Rathore", title: "Girls Hostel with Library", type: "Hostel", location: "Model Town", description: "Quiet, study-friendly environment.", price: 6200, guestsAllowed: 3, amenities: ["Library","WiFi"], images: [], available: true },
  { owner: "Rohit Verma", title: "Private Couple Room - Comfort", type: "Room", location: "Shastri Nagar", description: "Couples allowed, attached washroom.", price: 9200, guestsAllowed: 2, amenities: ["AC","Attached Bathroom"], images: [], available: true },
  { owner: "Prashant Singh", title: "Flat Near Metro - Executive", type: "Flat", location: "Civil Lines", description: "Prime location, quick commute.", price: 21000, guestsAllowed: 4, amenities: ["Parking","WiFi"], images: [], available: true },

  { owner: "Priya Joshi", title: "Economy PG - Student Special", type: "PG", location: "Sitapura", description: "Mess optional, friendly caretakers.", price: 4700, guestsAllowed: 2, amenities: ["Meals Optional","WiFi"], images: [], available: true },
  { owner: "Sandeep Bhati", title: "Hostel with Mess & WiFi", type: "Hostel", location: "Pratap Nagar", description: "Good for long-term students.", price: 6800, guestsAllowed: 3, amenities: ["Meals","WiFi","CCTV"], images: [], available: true },
  { owner: "Geeta Yadav", title: "Compact Single Room", type: "Room", location: "Bani Park", description: "Small single room, low rent.", price: 4100, guestsAllowed: 1, amenities: ["Bed","Fan"], images: [], available: true },
  { owner: "Kunal Mehra", title: "2 BHK Flat - Family Ready", type: "Flat", location: "Amber Road", description: "Good locality, school nearby.", price: 17000, guestsAllowed: 4, amenities: ["Parking","Geyser","WiFi"], images: [], available: true },

  { owner: "Meena Gupta", title: "PG - Furnished Deluxe", type: "PG", location: "Transport Nagar", description: "Furnished beds & cupboards.", price: 6400, guestsAllowed: 2, amenities: ["WiFi","Laundry"], images: [], available: true },
  { owner: "Arjun Verma", title: "Girls Hostel - Study Focused", type: "Hostel", location: "Durgapura", description: "Quiet & secure for girls.", price: 7300, guestsAllowed: 3, amenities: ["CCTV","Library","WiFi"], images: [], available: true },
  { owner: "Nisha Rani", title: "Room with Attached Bath", type: "Room", location: "New Sanganer", description: "Private attached bathroom included.", price: 7600, guestsAllowed: 1, amenities: ["Attached Bathroom","Geyser"], images: [], available: true },
  { owner: "Vikas Lodha", title: "3 BHK Flat - Spacious", type: "Flat", location: "Sanganer", description: "Large rooms, balcony, good sunlight.", price: 15500, guestsAllowed: 4, amenities: ["Balcony","Parking","WiFi"], images: [], available: true },

  { owner: "Bhavna Dixit", title: "Budget PG near Market", type: "PG", location: "Kalwar Road", description: "Market nearby, economical.", price: 3600, guestsAllowed: 2, amenities: ["RO Water"], images: [], available: true },
  { owner: "Sanjay Khatri", title: "Premium Hostel - Luxury", type: "Hostel", location: "C-Scheme", description: "Big rooms, AC, meals.", price: 13000, guestsAllowed: 3, amenities: ["AC","Meals","Housekeeping"], images: [], available: true },
  { owner: "Monika Sharma", title: "Single Non-AC Room", type: "Room", location: "Ajmer Road", description: "Simple room, very near bus stop.", price: 4200, guestsAllowed: 1, amenities: ["Fan","Bed"], images: [], available: true },
  { owner: "Pradeep Nair", title: "Family 2 BHK - Good Society", type: "Flat", location: "Vaishali Nagar", description: "Secure society with elevator.", price: 14500, guestsAllowed: 4, amenities: ["Elevator","Parking","WiFi"], images: [], available: true },

  { owner: "Ritu Bhatt", title: "PG with Attached Study Table", type: "PG", location: "Jagatpura", description: "Study tables in each room.", price: 6900, guestsAllowed: 2, amenities: ["Study Table","WiFi"], images: [], available: true },
  { owner: "Aakash Jain", title: "Girls Hostel - Home Like", type: "Hostel", location: "Model Town", description: "Home-cooked meals & neat rooms.", price: 6100, guestsAllowed: 3, amenities: ["Meals","CCTV","WiFi"], images: [], available: true },
  { owner: "Seema Kapoor", title: "Studio Room - Compact", type: "Room", location: "Shastri Nagar", description: "Studio style compact living.", price: 8800, guestsAllowed: 1, amenities: ["AC","Mini Kitchen"], images: [], available: true },
  { owner: "Nitin Bora", title: "3 BHK Flat - Business Class", type: "Flat", location: "Civil Lines", description: "Luxury fittings, prime area.", price: 23000, guestsAllowed: 5, amenities: ["Parking","Central AC","WiFi"], images: [], available: false },

  { owner: "Rashmi Yadav", title: "Student PG - Close to College", type: "PG", location: "Sitapura", description: "Good connectivity to colleges.", price: 4900, guestsAllowed: 2, amenities: ["WiFi","Mess"], images: [], available: true },
  { owner: "Mohit Arora", title: "Hostel with Rooftop", type: "Hostel", location: "Pratap Nagar", description: "Rooftop study & seating area.", price: 7100, guestsAllowed: 3, amenities: ["Rooftop","WiFi","CCTV"], images: [], available: true },
  { owner: "Yamini Rao", title: "Small Single Room - Cozy", type: "Room", location: "Bani Park", description: "Ideal for single occupant.", price: 4300, guestsAllowed: 1, amenities: ["Bed","Fan"], images: [], available: true },
  { owner: "Gautam Sinha", title: "2 BHK Flat - Newly Renovated", type: "Flat", location: "Amber Road", description: "New paint & fittings.", price: 17500, guestsAllowed: 4, amenities: ["WiFi","Parking","Geyser"], images: [], available: true },

  { owner: "Laxmi Narayan", title: "Economy PG - Furnished", type: "PG", location: "Transport Nagar", description: "Furnished rooms, utility included.", price: 6000, guestsAllowed: 2, amenities: ["WiFi","Laundry"], images: [], available: true },
  { owner: "Rakesh Hooda", title: "Boys Hostel - Mess Included", type: "Hostel", location: "Durgapura", description: "Mess & utilities included.", price: 7200, guestsAllowed: 3, amenities: ["Meals","WiFi","CCTV"], images: [], available: true },
  { owner: "Alka Verma", title: "Attached Bath Room - Private", type: "Room", location: "New Sanganer", description: "Private attached washroom.", price: 7800, guestsAllowed: 1, amenities: ["Attached Bathroom","Geyser"], images: [], available: true },
  { owner: "Suresh Patil", title: "Comfortable 3 BHK Flat", type: "Flat", location: "Sanganer", description: "Friendly locality, ground floor.", price: 15000, guestsAllowed: 4, amenities: ["Ground Floor","Parking","WiFi"], images: [], available: true },

  { owner: "Divya Choudhary", title: "PG with Mess - Veg Only", type: "PG", location: "Kalwar Road", description: "Vegetarian mess included.", price: 4100, guestsAllowed: 2, amenities: ["Meals","RO Water"], images: [], available: true },
  { owner: "Tarika Malik", title: "Luxury Hostel - All Inclusive", type: "Hostel", location: "C-Scheme", description: "All bills paid, housekeeping.", price: 13500, guestsAllowed: 3, amenities: ["AC","Meals","Housekeeping","WiFi"], images: [], available: true },
  { owner: "Kartikeya Rao", title: "Budget Room - Basic", type: "Room", location: "Ajmer Road", description: "Just a bed and fan, lowest rent.", price: 3500, guestsAllowed: 1, amenities: ["Bed","Fan"], images: [], available: true },
  { owner: "Sonia Bhat", title: "Spacious 2 BHK - Bright", type: "Flat", location: "Vaishali Nagar", description: "Well-ventilated, sunny rooms.", price: 14800, guestsAllowed: 4, amenities: ["Balcony","WiFi","Parking"], images: [], available: true }
];
module.exports=properties;