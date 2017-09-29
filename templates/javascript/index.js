$(document).ready(() => {
    $("#loginlink").click(() => {
        $("#signupform").hide();
        $("#loginform").show();
    });
    $("#signUp").hover(() => {
        this.addClass('animated infinite bounce');
    });
    $("#signuplink").click(() => {
        $("#loginform").hide();
        $("#signupform").show();
    });
    $("#add-button").click(() => {
        $("#recipe-main-body").hide();
        $("#add-recipe-form").show();
    });
    $("#cancel").click(() => {
        $("#add-recipe-form").hide();
        $("#recipe-main-body").show();
    });
});