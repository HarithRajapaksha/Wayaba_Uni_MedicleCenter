const express=require('express');
const router=express.Router();
const nodemailer = require("nodemailer");
const authorizeRoles=require("../Middlewares/roleMiddleware");
const verifyToken=require("../Middlewares/authMiddleware");
const User = require('../Model/UserModel');
const StudentData = require('../Model/StudentData');
const Medicine=require('../Model/MedicineModel');
const MedicleReports=require('../Model/MedicleReportModel');


router.get('/pharmacist/:id',verifyToken,authorizeRoles('Doctor'),async(req,res)=>{

    const userId=req.params.id;

       try {
        const FindUser= await StudentData.findById(userId);
        res.status(200).json({message:'User found',FindUser});
        console.log("User finded ",FindUser);
       } catch (error) {
         res.status(500).json({message:'User not found'});
         console.log("Error is : ",error);
       } 
  
});


router.post('/pharmacist1',verifyToken,authorizeRoles('Doctor'),async(req,res)=>{

    const{medicines,regNO,studentName,}=req.body;
    const newMedicine=new Medicine({medicines,regNO,studentName});
    newMedicine.save().then(()=>{
        res.status(201).json({message:'Medicine data saved successfully',newMedicine});
    }).catch((err)=>{
        res.status(500).json({message:'Medicine data not saved',err});
    });
  
});

router.get('/pharmacist2',verifyToken,authorizeRoles('Pharmacist'),async(req,res)=>{

    Medicine.find().then((medicines)=>{
        res.status(200).json({medicines});
    }).catch((err)=>{
        res.status(500).json({message:'Medicines data not found',err});
    });
  
});



 // Route to handle saving MedicleReports and sending email
router.post("/MedicleReports",verifyToken,authorizeRoles('Doctor'), async (req, res) => {
    const { studentName, regNO, faculty, department, extraInfo} = req.body;
  
    // Create a new medical report
    const newMedicleReport = new MedicleReports({
      studentName,
      regNO,
      faculty,
      department,
      extraInfo,
    });
  
    try {
      // Save the medical report to the database
      await newMedicleReport.save();
  
      // Configure nodemailer transporter with App Password
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "itpm322@gmail.com", // Your Gmail address
          pass: "kkvj hcwa txot zmqq", // Use the App Password from Google
        },
      });
  
      // Email sending options
      const mailOptions = {
        from: "itpm322@gmail.com", // Sender email address
        to: "priyaharshanaharith@gmail.com", // Dynamic recipient email from request body
        subject: "Medical Report Submission Confirmation",
        text: ` Medicle Report Submission ${regNO},\n\n Medical report has been successfully submitted.\n\nDetails:\n- Registration Number: ${regNO}\n- Faculty: ${faculty}\n- Department: ${department}\n- Additional Info: ${extraInfo}\n\nThank you!`,
        html: `<h3> ${studentName},</h3><p>Student medical report has been successfully submitted.</p><p><strong>Details:</strong></p><ul><li><strong>Registration Number:</strong> ${regNO}</li><li><strong>Faculty:</strong> ${faculty}</li><li><strong>Department:</strong> ${department}</li><li><strong>Additional Info:</strong> ${extraInfo}</li></ul><p>Thank you!</p>`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({
            message: "Medical Report saved, but email not sent.",
            error: error.message,
          });
        } else {
          console.log("Email sent:", info.response);
          return res.status(201).json({
            message: "Medical Report saved successfully and email sent.",
            newMedicleReport,
          });
        }
      });
    } catch (error) {
      console.error("Error saving Medical Report or sending email:", error);
      res.status(500).json({
        message: "Failed to save Medical Report or send email.",
        error: error.message,
      });
    }
  });


router.post('/Nurse',verifyToken,authorizeRoles('Admin','Nurse'),(req,res)=>{

    const{studentName,registrationNumber,faculty,extraInfo}=req.body;
    const newStudent=new StudentData({studentName,registrationNumber,faculty,extraInfo});
    newStudent.save().then(()=>{
        res.status(201).json({message:'Student data saved successfully',newStudent});
    }).catch((err)=>{
        res.status(500).json({message:'Student data not saved',err});
    });
       
});

//Only Nurse can access this route
router.get('/Nurse1',verifyToken,authorizeRoles('Doctor'),(req,res)=>{

    StudentData.find().then((students)=>{
        res.status(200).json({message:'All students data',students});
    }).catch((err)=>{
        res.status(500).json({message:'Students data not found',err});
    });
       
});




//All users can access this route
router.get('/user',verifyToken,authorizeRoles(''),(req,res)=>{
    res.send('Welcome User');
});

module.exports=router;