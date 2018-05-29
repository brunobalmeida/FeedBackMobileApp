/** Local Database App - Using jQuery Mobile
 * File Name: BAutil.js
 *
 * Revision History:
 *       Bruno Almeida, 2018-03-16 : Created
 */


/**
 * Function to calculate the overall rating on the Add page
 */
function calculateOverallRating() {
    var foodQuality = parseFloat($("#BAFoodQuality").val());
    var service = parseFloat($("#BAService").val());
    var value = parseFloat($("#BAValue").val());
    var overall = (foodQuality + service + value) / 3 ;

    $("#BARatings").val(overall);
}

/**
 * Function to calculate the overall rating on the Modify page
 */
function calculateOverallRatingModify() {
    var foodQuality = parseFloat($("#BAFoodQualityModify").val());
    var service = parseFloat($("#BAServiceModify").val());
    var value = parseFloat($("#BAValueModify").val());
    var overall = (foodQuality + service + value) / 3 ;

    $("#BARatingsModify").val(overall);
}

/**
 * Function to validate the Add Form
 * @returns {Form Valid}
 */
function doValidate_BAAddForm() {
    var form = $("#BAAddForm");
    form.validate({
        rules:{
            BABusName:{
                required: true,
                rangelength: [2, 20]
            },

            BAEmail:{
                required: true,
                emailcheck: true
            },
            BAReviewDate:{
                required: true
            },

            BAFoodQuality:{
                numberLengthCheck: true
            },
            BAService:{
                numberLengthCheck: true
            },
            BAValue:{
                numberLengthCheck: true
            }

        },
        messages:{
            BABusName:{
                required: "Business name cannot be empty",
                rangelength: "Business name should be 2-20 characters long."

            },
            BAEmail:{
                required: "Email field cannot be empty",
                emailcheck: "Email is not in a valid format."
            },
            BAReviewDate:{
                required: "The reviewer date is required"
            },

            BAFoodQuality:{
                numberLengthCheck: "Quality rating must be between 0 and 5"
            },
            BAService:{
                numberLengthCheck: "Service rating must be between 0 and 5"
            },
            BAValue:{
                numberLengthCheck: "Value rating must be between 0 and 5"
            }

        }
    });

    return form.valid();
}

/**
 * Function to validate the Modify Form
 * @returns {Form Valid}
 */
function doValidate_frmBAModifyForm() {
    var form = $("#BAModifyForm");
    form.validate({
        rules:{
            BABusNameModify:{
                required: true,
                rangelength: [2, 20]
            },

            BAEmailModify:{
                required: true,
                emailcheck: true
            },
            BAReviewDateModify:{
                required: true
            },

            BAFoodQualityModify:{
                numberLengthCheck: true
            },
            BAServiceModify:{
                numberLengthCheck: true
            },
            BAValueModify:{
                numberLengthCheck: true
            }

        },
        messages:{
            BABusNameModify:{
                required: "Business name cannot be empty",
                rangelength: "Business name should be 2-20 characters long."

            },
            BAEmailModify:{
                required: "Email field cannot be empty",
                emailcheck: "Email is not in a valid format."
            },
            BAReviewDateModify:{
                required: "The reviewer date is required"
            },

            BAFoodQualityModify:{
                numberLengthCheck: "Quality rating must be between 0 and 5"
            },
            BAServiceModify:{
                numberLengthCheck: "Service rating must be between 0 and 5"
            },
            BAValueModify:{
                numberLengthCheck: "Value rating must be between 0 and 5"
            }

        }
    });

    return form.valid();
}

/**
 * Add number lentgh check method to jQuery validator
 * It checks if the number length is between 0 and 5 and returns true of false.
 */
jQuery.validator.addMethod("numberLengthCheck",
    function (value) {
        var number = value;
        if(number >=0 && number <=5){
            return true;
        }
        else{
            return false;
        }
    },
    "Value must be between 0 and 5");


/**
 * Add email check method to jQuery validator
 */
jQuery.validator.addMethod("emailcheck",
    function(value, element){
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(element) || regex.test(value);
    },
    "Must be a valid email format: ex.: you@email.com");


/**
 * Add the variable to the local storage
 */
function addToLocalStorage(){
    var dataString = $("#BADefaultEmail").val();
    localStorage.setItem("BADefaultEmail", dataString );
    alert("Default reviewer email saved.")
}


/**
 * Function to load the Default Email from the local storage
  */
function BALoadFromLocalStorage() {
    $("#BAEmail").val(localStorage.getItem("BADefaultEmail"));
}