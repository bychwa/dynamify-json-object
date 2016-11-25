# Dynamify-Json-Object

Since Dynamodb uses a rather cumbersome json format to define its data, **dynamify-json-object** is a simple helper library that will help you convert your standard json object into DynamoDB accepted format. This will help you continue working with json format that you are already used to rather than worrying about dynamodb specific json convention.

### Installation

Install this library as a dependency with npm tool.

```sh
$ npm install dynamify-json-object --save
```

### Usage:
To use the library, use the following code to require and call dynamifyObject function.

```javascript
const helper = require('dynamify-json-object');

helper.dynamifyObject({'name' :'Jackson','age':20,'enabled':true}, function(data){
    console.log(data);
});

```

### Output:

```json
{"name" : {"S":"Jackson"}, "age" : {"N":20}, "enabled" : {"B":true}}
```

### Supported types:

```json
| JavaScript types                                                       | DynamoDB Attribute Value |
|------------------------------------------------------------------------|--------------------------|
| String                                                                 | S                        |
| Number                                                                 | N                        |
| Boolean                                                                | BOOL                     |
| null                                                                   | NULL                     |
| Array                                                                  | L                        |
| Object                                                                 | M                        |
| Buffer, File, Blob, ArrayBuffer, DataView, and JavaScript typed arrays | B                        |
```