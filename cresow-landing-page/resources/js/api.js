function loginApi(path,data) {
	$.ajax({
		type: 'POST',
		url: path,
		data: data,
		success: function(res){
			window.open('http://ico-uat.cresow.io?token='+res.access_token+'&rtoken='+res.refresh_token+'&timestart='+res.created_at, '_blank');
			$("#loginModal").modal('hide');
		},
		error: function(res) {
			console.log(res);
		}
	})

}
document.getElementById('errorsignup').innerHTML = ''
function signupApi(path,data) {
	$.ajax({
		type: 'POST',
		url: path,
		data: data,
		success: function(res){
			console.log(res)
			$("#successModal").modal('show');
			$("#signupModal").modal('hide');
		},
		error: function(res) {
			if(res.responseJSON.result == 'referral_id not exists!') {
				document.getElementById('errorsignup').innerHTML = 'Referral Id not exist'
			}
		}
	})
}
