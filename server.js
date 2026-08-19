const express = require('express');
const path = require('path');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chat', async (req, res) => {
    const userText = req.query.text;
    if (!userText) return res.json({ reply: "Pesan tidak boleh kosong." });

    try {
        const completion = await openai.chat.completions.create({
            model: "qwen/qwen-2.5-7b-instruct:free",
            messages: [{ role: "user", content: userText }],
        });

        res.json({ reply: completion.choices[0]?.message?.content || "Tidak ada respon." });
    } catch (error) {
        console.error("OPENROUTER ERROR:", error);
        res.status(500).json({ reply: `Error Detail: ${error.message}` });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
