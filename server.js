const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// ✅ Health check endpoint for Jenkins
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
app.get('/api/backend-data', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/data');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from backend' });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Express server running on port 3000');
});
