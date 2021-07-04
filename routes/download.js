const Router = require('express').Router();

const File = require('../models/file');

Router.get('/:uuid', async (req, res)=>{
    const file = await File.findOne({ uuid: req.params.uuid });
    if(!file){
        return res.render('download', {error : 'Link has been expired'})
    }
    const filePath = `${__dirname}/../${file.path}`;
    //to download file
    res.download(filePath);
});

module.exports = Router;