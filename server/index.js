const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const bodyParser = require("body-parser");
const cors = require('cors')

require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)


// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

const PORT = process.env.PORT || 3000
// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
