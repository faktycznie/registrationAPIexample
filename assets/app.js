'use strict';

class SomeClass {

	constructor( form ) {
		this.form = form;
		this.msg = document.getElementById('msg');
		this.token = 'token';
		this.api = 'https://reqres.in/api/register';

		//init submit event
		this.init();
	}

	init() {
		const self = this;

		this.form.addEventListener("submit", function(e){
			e.preventDefault();

			self.showMessage(''); //clear message box

			//just an example :)
			// const savedToken = self.checkToken();
			// if( savedToken ) {
			// 	return self.showMessage('Token is:' + savedToken);
			// }

			const email = document.getElementById("login").value;
			const pass = document.getElementById("password").value;

			const validateForm = self.validate(email, pass);

			if( true === validateForm ) {
				let data = {
					'email': email,
					'password': pass
				}
				self.ajaxRequest( JSON.stringify(data) );
			} else {
				self.showMessage( validateForm );
			}

		});

		return;
	}

	validate(login, pass) {

		const reEmail = /\S+@\S+\.\S+/; //simple check
		if( ! reEmail.test(login) ) {
			return 'Login should be a valid email address.';
		}

		const rePass = /[#@$%]/;
		if( rePass.test(pass) ) {
			return 'Password should not contain: #, @, $ or %.';
		}

		if( pass.length < 6 ) {
			return 'Password should be at least 6 characters long.';
		}

		//login and pass are valid
		return true;
	}

	ajaxRequest( data ) {

		const self = this;
		let xhttp = new XMLHttpRequest();
		
		xhttp.open("POST", this.api, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send( data );

		xhttp.onreadystatechange = function() {
			if (4 == this.readyState) {

				const response = JSON.parse(this.responseText);
				if(200 == this.status) {
					self.saveData( response );
				} else {
					self.showMessage(response.error);
				}
			}
		}

		return;
	}

	showMessage( text ) {
		return this.msg.innerHTML = text;
	}

	saveData( response ) {
		localStorage.setItem(this.token, response.token);
		this.showMessage('Token saved.');
	}

	checkToken() {
		const savedToken = localStorage.getItem(this.token);
		if( null === savedToken ) {
			return false;
		} else {
			return savedToken;
		}
	}

}

document.addEventListener('DOMContentLoaded', function(event) {
	const form = document.getElementById( 'form' );
	new SomeClass( form );
})

