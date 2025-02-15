import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("home.ejs",{active:'home'})
});
app.get("/about", (req, res) => {
    res.render("home.ejs",{active:'about'})
});
app.get("/services", (req, res) => {
    res.render("home.ejs",{active:'services'})
});
app.get("/realizations", (req, res) => {
    res.render("home.ejs",{active:'realizations'})
});
app.get("/contact", (req, res) => {
    res.render("home.ejs",{active:'contact'})
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  