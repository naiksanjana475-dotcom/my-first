const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log("Connected"))
.catch(err => console.log(err));

// schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// model
const User = mongoose.model('User', userSchema);

// ❌ DELETE DATA
User.deleteOne({ name: "Sangeeta" })
.then(() => {
  console.log("Data Deleted");
  return User.find();
})
.then(data => {
  console.log("Remaining Data:", data);
})
.catch(err => console.log(err));