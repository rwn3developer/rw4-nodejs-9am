const userModel = require('../models/userModel');

const fs = require('fs');

const index = async(req,res) => {
    try{
        let allData = await userModel.find({});
        return res.render('index',{record : allData});
    }catch(err){
        console.log(err);
        return false;
    } 
}

const add = (req,res) => {
    return res.render('add');
}


const addRecord = async(req,res) => {
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let gender = req.body.gender;
        let hobby = req.body.hobby;
        let city = req.body.city;
        let phone = req.body.phone;
        //validation
        if(!name || !email || !password || !gender || !hobby || !city || !phone || !req.files){
            console.log('All field is required');
            return false;
        }
        let mImages = [];
        req.files.map((item)=>{
            mImages.push(item.path)
        })
        let insertData = await  userModel.create({
            name,email,password,gender,hobby,city,phone,images : mImages
        })
        console.log("User Create");
        return res.redirect('/user')
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteUser = async(req,res) => {
    try{
        let removeFile = await userModel.findById(req.query.deleteId);
        removeFile.images.map((item)=>{
            fs.unlinkSync(item);
        })
        let deleteRecord = await userModel.findByIdAndDelete(req.query.deleteId);
        console.log("Record delete");
        return res.redirect('/user');
    }catch(err){
        console.log(err);
        return false;
    }
}

const editUser = (req,res) => {
   userModel.findById(req.query.editId)
   .then((single)=>{
       return res.render('edit',{
            single
       })
   }).catch((err)=>{
        console.log(err);
        return false;
   })
}

const updateRecord = (req,res) => {
    let id = req.body.editid;
    if(req.files.length != 0){
        //old image replace in folder
        userModel.findById(id).then((oldrecord)=>{
            oldrecord.images.map((item)=>{
                fs.unlinkSync(item);
            });
        }).catch((err)=>{
            console.log(err);
            return false;
        })

        //new iamges
        let mImages = [];
        req.files.map((item)=>{
            mImages.push(item.path)
        })

        //edit data
        userModel.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            gender : req.body.gender,
            hobby : req.body.hobby,
            city : req.body.city,
            phone : req.body.phone,
            images : mImages
        }).then((success)=>{
            console.log("record edit");
            return res.redirect('/user');
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }else{
        //edit data
        userModel.findById(id).
        then((oldImage)=>{
            let mimage = [];
            oldImage.images.map((item)=>{
                mimage.push(item)
            })
            userModel.findByIdAndUpdate(id,{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                gender : req.body.gender,
                hobby : req.body.hobby,
                city : req.body.city,
                phone : req.body.phone,
                image : mimage
            }).then((success)=>{
                console.log("record edit");
                return res.redirect('/user');
            }).catch((err)=>{
                console.log(err);
                return false;
            })
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }
}

module.exports = {
    index,add,addRecord,deleteUser,editUser,updateRecord
}