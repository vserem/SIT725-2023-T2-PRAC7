let collection = require('../models/cat.js');

const postCat =(req,res)=>{
    let cat = req.body;
    collection.postCat(cat, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 201,
                data: result,
                message: 'success'
            });
        }
    });

}

const getAllCats =(req,res)=>{
    collection.getAllCats((err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: 'get all calls sucessful'
            });
        }
    });
}

module.exports= {postCat,getAllCats}
 

