const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
require("./db/conn");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set('view engine', "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/matches', (req, res) => {
    res.render("matches");
});
app.get('/standings', (req, res) => {
    res.render("standings");
});
app.get('/index', (req, res) => {
    res.render("index");
});
app.get('/tickets', (req, res) => {
    res.render("tickets");
});
app.get('/news', (req, res) => {
    res.render("news");
});
app.get('/about', (req, res) => {
    res.render("about");
});
app.listen(port, () => {
    console.log('listening');
});