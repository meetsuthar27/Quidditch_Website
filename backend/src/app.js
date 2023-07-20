const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
require("./db/conn");
const Register = require("./models/registers");
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.get('/teamreg_step1', (req, res) => {


    res.render("teamreg_step1");
});
app.get('/teamreg_step2', (req, res) => {
    res.render("teamreg_step2");
});
app.get('/teamreg_step3_1', (req, res) => {
    res.render("teamreg_step3_1");
});
app.get('/teamreg_step3_2', (req, res) => {
    res.render("teamreg_step3_2");
});
app.get('/teamreg_step4', (req, res) => {
    res.render("teamreg_step4");
});

let registerTeamData = {};

app.post('/teamreg_step1', async (req, res) => {

    try {
        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            for (let key in req.body) {
                registerTeamData[key] = req.body[key];
            }
        }
        else {
            res.send("Passwords do not match!");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});
app.post('/teamreg_step2', async (req, res) => {
    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
        res.send("Noo")
    } catch (error) {
        res.status(400).send(error)
    }

});
app.post('/teamreg_step3_1', async (req, res) => {

    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
    } catch (error) {
        res.status(400).send(error)
    }
});
app.post('/teamreg_step3_2', async (req, res) => {

    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
    } catch (error) {
        res.status(400).send(error)
    }
});
app.post('/teamreg_step4', async (req, res) => {
    try {
        let registerTeam = new Register(registerTeamData)
        const registered = await registerTeam.save()
    } catch (error) {
        res.status(400).send(error)
    }
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