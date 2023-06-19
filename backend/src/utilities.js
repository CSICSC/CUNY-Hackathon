const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EPSW
    }
});

module.exports.subtractTimesInSeconds = (time1, time2) => {
    const [hours1, minutes1, seconds1] = time1.split(':');
    const [hours2, minutes2, seconds2] = time2.split(':');

    const date1 = new Date();
    date1.setHours(hours1, minutes1, seconds1, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, seconds2, 0);

    const differenceInMillis = date2.getTime() - date1.getTime();
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);

    return differenceInSeconds;
}

module.exports.sendFriendEmail = async (email) => {
    try{
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `${email} wanted you to check of CUNY Hacks 2023`,
        html: `
        <h1>CUNY Hacks <span style="color: blue;">2023</span><h1>
        <hr />
        <br />
        <p>
        Your friend ${email} wanted you to check out CUNY Hacks 2023 a CUNY wide hackathon this fall 2023!<br/>
        You can find out more @ <a href="http://13.58.77.183">CUNY Hacks 2023</a>.
        </p>
        `
    });
    }catch(e){
        console.log(e);
    }
}

module.exports.sendEmail = async (email) => {
    try{
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `CUNY Hacks 2023`,
        html: `
        <h1>Thank you for you interest in CUNY Hacks <span style="color: blue;">2023</span><h1>
        <hr />
        <br />
        <p>
        We will update you further of any events.<br />
        In the meantime you can prepare by learning different technologies and building projects.
        Don't forget to add a friend to <a href="http://13.58.77.183">CUNY Hacks 2023</a>.
        </p>
        `
    });
    }catch(e){
        console.log(e);
    }
}