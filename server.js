

// IMPORTS
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sendMail from "./sendMail.js";
import "dotenv/config";



// REFERENCES
// server spec
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;
// resource path
const __dirname = dirname(fileURLToPath(import.meta.url));


// CB
const prepareData = (d) => {
    console.log("...preparing email data");
    const text = "\nONLINE ENROLMENT APPLICATION\n\n" +
        `name:\n${d["last-name"]}, ${d["first-name"]}, ${d["middle-name"]}, ${d["suffix-name"]}\n` +
        "\n" +
        `address:\n${d.address}\n` +
        "\n" +
        `contact No.:\n${d["contact-number"]}\n` +
        "\n" +
        `birthdate:\n${d["birth-year"]} - ${d["birth-month"]} - ${d["birth-day"]}\n` +
        "\n" +
        "sex:\n" + d.sex + "\n" +
        "\n" +
        "tribe:\n" + d.tribe + "\n" +
        "\n" +
        "civil status:\n" + d["civil-status"] + "\n" +
        "\n" +
        "home church:\n" + d["home-church"] + "\n" +
        "\n" +
        "church district:\n" + d["church-district"] + "\n" +
        "\n" +
        "education:\n" + d.education + "\n" +
        "\n" +
        "parent/guardian:\n" + d["parent-guardian-1"] + ", " + d["parent-guardian-2"] + "\n" +
        "\n" +
        "email:\n" + d.email + "\n" +
        "\n" +
        "facebook:\n" + d.fb + "\n";

    // return
    return {
        applicant: d["last-name"].toUpperCase() + ", " + d["first-name"],
        textContent: text,
        filename: `data-${d["last-name"].toUpperCase()}.txt`,
        dir: __dirname
    };
};


// MW
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
app.get("/", (req, res) => {
	console.count("GET homepage");
	res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit", (req, res) => {
    console.count("POST form content");
    console.log("REQUEST CONTENT:", req.body);

    // prepare email data
    const data = prepareData(req.body);

    // send email functionality
    sendMail(res, data);
});


// SERVER APPLICATION
app.listen(port, () => {
	console.log("\nSERVER running on port", port);
	console.log("maabcenrolmentform-2\n");
});