require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./api/routes/auth');
const pagesRoutes = require('./api/routes/pages');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRoutes);
app.use('/api/pages', pagesRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
