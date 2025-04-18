/*
 * Student Name: Alyssa Bishop
 * Student ID: 41173010
 * Course: CST8117 - Cross Plat Web Design
 * Semester: 1
 * Assignment: Online Store Part 4
 * Date Submitted:  march 25th 2025
 */
 
/* function to validate email 
 * Source: Geeks for Geeks - Javascript How to Validate Email Address using RegEx
 * Reference: https://www.geeksforgeeks.org/how-to-validate-email-address-using-regexp-in-javascript/
 */
console.log("Script loaded");
function toggleHamburger(){
	const navbar = document.getElementById('navbar');
	navbar.classList.toggle('active');
}
window.toggleHamburger = toggleHamburger;

function isValidEmail(email) {
const emailRegex =  /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;  //must start with a-z, after @ no numbers in domain, at least 2 char after . 
	return emailRegex.test(email);
} //tested function sucessfully with given console log


/* function date difference 
 * Source: MND Web Docs - Javascript Date()
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * Source: JavaScript: Calculate Age 
 * Reference: https://www.youtube.com/watch?v=B6mj2X6WDVI
 */
 
function isAgeOfMajority(birthYear, birthMonth, birthDay) {
    /* Validate parameters */
    if (typeof birthYear !== "number" || birthYear < 1920 || birthYear > 2010) {
        return false;
    }
    if (typeof birthMonth !== "number" || birthMonth < 1 || birthMonth > 12) {
        return false;
    }
    if (typeof birthDay !== "number" || birthDay < 1 || birthDay > 31) {
        return false;
    }

    const TODAY = new Date();

/* function: Concatenate parameters to format "M/D/YYYY" 
 * Source: Understanding Format Date in JavaScript
 * Reference: https://hyno.co/blog/format-javascript-date-as-yyyy-mm-dd-a-comprehensive-guide.html
 */
    var birthDate = new Date(`${birthMonth}/${birthDay}/${birthYear}`);

// Calculate date difference 
    var ageYear = TODAY.getFullYear() - birthDate.getFullYear();
    var ageMonth = TODAY.getMonth() - birthDate.getMonth();
    var ageDay = TODAY.getDate() - birthDate.getDate();

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        ageYear--;
    }

    return ageYear >= 18;
}


/*FORM VALIDATION*/
var events = [];

$(document).ready(function() {
    $("#contactForm").on("submit", function(event) {
    event.preventDefault(); 
	
	const name = $("#name").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const confirmEmail = $("#confirmEmail").val();
    const dob = $("#dob").val();
    const comments = $("#comments").val();
    const consent = $("#consent").is(":checked");
/* Source: phone RegEx
 * Reference: https://regexr.com/3aa8n
 */
$("#errorMessage").text("");
$("#message").text("");

if (name === "") {
    $("#errorMessage").text("Name is required.");
} else if (!/^[0-9]{10}$/.test(phone)) {
    $("#errorMessage").text("Phone number must be 10 digits e.g. 111 222 1234");
} else if (!isValidEmail(email)) {
    $("#errorMessage").text("Please enter a valid email address");
} else if (email !== confirmEmail) {
    $("#errorMessage").text("Emails do not match");
} else if (!dob) {
    $("#errorMessage").text("Please enter date of birth");
} else {
    const birthDate = new Date(dob);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();

if (!isAgeOfMajority(birthYear, birthMonth, birthDay)) {
    $("#errorMessage").text("You must be at least 18 years old to continue");
}}
if ($("#errorMessage").text() === "" && comments.length < 3) {
    $("#errorMessage").text("Comments must be at least 3 characters long");
} else if ($("#errorMessage").text() === "" && !consent) {
    $("#errorMessage").text("You must agree to the Terms & Conditions to continue");
}

// SUCCESS MESSAGE AND FORM CLEAR
if ($("#errorMessage").text() === "") {
    $("#message").text("Form submitted successfully!");
    $("#name").val("");
    $("#email").val("");
    $("#confirmEmail").val("");
    $("#dob").val("");
    $("#comments").val("");
	$("#consent").prop("checked", false);
}
});
});
	


