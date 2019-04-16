//registration page
//doc.getelemets for all the userinput
/*var firstName = document.getElementsByName("fname").value;
var lastName = document.getElementsByName("lname").value;
var userName = document.getElementsByName("uname").value;
var email = document.getElementsByName("email").value;
var password = document.getElementsByName('psw').value;
var confirmPassword = document.getElementsByName("psw-repeat").value;

document.getElementsByName("RegSub").disabled =true;


function password8char()
{
	
	if (password.length >= 8)
	{
		return true;
	}

	else
	{
		return false;
	}
//make sure passwords is atleast 8 chars, return bool
}

function confirmPasswords()
{
	if (password == confirmPassword)
	{
		return true;
	}

	else
	{
		return false;
	}
}

function namesExist()
{
	if (firstName.length > 0 && lastName.length > 0)
	{
		return true;
	}

	else
	{
		return false;
	}
}

//function uniqueUser()
//{
////database check
//}


function enableButton()
{
	console.log(email);


	if (password8char() == true && confirmPasswords() == true && namesExist() == true)
	{
		document.getElementsByName("RegSub").disabled =false;
		console.log("Hello");
	}

}
//if all of the above are true, enable the button
*/

document.getElementsByName("RegSub").disabled =true;

function enableButton(){
	var firstName = document.forms["myForm"]["fname"].value;
	console.log(firstName);
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

}
