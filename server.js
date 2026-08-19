const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());

// Inisialisasi SDK Gemini (mengambil API Key dari Environment Variable Vercel)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) {
        return res.json({ reply: "Pesan tidak boleh kosong." });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userText,
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Gagal terhubung ke Gemini API. Pastikan GEMINI_API_KEY di Vercel sudah benar." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
