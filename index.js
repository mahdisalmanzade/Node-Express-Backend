const express = require('express');
const path = require('path');
const axios = require('axios').default;
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));

// Using/Loading middleware to parse the json body
app.use(express.json()); 

app.use('/', express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.get('/', async (req, res) => {
  // const response = await axios.get(
  //   'http://www.omdbapi.com/?apikey=8f7c9dc&t=blue-is-the-warmest-colour'
  // );
  // console.log(response);
  // res.status(200).json({
  //   message: 'Successfully got your request and responed back',
  //   code: res.statusCode,
  // });
  res.render("index", { title: "Movie" });

});

app.post('/movie', (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
