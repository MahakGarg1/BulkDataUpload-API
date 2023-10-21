const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = 3004;
const { Readable } = require('stream');
const storagePath = path.join('C:\\\\Users\\pankaj garg\\Documents', '', 'data.csv');


// Create storage for uploaded CSV files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const csvData = req.file.buffer.toString('utf8');

    const validationErrors = [];
    const validData = [];

    // Parse CSV data and validate each row
    const stream = Readable.from(csvData);

  stream
    .pipe(csv())
      .on('data', (row) => {
        // Access data from CSV columns
    const name = row.username;
    const task = row.task;
    const status = row.status;
     
    
    console.log(`csvData ${status}`);

    // Validation 
    if (!row.username || !row.task || !row.status) {
      errors.push(`Missing required fields in row: ${row}`);
     }
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

