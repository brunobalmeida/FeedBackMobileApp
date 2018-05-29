/** Local Database App - Using jQuery Mobile
 * File Name: BAdatabase.js
 *
 * Revision History:
 *       Bruno Almeida, 2018-04-09 : Created
 */

var db;

/**
 * General purpose error handler
 * @param tx The transaction
 * @param error The error object
 */
function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    BACreateDatabase: function(){
        var shortName= "BAFeedbackDb";
        var version = "1.0";
        var displayName = "DB BAFeedback App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    BACreateTables: function(){

        function txFunction(tx) {
            console.info("Creating tables: type and review ");
            var options = [];
            var sql = "DROP TABLE IF EXISTS type;";

            function dropTypeTable(){
                console.info("Success: Drop type successful.");
            }
            tx.executeSql(sql, options, dropTypeTable, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            function successCreateType(){
                console.info("Success: Create type successful.");
            }
            tx.executeSql(sql, options, successCreateType, errorHandler);

            var sqlInsert = ["INSERT INTO type (name) VALUES ('Canadian');",
                "INSERT INTO type (name) VALUES ('Asian');",
                "INSERT INTO type (name) VALUES ('Others');"];


            function successInsertType(){
                console.info("Success: Row inserted successfully.");
            }
            for (var i = 0; i < sqlInsert.length; i++) {
                tx.executeSql(sqlInsert[i], options, successInsertType, errorHandler);
            }

            sql = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            function successCreateReview(){
                console.info("Success: Create review successful.");
            }
            tx.executeSql(sql, options, successCreateReview, errorHandler);

        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    },
    BADropTables: function(){

        function txFunction(tx){
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];

            function successDropType() {
                console.info("Success: type table dropped successfully");
            }
            tx.executeSql(sql, options, successDropType, errorHandler );

            sql = "DROP TABLE IF EXISTS review;";
            function successDropReview() {
                console.info("Success: review table dropped successfully")
            }
            tx.executeSql(sql, options, successDropReview, errorHandler );
        }

        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }

};