//registration page
//doc.getelemets for all the userinput

var firstName = document.getElementsByName("fname").value;
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
