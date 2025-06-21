import { connect } from 'mongoose';
import { disconnect } from 'process';

// Connect to MongoDB
async function connectToDatabase() {
    try {
        var MONGO_USERNAME = process.env.MONGO_USERNAME
        var MONGO_PASSWORD = process.env.MONGO_PASSWORD
        var AUTH_MECHANISM = process.env.AUTH_MECHANISM
        var MONGO_HOST = process.env.MONGO_HOST
        var MONGO_DATABASE = process.env.MONGO_DATABASE
        var connection_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?replicaSet=rs0&authMechanism=${AUTH_MECHANISM}&authSource=${MONGO_DATABASE}`;
        await connect(connection_url);
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