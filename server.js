import express from 'express';
var app = express();

app.use('/', function(req, res) {
res.send('Hello World');
});

if (require.main === app.js) {
app.listen(3000, function () {
console.log('Server running at http://localhost:3000/');
});
} else {
module.exports = app;
}
