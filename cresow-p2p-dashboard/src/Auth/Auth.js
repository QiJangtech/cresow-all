import history from '../history';
import auth0 from 'auth0-js';
import { Auth0LockPasswordless } from 'auth0-lock';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  userProfile;


  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  passwordlessSendEmailCode(email) {
    this.auth0.passwordlessStart({
      connection: 'email',
      send: 'code',
      email: email
    }, function (err,res) {
      // handle errors or continue
    });
  }

  passwordlessVerifyEmailCode(email, verificationCode) {
    this.auth0.passwordlessLogin({
      connection: 'email',
      email: email,
      verificationCode: verificationCode
    }, function (err,res) {
      // handle errors or continue
    });
  }

  passwordlessSendSmsCode(phone_number) {
    this.auth0.passwordlessStart({
      connection: 'sms',
      send: 'code',
      phone_number: phone_number
    }, function (err,res) {
      // handle errors or continue
    });
  }

  loginEmailCode(){
    this.lock = new Auth0LockPasswordless(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, {
      allowedConnections: ['email'],
      // autoclose: true,
      rememberLastLogin: false,
      languageDictionary: {
        passwordlessEmailInstructions: 'Enter your email to sign in<br/>or click <a href="#">here</a> to sign in with phone number',
        title: "Cresow",
        welcome: "Welcome {name}!"
      },
      auth: {
        redirectUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,   
        responseType: 'token id_token',
        params: {
          scope: 'openid profile email'               
        }          
      }
    })

    this.lock.show();
  }

  loginSms(){
    this.lock = new Auth0LockPasswordless(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, {
      allowedConnections: ['sms'],
      // autoclose: true,
      rememberLastLogin: false,
      auth: {
        redirectUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,   
        responseType: 'token id_token',
        params: {
          scope: 'openid profile email'               
        }          
      }
    })

    this.lock.show();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}