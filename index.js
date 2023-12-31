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
const upload = multer({limits: {
  fileSize: 1024 * 1024 * 1, // 1 MB limit (adjust as needed)
}, storage: storage }).single('csvFile');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file too large)
      return res.status(400).json({ error: 'File size exceeds the limit' });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ error: 'File upload error' });
    }

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
    
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );

