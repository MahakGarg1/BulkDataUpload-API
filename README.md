# BulkDataUpload-API

## Requirements
Implement an endpoint that accepts a POST request for uploading CSV data. The
endpoint should accept a CSV file as input.

## Commands to run 

### i) Installing the packages

```
npm init
```

### ii) Starting the server
```
node index.js
```
### iii) curl


```
curl --location 'http://localhost:3004/upload' \
--form 'csvFile=@"/C:/Users/mahak garg/Documents/user.csv"'
```

