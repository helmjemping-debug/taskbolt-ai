const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Menampilkan halaman HTML di route utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API contoh
app.get('/api/chat', (req, res) => {
    const userText = req.query.text;
    res.json({
        status: "online",
        reply: `Respon AI untuk: "${userText}"`
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;
