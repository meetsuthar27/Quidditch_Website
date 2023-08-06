// hbs-helpers.js
const Handlebars = require("hbs");

Handlebars.registerHelper("increment", function (value) {
    return parseInt(value) + 1;
});
