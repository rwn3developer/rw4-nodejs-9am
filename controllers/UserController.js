const userModel = require('../models/userModel');

const fs = require('fs');

const index = (req,res) => {
    userModel.find({})
    .then((record)=>{
        return res.render('index',{record});
    }).catch((err)=>{
        console.log(err);
        return false;
    })
    
}

const add = (req,res) => {
    return res.render('add');
}


const addRecord = (req,res) => {
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
        
    userModel.create({
        name,email,password,gender,hobby,city,phone,images : mImages
    }).then((success)=>{
        console.log("user is successfully create");
        return res.redirect('/user');
    }).catch((err)=>{
        console.log("user not add");
        return false;
    })
}

const deleteUser = (req,res) => {
    userModel.findById(req.query.deleteId).then((oldrecord)=>{
        oldrecord.images.map((item)=>{
            fs.unlinkSync(item);
        });
    }).catch((err)=>{
        console.log(err);
        return false;
    })

    userModel.findByIdAndDelete(req.query.deleteId).
    then((success) => {
        console.log("Record Delete");
        return res.redirect('/user');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
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