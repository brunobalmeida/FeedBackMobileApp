/** Local Database App - Using jQuery Mobile
 * File Name: BAglobal.js
 *
 * Revision History:
 *       Bruno Almeida, 2018-03-16 : Created
 *       Bruno Almeida, 2018-04-12 : Added functions to run the Db
 */


/**
 * Hide and show the div element based on the checkbox state
 */
function ratingDiv_collapse() {
    if($("#BAchkratings").is(":checked")){
        $("#BACollapsableDiv").show(1000);
    }
    else{
        $("#BACollapsableDiv").hide(1000);
    }
}

/**
 * Show the overall rating on the add page
 */
function show_overallRating() {
    calculateOverallRating();
}
/**
 * Show the overall rating on the modify page
 */
function show_overallRatingModify() {
    calculateOverallRatingModify();
}

/**
 * Hide and show the div element based on the checkbox state
 */
function ratingDivModify_collapse() {
    if($("#BAchkratingsModify").is(":checked")){
        $("#BACollapsableDivModify").show(1000);
    }
    else{
        $("#BACollapsableDivModify").hide(100);
    }
}

/**
 * Handle the save button click, calling the addFeedback function
 */
function BABtnSave_click() {
    BAaddFeedback();
}
/**
 * Handle the update button click, calling the updateFeedback function
 */
function BABtnUpdate_click() {
    BAupdateFeedback();
}
/**
 * Handle the save defaults button click, calling the addToLocalStorage function
 */
function BABtnSaveDefaults_click() {
    addToLocalStorage();
}

/**
 * Handle the Clear Database button, calling the Clear Database function
 */
function BABtnClearDb_click() {
    BAClearDatabase();
}

/**
 * Handle the Feedback Page Load
 */
function load_PageFeedBack() {
    BALoadFromLocalStorage();
    BAupdateTypesDropdown();
}

/**
 * Handle the Review list page load
 */
function load_ReviewList() {
    BAgetReviews();
}

/**
 * Handle the Edit feedback page load
 */
function load_ModifyEntry() {
    BAshowCurrentReview();
}

/**
 * Handle the Delete feedback button click
 */
function BABtnDelete_click() {
    BAdeleteFeedback();
}


/**
 * Initiate the handlers
 */
function init(){

    $("#BACollapsableDiv").hide(1000);
    $("#BACollapsableDivModify").hide(1000);
    $("#BAchkratings").on("change", ratingDiv_collapse);
    $("#BAchkratingsModify").on("change", ratingDivModify_collapse);
    $("#BACollapsableDiv input").on("change", show_overallRating);
    $("#BACollapsableDivModify input").on("change", show_overallRatingModify);
    
    $("#BABtnSave").on("click", BABtnSave_click);
    $("#BABtnUpdate").on("click", BABtnUpdate_click);
    $("#BABtnSaveDefaults").on("click", BABtnSaveDefaults_click);
    $("#BABtnClearDb").on("click", BABtnClearDb_click);
    $("#BAAddFeedbackPage").on("pageshow", load_PageFeedBack);
    $("#BAViewFeedbackPage").on("pageshow", load_ReviewList);
    $("#BAEditFeedbackPage").on("pageshow", load_ModifyEntry);
    $("#BABtnDelete").on("click", BABtnDelete_click);




}

/**
 * Function to initiate the Database
 */
function initDB(){
    try{
        DB.BACreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.BACreateTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

/**
 * Makes the function available after the document loads.
 * After it the function calls the method init and initDB
 */
$(document).ready(function () {
    initDB();
    init();

});


