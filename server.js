const express = require('express');
const path = require('path');

let app = express();

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res) => {
  res.render('index', {});
});

// app.listen(8080, () => {
//   console.log('server running at http://localhost:8080');
// });

app.listen(3097, () => {
  console.log('server running at http://localhost:3097');
});