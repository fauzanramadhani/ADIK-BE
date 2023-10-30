require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}).on('error', (err) => {
    console.log(`Server error: ${err}`);
});