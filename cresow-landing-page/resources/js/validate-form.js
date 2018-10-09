function validateLogin(data) {

	if(isEmail(data.username) && data.password != '') {
		return true
	}
	return false
	
}

function validateSignup(data) {
	if(isEmail(data.email) && data.first_name != '' && data.last_name != '' && data.password != '') {
		return true
	}
	return false
}