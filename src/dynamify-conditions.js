const fx = require(__dirname+ '/helperfx.js');
var COMPLEXTYPES = ['L', 'BS', 'NS', 'SS'];
var __mutateArrays = false;

function _preserveArrays() {

  	__mutateArrays = true;

}
function getType(val, opts, key) {

	var explicit = fx.explicit_type(opts, key);
	var detectedType = fx.detectType(val);
	var type = detectedType;
	if (fx.isArray(val) && __mutateArrays) type = 'L';
	if (COMPLEXTYPES.indexOf(explicit) > -1 && COMPLEXTYPES.indexOf(detectedType) > -1) type = explicit;
	return type;

}
function to_dynamo_object_deep(val,key) {
	  switch(getType(val)) {
	  case 'B': return {'B': val};
	  case 'BS': return {'BS': val};
	  case 'N': return {'N': val.toString()};
	  case 'NS': return {'NS': eachToString(val)};
	  case 'S': return {'S': val.toString()};
	  case 'SS': return {'SS': eachToString(val)};
	  case 'BOOL': return {'BOOL': val ? true: false};
	  case 'L': return {'L': val.map(function(obj){ return to_dynamo_object_deep(obj); })};
	  case 'M': return {'M': to_dynamo_object_shallow(val, opts)};
	  case 'NULL': return {'NULL': true};
	  default: return;
	  }
}
function to_dynamo_object_shallow(obj) {
  var result = {};
  for (var key in obj) {
	    if(obj.hasOwnProperty(key)) {
	      var to_dynamo_object_shallowped = to_dynamo_object_deep(obj[key], key);
	      if (typeof to_dynamo_object_shallowped !== 'undefined')
	        result[key] = to_dynamo_object_shallowped;
	    }
  }
  return result;
}
const get_dynamo_datatype = function(item){
	switch(getType(item)){
		case 'B': return {'B': item};
		case 'BS': return {'BS': item};
		case 'N': return {'N': item.toString()};
		case 'NS': return {'NS': fx.eachToString(item)};
		case 'S': return {'S': item.toString()};
		case 'SS': return {'SS': fx.eachToString(item)};
		case 'BOOL': return {'BOOL': item ? true: false};
		case 'L': return {'L': item.map(function(obj){ return to_dynamo_object_deep(obj); })};
		case 'M': return {'M': to_dynamo_object_shallow(item)};
		case 'NULL': return {'NULL': true};
		default: return (typeof columnItem).toUpperCase().substr(0,1);
	}
}

module.exports = { get_dynamo_datatype };