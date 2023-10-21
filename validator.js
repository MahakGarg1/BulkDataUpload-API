class validator {
    static validateTaskInfo(row,errors,rowNo) {
        validator.missingValidation(row,errors,rowNo);
        validator.datatypeValidation(row,errors,rowNo);
        validator.constraintValidation(row,errors,rowNo);
    }
    static missingValidation(row,errors,rowNo)
    {
        if (!row.username ) {
            errors.push(`Missing required field 'username' in row: ${rowNo}`);
           }
        if ( !row.task ) {
            errors.push(`Missing required field 'task' in row: ${rowNo}`);
           }
       if ( !row.status) {
            errors.push(`Missing required field 'status' in row: ${rowNo}`);
           }
        if ( !row.processid) {
            errors.push(`Missing required field 'processid' in row: ${rowNo}`);
           }
    }
    static datatypeValidation(row,errors,rowNo)
    {
        if(row.processid && isNaN(row.processid))
        {
            errors.push(`processId is not a number in row: ${rowNo}`);

        }
      
    }
    static constraintValidation(row,errors,rowNo)
    {
        const allowedStatus=['Started','In Progress','Completed'];
        if(!allowedStatus.includes( row.status))
        {
            errors.push(`Invalid status in row: ${rowNo},Please use valid status : ${allowedStatus}`);

        }
    }
    
  }
 module.exports = validator;