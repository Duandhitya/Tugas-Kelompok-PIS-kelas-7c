const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let randomNumber = generateRandomNumber(); // Fungsi baru untuk menghasilkan nomor acak
let guessCount = 0;

// Rute untuk mereset permainan
app.get('/reset', (req, res) => {
  randomNumber = generateRandomNumber();
  guessCount = 0;
  res.redirect('/');
});

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

app.get('/', (req, res) => {
  res.render('index', { message: '', guessCount });
});

app.post('/guess', (req, res) => {
  const userGuess = parseInt(req.body.guess);

  if (isNaN(userGuess)) {
    res.render('index', { message: 'Please enter a valid number.', guessCount });
    return;
  }

  guessCount++;

  if (userGuess === randomNumber) {
    res.render('win', { guessCount });
  } else {
    const message =
      userGuess > randomNumber ? 'Too high. Try again!' : 'Too low. Try again!';
    res.render('index', { message, guessCount });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});