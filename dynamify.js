var dynamifyjson=require(__dirname + '/src/dynamify-conditions.js')
var dynamifyObject = (rowObject, callback) => {
	dynamoRowObjects=''; count=0;
	for (var column in rowObject){
		if (rowObject.hasOwnProperty(column)) {
   			columnItem=rowObject[column];
			columnDataType= dynamifyjson.get_dynamo_datatype(columnItem);
			dynamoColumnsObject={};
			dynamoColumnsObject[column] = columnDataType
			dynamoColumnSuffixChar = ( ++count < Object.keys(rowObject).length) ? ', ':'';
			dynamoRowObjects += ( '"' + column + '"' + " : " + JSON.stringify(columnDataType) + dynamoColumnSuffixChar );
	  	}
	}
	dynamoRowObjects = '{'+ dynamoRowObjects + '}'; 
	return callback(dynamoRowObjects);
}
module.exports = { dynamifyObject };