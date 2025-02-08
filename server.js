const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'scores.json';

// Cria o arquivo scores.json se não existir
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.post('/submit', (req, res) => {
  try {
    const { score } = req.body;
    if (typeof score !== 'number') {
      return res.status(400).json({ error: 'Score must be a number' });
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.push(score);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
    res.json({ message: 'Score submitted' });
  } catch (error) {
    console.error('Erro no /submit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/ranking', (req, res) => {
  const currentScore = parseFloat(req.query.score);
  if (isNaN(currentScore)) {
    return res.status(400).json({ error: 'Score query param is required' });
  }
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const total = data.length;
  const beaten = data.filter(s => s < currentScore).length;
  // Percentual de jogadores superados:
  const percentile = total ? Math.round((beaten / total) * 100) : 0;
  res.json({ percentile });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
