import multer from "multer";
import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

const router = express.Router()

// @desc  Upload File
// @route POST /api/files/upload
// @access Researcher Workshop Coordinator

const fileStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "uploads/")
    },
    filename: (req, file, callBack) =>{
        callBack(null, Date.now()+ "-"+file.originalname);
    }
});

const upload = multer({ storage: fileStorage })

router.post('/uploadFile', upload.single("attachment"), (req, res) => {
    // console.log(req.file);
    var path = req.file.path;
    res.status(200).send({ "path": path })
});  

router.post('/deleteFile', (req, res) => {
    
    fs.unlink(req.body.filepath, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send({ "error": error })
        }
        else{
            res.status(200).send({ "success": "delete success" })
        }
    });

});  


export default router;