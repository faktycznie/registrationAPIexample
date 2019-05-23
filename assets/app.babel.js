'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SomeClass =
/*#__PURE__*/
function () {
  function SomeClass(form) {
    _classCallCheck(this, SomeClass);

    this.form = form;
    this.msg = document.getElementById('msg');
    this.token = 'token';
    this.api = 'https://reqres.in/api/register'; //init submit event

    this.init();
  }

  _createClass(SomeClass, [{
    key: "init",
    value: function init() {
      var self = this;
      this.form.addEventListener("submit", function (e) {
        e.preventDefault();
        self.showMessage(''); //clear message box
        //just an example :)
        // const savedToken = self.checkToken();
        // if( savedToken ) {
        // 	return self.showMessage('Token is:' + savedToken);
        // }

        var email = document.getElementById("login").value;
        var pass = document.getElementById("password").value;
        var validateForm = self.validate(email, pass);

        if (true === validateForm) {
          var data = {
            'email': email,
            'password': pass
          };
          self.ajaxRequest(JSON.stringify(data));
        } else {
          self.showMessage(validateForm);
        }
      });
      return;
    }
  }, {
    key: "validate",
    value: function validate(login, pass) {
      var reEmail = /\S+@\S+\.\S+/; //simple check

      if (!reEmail.test(login)) {
        return 'Login should be a valid email address.';
      }

      var rePass = /[#@$%]/;

      if (rePass.test(pass)) {
        return 'Password should not contain: #, @, $ or %.';
      }

      if (pass.length < 6) {
        return 'Password should be at least 6 characters long.';
      } //login and pass are valid


      return true;
    }
  }, {
    key: "ajaxRequest",
    value: function ajaxRequest(data) {
      var self = this;
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", this.api, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(data);

      xhttp.onreadystatechange = function () {
        if (4 == this.readyState) {
          var response = JSON.parse(this.responseText);

          if (200 == this.status) {
            self.saveData(response);
          } else {
            self.showMessage(response.error);
          }
        }
      };

      return;
    }
  }, {
    key: "showMessage",
    value: function showMessage(text) {
      return this.msg.innerHTML = text;
    }
  }, {
    key: "saveData",
    value: function saveData(response) {
      localStorage.setItem(this.token, response.token);
      this.showMessage('Token saved.');
    }
  }, {
    key: "checkToken",
    value: function checkToken() {
      var savedToken = localStorage.getItem(this.token);

      if (null === savedToken) {
        return false;
      } else {
        return savedToken;
      }
    }
  }]);

  return SomeClass;
}();

document.addEventListener('DOMContentLoaded', function (event) {
  var form = document.getElementById('form');
  new SomeClass(form);
});