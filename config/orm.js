const connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
};

let orm = {
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function (err, result) {
            if (err) { throw err };

            cb(result)
        });
    },

    insertOne: function (tableInput, col, value, cb) {
        let queryString = "INSERT INTO " + tableInput + " (??) VALUES (?);";
      console.log(queryString)
      connection.query(queryString, [col, value], function (err, result) {
        if (err) { throw err };

        cb(result)
      });

    },

    updateOne: function (tableInput, col, value, id, cb) {
       var queryString = "UPDATE " + tableInput;

    queryString += " SET ";
    queryString += col + " = '" + value + "'";
    queryString += " WHERE id = " + id + ";";
      console.log(queryString)
      connection.query(queryString, function (err, result) {
        if (err) { throw err };

        cb(result)
      });
    }
};

//export the object for the model
module.exports = orm;