/** Local Database App - Using jQuery Mobile
 * File Name: BAFeedbackDAL.js
 *
 * Revision History:
 *       Bruno Almeida, 2018-04-11 : Created
 */

/*
    This is the JS responsible for the CRUD operations
 */


var Review = {
    BAinsert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO review(businessName, typeId, reviewerEmail , reviewerComments, " +
                "reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    BAupdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=? , reviewerComments=?," +
                "reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3 =? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    BAdelete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    BAselect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    BAselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    BAselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};