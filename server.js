const express = require('express');
const cors = require('cors');

const app = express();

const whitelist = ['https://medical-office-app.herokuapp.com']; // list of allow domain

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}

app.use(cors(corsOptions));

app.use(express.static('./dist/medical-office-ng'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/medical-office-ng' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
