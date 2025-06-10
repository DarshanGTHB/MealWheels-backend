import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// 1. Connect to MongoDB
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  fetchUsers(); // Call after connection
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Flexible schema that accepts any fields
const userSchema = new mongoose.Schema({}, { 
    collection: 'users',  // explicitly name the collection
    strict: false        // allow any fields that exist in MongoDB
});

// Create model using the flexible schema
const User = mongoose.model('users', userSchema);
// 3. Fetch all users
async function fetchUsers() {
  try {
    const users = await User.find();
    console.log('📦 Users:', users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
  } finally {
    mongoose.disconnect();
  }
}
