
const express = require('express');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const router=express.Router();
const Registration=require('../models/registration')
const nodemailer=require("nodemailer");
const Cryptr = require('cryptr');

let decrptionkey='';
//-----------------function to send mail------------------------------------------------
async function main(mailId,Id,pass){

    const cryptr = new Cryptr(pass);
    decrptionkey=pass; 
    console.log("decryption key is "+decrptionkey)
    let crptID=cryptr.encrypt(Id);

     
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'lokhandeabhijeet11187@gmail.com',
            pass:"Abhi@11187"
        }
    });
    var mailOptions={
        from:'lokhandeabhijeet11187@gmail.com',
        to:mailId,
        subject:'Reset Password Link',
        text:`Click below link to Reset Your password

        http://localhost:4200/auth/reset/`+crptID
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Mail send "+info.response);
        }
    });

    // let testAccount = await nodemailer.createTestAccount();
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, 
    //     auth: {
    //       user: testAccount.user, 
    //       pass: testAccount.pass 
    //     }
    //   });

    //   let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>" // html body
    //   });

}


router.post('/',(req,res,next)=>{
    console.log('in post');
     reg = new Registration({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    reg.save()
    .then(result=>res.status(201).json({message:'added',user:result}))
    .catch(error=>console.log(error))
   
})



router.post('/login',(req,res,next)=>{
    console.log("in th post");
    Registration.find({email:req.body.email})
    .exec()
    .then(user=>{
       // console.log("in the find")
        if(user.length < 1){
            return res.status(404).json({
                message:"Authentication failed"
            });
        }
        else{
            console.log("in the find");
             console.log(user[0].password);
             console.log(req.body.password);
            if(user[0].password===req.body.password){
               const token= jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },process.env.JWT_KEY,
                {
                    expiresIn:"1hr"
                })
                return res.status(200).json({message:"Authenticate User",token:token});
            }else{ return res.status(404).json({
                message:"Authentication failed"
            });}
            
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
})
//-----------Password Update--------------------------------------

router.post('/reset/:id',(req,res,next)=>
{
    const cryptId=req.params.id;
    const cryptr = new Cryptr(decrptionkey);
    decrptionkey="";
    const id=cryptr.decrypt(cryptId);
    console.log("Req Bodyy is "+req.body.pass);
    const password=req.body.pass;
    console.log("Password is "+password)
    Registration.updateOne({ _id : id},{$set:{password:password}})
   .select()
   .exec()
   .then(result=>
    {
        console.log(result);
         res.status(201).json({result});    
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
})
//=============================================
// router.patch('/:id',function(req,res){
//     const id=req.params.id;
//     console.log(id);
//     console.log("Req Bodyy is "+req.body.pass);
// })




// router.get('/:id',(req,res,next)=>{
//     const id=req.params.id; 
//     Registration.findOne({_id:id})
//     .exec()
//     .then(result=>{
//         if(result){
//            // console.log(result.email)
//         res.status(200).json(result),
//         console.log(result)}
//         else{return res.status(404).json({message:"Not found"})}
//     })
//     .catch(err=>{
//         res.status(404).json({error})
//     })
//    })

router.get('/:email',(req,res,next)=>{
 const email=req.params.email; 
 Registration.findOne({email:email})
 .exec()
 .then(result=>{
     if(result){
        // console.log(result.email)
        console.log(result);
        main(result.email,result._id,result.password)
     res.status(200).json(result)
    // console.log("result is "+result.password)
    }
     else{return res.status(404).json({message:"Not found"})}
 })
 .catch(err=>{
     res.status(404).json({error})
 })
})

module.exports=router;