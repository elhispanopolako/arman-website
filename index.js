import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Toastify from 'toastify-js'

dotenv.config();


const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.render("home.ejs", { active: 'home' })
});
app.get("/about", (req, res) => {
    res.render("about.ejs", { active: 'about' })
});
app.get("/services", (req, res) => {
    res.render("services.ejs", { active: 'services' })
});
app.get("/realizations", (req, res) => {
    res.render("realizations.ejs", { active: 'realizations' })
});
app.get("/contact", (req, res) => {
    res.render("contact.ejs", { active: 'contact' })
});

app.post("/submit", async (req, res) => {
    const { name, surname, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TARGET,
        subject: `Nowa wiadomość od ${name} ${surname}`,
        text: `Imię: ${name}\nNazwisko: ${surname}\nEmail: ${email}\nTelefon: ${phone}\n\nWiadomość:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render("contact.ejs", { active: 'contact', toast: 'Wiadomość wysłana!' })
    } catch (error) {
        res.status(500).send(error.toString());
    }
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
