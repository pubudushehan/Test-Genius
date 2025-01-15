const mongoose = require('mongoose');
const UserProgress = require('../models/user.progress.model');
require('dotenv').config({ path: '../.env' });

async function verifyData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const progress = await UserProgress.findOne({ userId: "example_user_id" });
    console.log('Found progress data:', progress);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

verifyData(); 