import { connect } from 'mongoose';
import { disconnect } from 'process';

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect to MongoDB');
    }
    console.log('Connected to MongoDB');
}


// Disconnect from MongoDB
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Disconnect from MongoDB');
    }
    console.log('Disconnected from MongoDB');
}

// Export the functions
export { connectToDatabase, disconnectFromDatabase };