const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hii Mikey!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const app = express();

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

// Product Schema
// const productSchema = new mongoose.Schema({
//   name: String,
//   image: String // URL or file path of the uploaded image
// });

// const Product = mongoose.model('Product', productSchema);

// // Image upload setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Route to add new product
// app.post('/add-product', upload.single('image'), async (req, res) => {
//   const { name } = req.body;
//   const image = req.file.path;

//   const product = new Product({ name, image });
//   await product.save();

//   res.send({ message: 'Product added successfully', product });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
