const express = require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const fs=require('fs');
const jwt = require('jsonwebtoken');
const router=express.Router();
const Employe=require('../models/employe');
//const registrstion=require('../routes/registration');

 function verifyToken(req,res,next){

    if(!req.headers.authorization){
       
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1];
    

    if(token==='null'){
       
        return res .status(401).send('unauthorize request')
    }
     
    let payload =jwt.verify(token,'secret');
    
    if(!payload){
        console.log("Payload is not found");
        return res.status(401).send('Unauthorized request')
    }
    console.log("payload is "+payload);
   req.userId=payload.subject;
   next();
    
}


const storage=multer.diskStorage({
destination:function(req,file,cb){
cb(null,'./upload/');
},
filename:function(req,file,cb){
cb(null,new Date().toISOString()+file.originalname);
}
});

const upload=multer({storage:storage});

router.get('/',verifyToken,(req,res,next)=>{
    Employe.find()  
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{   
        res.status(404).json({err:error})
    })
})


router.get('/:id',(req,res,next)=>{
    const id=req.params.id; 
    Employe.findOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result),
        console.log(result)
    })
    .catch(err=>{
        res.status(404).json({error})
    })
})


router.post('/',upload.single('profpic') ,(req,res,next)=>{
    console.log(req.body);
    const emp=new Employe({
        _id:new mongoose.Types.ObjectId(),
        fname:req.body.fname?req.body.fname:"",
        lname:req.body.lname,
        gender:req.body.gender,
        email:req.body.email,
        qualification: req.body.qualification,
        hobbies: req.body.hobbies,
        address: req.body.address,
        state: req.body.state?req.body.state:"",
        city: req.body.city,
        pin: req.body.pin,
        calnder:req.body.calnder,
        contact:req.body.contact,
        profpic:(req.file? req.file.path:'upload/2019-07-11T05:11:14.630ZemptyImage.jpeg'),
        salary:req.body.salary,
        skills:req.body.skills ? req.body.skills:""

    });
   
   console.log(emp);
   emp.save()
   .then(result=>{
       res.status(201).json({message:'user created',result})
   })
   .catch(err=>{res.status(404).json({error:err})})
})



router.patch('/:id',upload.single('profpic'),(req,res,next)=>
{
    const id=req.params.id;
   
    const updateOps={};
    // for(const op of req.body)
    // {
    //     updateOps[op.propName]=op.value;
    // }
            
        updateOps['fname']=req.body.fname;
        updateOps['lname']= req.body.lname;
        updateOps['gender']= req.body.gender;
        updateOps['email']= req.body.email;
        updateOps['address']= req.body.address;
        updateOps['state']= req.body.state;
        updateOps['city']= req.body.city;
        updateOps['qualification']= req.body.qualification;
        updateOps['pin']= req.body.pin;
        updateOps['contact']=req.body.contact;
        updateOps['salary']=req.body.salary;
        updateOps['hobbies']=req.body.hobbies;
        updateOps['skills']=req.body.skills;
        updateOps['calnder']=req.body.calnder;
        if(req.file){updateOps['profpic']=req.file.path;
        del=req.body.oldlink;
        console.log("path "+del);
        fs.unlink(del,function(err){
            if(err)throw err;
              console.log("file deleted")
        }) ;

    }

    Employe.update({ _id : id},{$set:updateOps})
   .select('fname lname email gender _id')
   .exec()
   .then(result=>
    {
        console.log(result);
        if(result)
        {
            res.status(200).json({
            Message:'Employee is updated Successfully',
            request:'GET',
            url:'http://localhost:3000/employee/'+result._id,
            });
        }
        else{  res.status(500).json({error:err});}
    })
    .catch(err=>{
        console.log(err);
        res.status(200).json({error:err});
    });
})





router.delete('/:email',(req,res,next)=>{
    const email=req.params.email;
    Employe.remove({email:email})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({error:err});
    });
});

module.exports=router;