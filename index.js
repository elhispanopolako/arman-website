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
    const path = '/images/realizations/'
    const projects = [
        { image: path + "project1.jpg", title: "Nowoczesna łazienka z marmurowym wykończeniem", description: "Elegancka przestrzeń z owalnym lustrem LED, złotymi bateriami i przestronnym prysznicem" },
        { image: path + "project2.jpg", title: "Stylowe schody drewniane", description: "Biała balustrada w klasycznym stylu z drewnianymi stopniami, idealnie komponująca się z eleganckim wnętrzem" },
        { image: path + "project3.jpg", title: "Łazienka w stylu loftowym", description: "Połączenie drewna i industrialnych elementów, z dużym okrągłym lustrem i designerską umywalką." },
        { image: path + "project4.jpg", title: "Podłoga w szachownicę", description: "Klasyczne czarno-białe płytki dodające wnętrzu ponadczasowego charakteru." },
        { image: path + "project5.jpg", title: "Minimalistyczny prysznic walk-in", description: "Przejrzysta szklana ścianka i duże, białe płytki tworzą nowoczesny i przestronny design." }
    ];
    res.render("realizations.ejs", { active: 'realizations', projects: projects })
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
