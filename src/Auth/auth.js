import auth0 from 'auth0-js';

import history from './history';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'tuckermillerdev.auth0.com',
    clientID: 'Otg8g3tLLbeDgj8KsXhyyuzQgYR006Bq',
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : `${process.env.REACT_APP_FRONTEND_URL}/callback`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/Home');
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if(profile){
        localStorage.setItem('profile', JSON.stringify(profile))
        if(profile.sub){
          localStorage.setItem('email', profile.email)
          localStorage.setItem('authId', profile.sub)
          var url = ""
          if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
              url = `http://localhost:3001/users/add?id=${profile.sub}&name=${profile.name}`;
          } else {
              url = `https://bowling-stats-server.herokuapp.com/users/add?id=${profile.sub}&name=${profile.name}`;
          }
          fetch(url).then(() => {
            window.location.href = '/home';
          })
        }
      }
    })
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    localStorage.removeItem('email');
    localStorage.removeItem('authId');
    window.location.href = '/home';
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
