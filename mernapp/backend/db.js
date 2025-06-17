const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://feastfleet:mern123@cluster0.hdf9f6a.mongodb.net/feastfleetmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Fetch data from 'food_items' collection
    const fetched_data = await mongoose.connection.db.collection('food_items').find({}).toArray();

    // Fetch data from 'foodCategory' collection
    const catData = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

    // Assign to global
    global.food_items = fetched_data;
    global.foodCategory = catData;

    // console.log('food_items loaded:', global.food_items);
    // console.log('foodCategory loaded:', global.foodCategory);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

module.exports = mongoDB;
