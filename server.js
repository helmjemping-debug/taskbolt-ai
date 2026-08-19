const express = require('express');
const path = require('path');
const Groq = require('groq-sdk');

const app = express();
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.json({ reply: "Pesan tidak boleh kosong." });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: userText }],
            model: 'llama-3.3-70b-specdec',
        });

        res.json({ reply: chatCompletion.choices[0]?.message?.content || "Tidak ada respon." });
    } catch (error) {
        console.error("GROQ ERROR:", error);
        res.status(500).json({ reply: `Error Detail: ${error.message}` });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
