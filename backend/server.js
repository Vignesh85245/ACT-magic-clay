
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

// const { verify } = require('crypto');



const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:5173', // Match the frontend port here
  credentials: true,  // Allow cookies if needed
})); app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());



mongoose.connect('mongodb://localhost:27017/magic')

  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetpasswordtoken: String,
  resetpasswordexpires: Date,
  role: {
    type: String,
    enum: ["buyer", "seller"]
  },
  verifyotp: { type: String, default: '' },
  verifyotpExpiredAt: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  resendotp: { type: Number, default: '' },
  resendotpExpiredAt: { type: Number, default: 0 },
  loginAttempts: { type: Number, default: 0 },
});

const otpSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true },
  otp: String,
  expiry: Date,
});



const User = mongoose.model('User', userSchema);
const Otp = mongoose.model('Otp', otpSchema);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dharshinis.act@gmail.com',
    pass: 'adjpfiukeqyelzrm',
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'dharshinis.act@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  return await transporter.sendMail(mailOptions);
};



app.post('/check-user', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check for an existing user by email or name
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(200).send({ exists: true });
    }

    const existingUserByName = await User.findOne({ name });
    if (existingUserByName) {
      return res.status(200).send({ exists: true });
    }

    return res.status(200).send({ exists: false });
  } catch (err) {
    console.error('Error checking user existence:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});


app.post('/register', async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const existEmail = await User.findOne({ email: body.email });
    console.log(existEmail)
    if (existEmail) {
      if (!existEmail.isVerified) {
        await Otp.deleteOne({ email: existEmail.email });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

        await Otp.create({
          userId: existEmail._id,
          email: existEmail.email,
          otp: otp,
          expiry: otpExpiry,
        });

        sendOtpEmail(existEmail.email, otp).catch(error => {
          console.log(error)
          return res.status(500).json({ success: false, message: 'Error sending OTP', error });
        });

        return res.status(201).send({ success: true, message: "User created", user: existEmail });
      }
      return res.send({ success: false, message: "User already Exists" });

    }
    console.log(existEmail)
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    const newUser = await User.create({ ...body, password: hashedPassword });
    console.log(newUser)


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 0.45);

    await Otp.create({
      userId: newUser._id,
      email: newUser.email,
      otp: otp,
      expiry: otpExpiry,
    });

    await sendOtpEmail(newUser.email, otp).catch(error => {
      return res.status(500).json({ success: false, message: 'Error sending OTP', error });
    });

    return res.status(201).send({ success: true, message: "User created", user: newUser });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, message: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await User.updateOne({ email }, { $inc: { loginAttempts: 1 } });
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (user.loginAttempts >= 3) {
      await sendOtpEmail(user.email, 'Please reset your password due to multiple login attempts.');
    }

    await User.updateOne({ email }, { $set: { loginAttempts: 0 } });
    return res.status(200).json({ msg: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
});





// // Logout Function
// app.post('/logout', async (req, res) => {
//   try {
//     // Clear the auth cookie
//     res.clearCookie('authToken', {
//       httpOnly: true,
//       sameSite: 'None',
//       secure: true,
//     });

//     // Optional: You can reset login attempts if needed
//     const { email } = req.body;
//     if (email) {
//       await User.updateOne({ email }, { $set: { loginAttempts: 0 } });
//     }

//     return res.status(200).json({ msg: 'Logged out successfully' });
//   } catch (error) {
//     console.error('Logout error:', error);
//     return res.status(500).json({ msg: 'Server error', error: error.message });
//   }
// });






app.post('/resend-otp', async (req, res) => {

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

    await Otp.findOneAndUpdate(
      { email },
      { otp: newOtp, expiry: otpExpiry },
      { upsert: true, new: true }
    );

    await sendOtpEmail(email, newOtp);

    res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




// app.post('/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const record = await Otp.findOne({ email });

//     if (record) {
//       if (otp == record.otp) {
//         await Otp.deleteOne({ _id: record._id });
//         await User.updateOne({ email }, { verified: Boolean(true) });
//         return res.status(200).json({ message: 'OTP verified successfully', success: true });
//       }
//       //res.status(200).json({ message: 'OTP verified successfully', success: true });
//     } else {
//       res.status(400).json({ message: 'Invalid or expired OTP', success: false });
//     }
//   } catch (error) {
//     console.error('OTP verification error:', error);
//     return res.status(500).json({ message: 'Server error', success: false, error: error.message });
//   }
// });

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  // Check if both email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required', success: false });
  }

  try {
    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired OTP', success: false });
    }

    if (otp === record.otp) {
      await Otp.deleteOne({ _id: record._id });
      await User.updateOne({ email }, { isVerified: true });
      return res.status(200).json({ message: 'OTP verified successfully', success: true });
    }

    return res.status(400).json({ message: 'Incorrect OTP', success: false });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


