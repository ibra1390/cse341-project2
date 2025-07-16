const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
