$(document).ready(function(){

	$("#videoclick").on('click', function(){
		$("#videoModal").modal({
			backdrop: 'static',
			keyboard: false
		})
	})
	$('.close-video').on('click', function() {
		$('#videoCresow')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$("#videoModal").modal('hide');
	});

	var datalogin = {'username':'', 'password':'', 'scope':'user','grant_type':'password'};
	var datasignup = {'first_name':'','last_name':'', 'referral_id': '','postal_code':'','':'','contact_no':'','email':'','password':'', 'referral_id':'','is_default_password':false}

	$("#loginbutton").on('click', function(){
		$("#loginModal").modal({
			backdrop: 'static',
			keyboard: false
		})
	})

	$("#signupbutton").on('click', function(){
		$("#signupModal").modal({
			backdrop: 'static',
			keyboard: false
		})
	})

	$("#newuser").on('click', function(){
		$("#loginModal").modal('hide');
		$("#signupModal").modal('show');
	})

	$("#haveaccount").on('click', function(){
		$("#signupModal").modal('hide');
		$("#loginModal").modal('show');
	})

	$("#loginsubmit").on('click', function(){
		var path = 'http://18.136.101.29/api/oauth/token';
		datalogin.username = $("#log-email").val();
		datalogin.password = $("#log-password").val()

		if(validateLogin(datalogin)) {
			loginApi(path,datalogin)
		}

	})

	$("#signupsubmit").on('click', function(){
		var path = 'http://18.136.101.29/api/users';
		datasignup.first_name = $("#sign-fname").val();
		datasignup.last_name = $("#sign-lname").val();
		datasignup.referral_id = $("#sign-refname").val();
		datasignup.postal_code = $("#sign-city").val();
		datasignup.address = $("#sign-country").val();
		datasignup.contact_no = $("#sign-phone").val();
		datasignup.email = $("#sign-email").val();
		datasignup.password = $("#sign-password").val();

		if(validateSignup(datasignup)) {
			signupApi(path,datasignup)
		}
	})

})
