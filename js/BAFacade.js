/** Local Database App - Using jQuery Mobile
 * File Name: BAFacade.js
 *
 * Revision History:
 *       Bruno Almeida, 2018-03-18 : Created
 *       Bruno Almeida, 2018-04-11 : Modified to add Db iterations
 */


/**
 * It adds the feedback to the database after validating the form.
 */
function BAaddFeedback() {
    if ( doValidate_BAAddForm()) {

        var options=[];

        var businessName = $("#BABusName").val();
        var typeId = $("#BAComboType").val();
        var reviewerEmail = $("#BAEmail").val();
        var reviewerComments = $("#BAComments").val();
        var reviewDate = $("#BAReviewDate").val();
        var hasRating = $("#BAchkratings").prop("checked");
        var rating1 = $("#BAFoodQuality").val();
        var rating2 =$("#BAService").val();
        var rating3 = $("#BAValue").val();

        if (hasRating) {
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];
        }
        else {
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, "","","" ];
        }

        function callback() {
            alert("Success: Record inserted successfully");
        }

        Review.BAinsert(options, callback);
    }
    else {
        alert("Form is not valid");
    }
}

/**
 * It updates the feedback on the database after validating the form.
 */
function BAupdateFeedback() {
    if (doValidate_frmBAModifyForm) {

        var id = localStorage.getItem("id");
        var typeId = '';
        var businessName = $("#BABusNameModify").val();
        var reviewerEmail = $("#BAEmailModify").val();
        var reviewerComments = $("#BACommentsModify").val();
        var reviewDate = $("#BAReviewDateModify").val();
        var hasRating = $("#BAchkratingsModify").prop("checked");
        var rating1 = $("#BAFoodQualityModify").val();
        var rating2 =$("#BAServiceModify").val();
        var rating3 = $("#BAValueModify").val();

        if ($("#BAComboTypeModify").val() == "Canadian") {
            typeId = 1;
        }
        else if ($("#BAComboTypeModify").val() == "Asian") {
            typeId = 2;
        }
        else if ($("#BAComboTypeModify").val() == "Others") {
            typeId = 3;
        }

        //very important
        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];

        function callback() {
            alert("Success: Record updated successfully");
        }

        Review.BAupdate(options, callback);
        $(location).prop('href', '#BAViewFeedbackPage');
    }
    else{
        alert("Form is not valid");
    }

}

/**
 * Clear the database - droping the tables
 */
function BAClearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.BADropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}

/**
 * Fetch the information from type table and populate the options in the HTML ComboBox
 */
function BAupdateTypesDropdown() {
    var options = [];
    function callback(tx, results) {
        var htmlCode = "";
        var name = "";
        var id = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            name = row['name'];
            id = row['id'];
            if (name == "Others") {
                htmlCode += "<option value='" + id +"' selected>"+name+"</option>";
            } else {
                htmlCode += "<option value='" + id +"'>"+name+"</option>";
            }
        }

        $("#BAComboType").html(htmlCode);
        $("#BAComboType").selectmenu("refresh");
    }

    Type.BAselectAll(options, callback);
}

/**
 * Fetch the reviews info from Db and send the data to the Feed back list
 */
function BAgetReviews() {

    var options = [];

    function callback(tx, results) {

        var htmlCode = "";
        var hasRating = "";
        var overAllRatings = "";
        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            hasRating = row['hasRating'];
            overAllRatings = "";
            if (hasRating == "true") {
                var rating1 = parseFloat(row['rating1']);
                var rating2 = parseFloat(row['rating2']);
                var rating3 = parseFloat(row['rating3']);
                overAllRatings = (rating1 + rating2 + rating3) / 3;

                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>Business name: " + row['businessName'] + "</h1>" +
                    "<h2>Reviewer Email: " + row['reviewerEmail'] + "</h2>" +
                    "<h3>Comments: " + row['reviewerComments'] + "</h3>" +
                    "<h3>OverAll ratings: " + overAllRatings + "</h3>" +
                    "</a></li>";
            }
            else {
                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>Business name: " + row['businessName'] + "</h1>" +
                    "<h2>Reviewer Email: " + row['reviewerEmail'] + "</h2>" +
                    "<h3>Comments: " + row['reviewerComments'] + "</h3>" +
                    "</a></li>";
            }
        }

        var list = $("#BAFeedbackList");

        list = list.html(htmlCode);
        list.listview("refresh");
        //attach event handler for each list items
        $("#BAFeedbackList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#BAEditFeedbackPage');

        }
    }
    Review.BAselectAll(options, callback);
}


/**
 * Fetch a single record from Db
 */
function BAshowCurrentReview() {

    var id = localStorage.getItem("id");

    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        var type = row['typeId'];
        var hasRating = row['hasRating'];

        $("#BABusNameModify").val(row['businessName']);
        if (type == "1") {
            $("#BAComboTypeModify").val("Canadian");
        }
        else if (type == "2") {
            $("#BAComboTypeModify").val("Asian");
        }
        else if (type == "3") {
            $("#BAComboTypeModify").val("Others");
        }
        $("#BAEmailModify").val(row['reviewerEmail']);
        $("#BACommentsModify").val(row['reviewerComments']);
        $("#BAReviewDateModify").val(row['reviewDate']);

        if (hasRating == 'true') {
            $("#BAchkratingsModify").prop("checked" , true);
            $("#BAFoodQualityModify").val(row['rating1']);
            $("#BAServiceModify").val(row['rating2']);
            $("#BAValueModify").val(row['rating3']);
            calculateOverallRatingModify();
        }
        if(hasRating == 'false') {
            $("#BAchkratingsModify").prop("checked" , false);
        }


        $("#BAComboTypeModify").selectmenu("refresh");
        $("#BAchkratingsModify").checkboxradio("refresh");
        ratingDivModify_collapse();
    }

    Review.BAselect(options, callback);
}

/**
 * Delete a single record from Db
 */
function BAdeleteFeedback() {

     var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        alert("Success: Record deleted successfully");
        $(location).prop('href', '#BAViewFeedbackPage');
    }

    Review.BAdelete(options, callback);
}
