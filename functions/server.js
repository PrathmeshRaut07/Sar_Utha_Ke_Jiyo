const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB URL from Atlas dashboard
//const db = "mongodb+srv://rautlucifer43:O7xibtfd15xzN4CS@cluster0.pjkkoax.mongodb.net/";
const db="mongodb+srv://rautlucifer43:kNGVcyc7k7uFm2QW@cluster0.pjkkoax.mongodb.net/"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const registrationSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  address: String,
  dob: Date,
  education: String,
  course: String,
  college: String,
  email: String,
  contactNumber: String,
  referenceName: String
});

const Registration = mongoose.model('Registration', registrationSchema);

app.post('/register', (req, res) => {
    console.log(req.body); // Log the incoming request data
    const newRegistration = new Registration({
      fullName: req.body.fullName,
      age: req.body.age,
      address: req.body.address,
      dob: new Date(req.body.dob), // Ensure this conversion is valid
      education: req.body.education,
      course: req.body.course,
      college: req.body.college,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      referenceName: req.body.referenceName
    });
  
    newRegistration.save()
      .then(item => res.send("Registration saved to database"))
      .catch(err => {
          console.error("Error saving to database: ", err); // Log any errors
          res.status(400).send("Unable to save to database: " + err.message);
      });
  });
  
app.get('/', (req, res) => res.sendFile(path.resolve('index.html')));
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
module.exports.handler = serverless(app);