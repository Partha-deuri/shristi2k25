const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv'); // Added dotenv for environment variables
const connectDB = require('./config/db'); // Reuse connectDB logic
const Event = require('./models/Event');

dotenv.config(); // Load environment variables

// Function to create multiple events from a JSON file
async function createEventsFromJSON(jsonFilePath) {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB.');

    const filePath = path.resolve(jsonFilePath);
    const data = fs.readFileSync(filePath, 'utf-8');
    const events = JSON.parse(data);

    if (!Array.isArray(events)) {
      throw new Error('Invalid JSON format: Expected an array of events');
    }

    const createdEvents = await Event.insertMany(events);
    console.log(`${createdEvents.length} events created successfully.`);
  } catch (error) {
    console.error('Error creating events:', error.message);
  } finally {
    // Disconnect from MongoDB
    const mongoose = require('mongoose');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

// Example usage
const jsonFilePath = './eventsUpload.json'; // Replace with the actual path to your JSON file
createEventsFromJSON(jsonFilePath);
