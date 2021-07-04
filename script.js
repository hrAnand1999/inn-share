const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');

connectDB();

async function fetchData(){
    // fetch all files older than 24 hrs
    const pastDate = new Date(Date.now()- 24*60*60*1000);
    const files = await File.find({ createdAt: {$lt: pastDate} });
    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path);  //remove from upload folder
                await fs.remove();   
                console.log(`successfully deleted file ${file.filename}`);         
            }catch(err){
                console.log(`error while deleting file ${err}`);
            }
        }
        console.log('job done...');
    }
}

fetchData().then(process.exit);