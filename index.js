const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parser');
const path = require('path');
const validator = require('./validator.js');
const app = express();
const port = 3004;
const { Readable } = require('stream');
const basePath ='C:\\\\Users\\pankaj garg\\Documents\\' ;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    //change the path as per your machine
    const storagePath = path.join(basePath,req.body.outputFilename);
    const csvData = req.file.buffer.toString('utf8');
    const validationErrors = [];
    const stream = Readable.from(csvData);
    let rowNo=1;
    stream
    .pipe(csv())
      .on('data', (row) => {
    validator.validateTaskInfo(row, validationErrors,rowNo);
     rowNo++;
     })
      .on('end', () => {
        if (validationErrors.length > 0) {
          res.status(400).json({ errors: validationErrors });
        } else {
          
        fs.writeFileSync(storagePath, csvData);

             res.status(200).json({ message: 'Data uploaded successfully' });
    
        }
      });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );

