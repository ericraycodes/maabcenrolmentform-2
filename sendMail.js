

// IMPORT
import nodemailer from "nodemailer";
import "dotenv/config";



export default function sendMail (res, data)	{
	console.log("sending mail...");
	console.log("user data:", data);


	// CONFIGURE NODEMAILER
	const cc1 = process.env.CC1;
	const sender = process.env.EMAIL;
	const pw = process.env.APP_PASSWORD;
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: sender,
			// get the app password from your gmail account:
			pass: pw
		}
	});


	// COMPOSE MAIL
	const recipient = process.env.EMAIL;
	const cc = process.env.CC;
	const mailOptions = {
		from: sender,
		to: recipient,
		cc: cc,
		subject: `Enrolment Application: ${data.applicant}`,
		text: data.textContent,
		attachments: [{
			filename: data.filename,
			content: data.textContent
		}]
	};


	// SEND MAIL
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("ERROR SENDING MAIL:\n", error);
			res.status(500).sendFile(data.dir + "/public/error.html");
		} else {
			console.log("EMAIL SENT:\n", info);
			res.status(250).sendFile(data.dir + "/public/success.html");
		}
	});
	
}