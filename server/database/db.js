import mongoose from 'mongoose';

const DBConnection = async () => {
    const MONODB_URI = `mongodb+srv://aktharahmed:2850@file-sharing.m3fz4ca.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing`;
    try{
        await mongoose.connect(MONODB_URI);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;