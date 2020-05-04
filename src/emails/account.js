const sgMail = require('@sendgrid/mail');

const apikey = process.env.SENDGRID_API_KEY;
try{
    sgMail.setApiKey(apikey);
}
catch (e) {
    console.log(e);
}
const enquiryEmail = ({name,contact_number,email_id,description,address})=>{
   try{

       sgMail.send({
           to: 'info@popularbreadindore.com',
           from:'info@popularbreadindore.com',
           subject : "testing the api",
           text : `you have a new enquiry by ${name}. the enquiry is : ${description}. Contact details are ${contact_number} , ${email_id} and address is ${address}`
       })
   }
   catch (e) {
       console.log(e);
   }
};

const feedback = async({name,contact,email,product,description})=>{
    try{

        sgMail.send({
            to: 'info@popularbreadindore.com',
            from:'info@popularbreadindore.com',
            subject : "testing the api",
            text : `you have a new enquiry by ${name}. the enquiry is : ${description}. Contact details are ${contact_number} , ${email_id} and address is ${address}`
        })
    }
    catch (e) {
        console.log(e);
    }
};

module.exports ={enquiryEmail,feedback};