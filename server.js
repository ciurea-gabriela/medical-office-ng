const express = require('express');

const app = express();

app.use(express.static('./medical-office-ng'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'medical-office-ng' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
