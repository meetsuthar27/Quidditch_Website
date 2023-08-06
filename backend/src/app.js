require('dotenv').config();
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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const Standing = require("./models/standingss");
const Clash = require("./models/clashess");


require("./hbs-helpers");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set('view engine', "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    return res.render("index");
});
app.get('/matches', (req, res) => {
    return res.render("matches");
});
app.get('/teamreg_step1', (req, res) => {
    return res.render("teamreg_step1");
});
app.get('/teamreg_step2', (req, res) => {
    return res.render("teamreg_step2");
});
app.get('/teamreg_step3_1', (req, res) => {
    return res.render("teamreg_step3_1");
});
app.get('/teamreg_step3_2', (req, res) => {
    return res.render("teamreg_step3_2");
});
app.get('/teamreg_step4', (req, res) => {
    return res.render("teamreg_step4");
});
app.get('/clashes21', (req, res) => {
    return res.render("clashes21");
});
app.get('/clashes22', (req, res) => {
    return res.render("clashes22");
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
            return res.redirect('/teamreg_step2');
        }
        else {
            return res.send("Passwords do not match!");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
});
app.post('/teamreg_step2', async (req, res) => {
    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
        return res.redirect('/teamreg_step3_1');
    } catch (error) {
        return res.status(400).send(error)
    }

});
app.post('/teamreg_step3_1', async (req, res) => {

    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
        return res.redirect('/teamreg_step3_2');
    } catch (error) {
        return res.status(400).send(error)
    }
});
app.post('/teamreg_step3_2', async (req, res) => {


    try {
        for (let key in req.body) {
            registerTeamData[key] = req.body[key];
        }
        return res.redirect('/teamreg_step4');
    } catch (error) {
        return res.status(400).send(error)
    }
});
// const teamData = Register.find({});
app.post('/teamreg_step4', async (req, res) => {
    try {
        console.log(registerTeamData);
        let registerTeam = new Register(registerTeamData);

        const token = await registerTeam.generateAuthToken();
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 30000),
        //     httpOnly: true
        // });

        const registered = await registerTeam.save();
        const newStanding = new Standing({
            team: registerTeamData.firstname, // Use the _id of the newly registered team
            matches: 0,
            win: 0,
            loss: 0,
            draw: 0,
            points: 0,
            gd: 0
        });

        await newStanding.save();
        console.log("Successfully registered");
        res.status(200).json({ message: "Team registered successfully" });
        // res.redirect('/index'); // Redirect to the index page after successful registration

    } catch (error) {
        console.log("error: " + error);
        return res.status(400).send(error);
    }
});
// app.get('/standings', async (req, res) => {
//     try {
//         // Fetch the standings data from the database
//         const standingsData = await Standing.find({}).sort({ points: -1 });

//         // Render the "standings" template and pass the standingsData as a variable
//         res.render("standings", { standingsData });
//     } catch (error) {
//         console.error("Error fetching standings data:", error);
//         res.status(500).send("Internal server error");
//     }
// });
// Example code for rendering the standings.hbs template with isAdmin set to true for admin users
app.get('/standings', (req, res) => {
    // Check if the user is authenticated (admin)
    if (req.cookies.jwt) {
        // If the user is authenticated, fetch the user role from the token
        jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(500).send("Internal server error");
            }

            const isAdmin = decodedToken.is_admin === 1;

            // Fetch the standings data
            Standing.find({})
                .then((standingsData) => {
                    res.render("standings", { standingsData, isAdmin });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Internal server error");
                });
        });
    } else {
        // If the user is not authenticated, set isAdmin to false
        const isAdmin = false;

        // Fetch the standings data
        Standing.find({})
            .then((standingsData) => {
                res.render("standings", { standingsData, isAdmin });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Internal server error");
            });
    }
});

// app.get('/teams', auth, (req, res) => {
//     const isAdmin = req.user && req.user.is_admin === 1;
//     console.log('isAdmin:', isAdmin);
//     Register.find({})
//         .then((x) => {
//             res.render("teams", { x, isAdmin });
//             // console.log(x);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// });
app.get('/teams', (req, res) => {
    // Check if the user is authenticated (admin)
    if (req.cookies.jwt) {
        // If the user is authenticated, fetch the user role from the token
        jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(500).send("Internal server error");
            }

            const isAdmin = decodedToken.is_admin === 1;

            // Fetch the teams data
            Register.find({})
                .then((x) => {
                    res.render("teams", { x, isAdmin });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Internal server error");
                });
        });
    } else {
        // If the user is not authenticated, set isAdmin to false
        const isAdmin = false;

        // Fetch the teams data
        Register.find({})
            .then((x) => {
                res.render("teams", { x, isAdmin });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Internal server error");
            });
    }
});

app.get('/delete/:id', async (req, res) => {
    let teamId = req.params.id;
    try {
        // Use findByIdAndRemove() with await
        const deletedTeam = await Register.findByIdAndRemove(teamId);

        if (deletedTeam) {
            console.log('Team deleted:', deletedTeam);
            res.sendStatus(200);
        } else {
            res.status(404).send('Team not found');
        }
    } catch (err) {
        console.error('Error deleting team:', err);
        res.status(500).send('Error deleting the team');
    }
});

app.get('/update/:id', async (req, res) => {
    try {
        // Get the team's _id from the request parameters
        const teamId = req.params.id;

        // Fetch the team data from the database based on the _id
        const team = await Standing.findById(teamId);

        // Render the update form and pass the team data to the template
        res.render("update-form", { team });
    } catch (error) {
        console.error("Error fetching team data:", error);
        res.status(500).send("Error fetching team data");
    }
});

app.post('/update/:id', async (req, res) => {
    const teamId = req.params.id;
    const updatedData = {
        matches: req.body.matches,
        win: req.body.win,
        loss: req.body.loss,
        draw: req.body.draw,
        points: req.body.points,
        gd: req.body.gd
    };

    try {
        // Find the team by ID and update its data
        const updatedTeam = await Standing.findByIdAndUpdate(teamId, updatedData, { new: true });

        if (!updatedTeam) {
            return res.status(404).send('Team not found');
        }

        // Redirect back to the standings page after the update
        res.redirect('/standings');
    } catch (error) {
        console.error('Error updating team data:', error);
        res.status(500).send('Error updating team data');
    }
});

app.get('/index', (req, res) => {
    return res.render("index");
});
app.get('/tickets', (req, res) => {
    return res.render("tickets");
});
app.get('/login', (req, res) => {
    return res.render("login");
});
app.post('/index', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(email);
        const useremail = await Register.findOne({ email: email });
        const userName = useremail.firstname;
        // res.send(useremail.password);
        const isMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        });

        // console.log(`cookie value: ${req.cookies.jwt}`);
        // console.log(token);

        // console.log(cookie);
        if (isMatch) {
            res.status(201).render("index", { userName });
        }
        else {
            res.send("passwords do not match!");
        }
    } catch (error) {
        res.status(400).send("Invalid Email or Password");
    }
});
app.get('/news', (req, res) => {
    return res.render("news");
});
app.get('/aboutus', (req, res) => {
    return res.render("aboutus");
});
app.get('/newsar1', (req, res) => {
    return res.render("newsar1");
});
app.get('/about', (req, res) => {
    return res.render("about");
});
app.get('/clashes', async (req, res) => {
    try {
        // Fetch the clashes data from the database
        const clashesData = await Clash.find({});

        // Render the "clashes" template and pass the clashesData as a variable
        res.render('clashes', { clashesData });
    } catch (error) {
        console.error('Error fetching clashes data:', error);
        res.status(500).send('Internal server error');
    }
});
app.get('/secret', auth, (req, res) => {
    return res.render("secret");
});
app.get('/logout', auth, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token !== req.token
        // })
        res.clearCookie("jwt");
        // console.log("logout");
        // await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/get-user-role", (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Verify the token and get the user data (including the role)
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        const { is_admin } = decodedToken;

        // Send the role information back to the client
        res.json({ is_admin });
    });
});

app.listen(port, () => {
    console.log('listening');
});