var readyToLogIn = false;

//FOR REGISTRATION PAGE
document.getElementsByName("RegSub").disabled =true;

function enableButton(){
	var firstName = document.forms["myForm"]["fname"].value;
	var lastName = document.forms["myForm"]["lname"].value;
	var userName = document.forms["myForm"]["uname"].value;
	var email = document.forms["myForm"]["email"].value;
	var password = document.forms["myForm"]["psw"].value;
	var confirmPassword = document.forms["myForm"]["psw-repeat"].value;

	if (firstName == "") {
    	alert("First Name must be filled out");
    	return false;
    }
    if (lastName == "") {
    	alert("Last Name must be filled out");
    	return false;
    }
    if (userName == "") {
    	alert("Username must be filled out");
    	return false;
    }
    if (email == "") {
    	alert("Email must be filled out");
    	return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) == false)
    {
    	alert("Invalid Email");
    	return false;
    }

    if (password == "") {
    	alert("Password must be filled out");
    	return false;
    }
    if (confirmPassword == "") {
    	alert("Confirm Password must be filled out");
    	return false;
    }
    if (password.length < 8)
	{
		alert("Password Length must be 8 or greater")
		return false;
	}
	if (password != confirmPassword)
	{
		alert("Passwords do not match! Please re-enter.")
		return false;
	}

    document.getElementsByName("RegSub").disabled =false;
    readyToLogIn = true; //will check when going to chat roon

}


//FOR LOGGING IN CHECK

/*
document.getElementsByName("login").disabled =true;

function checkUserPass(){
	var uName = document.getElementsByName("uName2").value;
	var password = document.getElementsByName("psw2").value;

	if (uName.length == 0){
		alert("Username cannot be empty");
		return false;
	}

	if (pWord.length == 0){
		alert("Password cannot be empty");
		return false;
	}


	document.getElementsByName("login").disabled =false;
	readyToLogIn = true;
}
*/
