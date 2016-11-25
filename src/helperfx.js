
function check(arr, fn) { for (var i = 0; i < arr.length; i++) { if (!fn(arr[i])) return false; } return true; }

function isNumber(el) { return typeof el === 'number' || el instanceof Number; }

function isString(el) { return typeof el === 'string' || el instanceof String; }

function isBinary(el) { if (el instanceof Buffer) return true; return false; }

const isArray = Array.isArray || function(arg) { return Object.prototype.toString.call(arg) === '[object Array]'; };

function detectType(val) {
	  if (isArray(val)) { var arr = val; if (check(arr, isNumber)) return 'NS'; if (check(arr, isString)) return 'SS'; if (check(arr, isBinary)) return 'BS'; return 'L'; }
	  if (isString(val)) return 'S';
	  if (isNumber(val)) return 'N';
	  if (isBinary(val)) return 'B';
	  if (val === null) return 'NULL';
	  if (typeof val === 'boolean') return 'BOOL';
	  if (typeof val === 'object') { return 'M'; }
}
function eachToString(arr) {
	  return arr.map(function(v) { 
	    return v.toString(); 
	  });
}

function explicit_type(opts, key) {
	  var type_specified = typeof opts === 'object' && typeof opts.types === 'object' && typeof key === 'string' && typeof opts.types[key] === 'string';
	  if (!type_specified) return; 
	  var type = opts.types[key];
	  if (typeExists(type)) return type;
}
module.exports = { check, isNumber, isString, isBinary, isArray, detectType, explicit_type, eachToString};