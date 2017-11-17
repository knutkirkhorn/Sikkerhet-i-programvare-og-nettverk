//sites to check:
// * https://console.developers.google.com/apis/credentials?project=asdtesta-169520
// * https://developers.google.com/identity/protocols/OAuth2UserAgent#example
// * https://www.google.no/search?dcr=0&ei=JsANWo_4O8jJ6AS0-pO4CQ&q=oauth+google+example+client+side&oq=oauth+google+example+client+side&gs_l=psy-ab.3...64697.66701.0.67126.12.12.0.0.0.0.128.1080.1j9.10.0....0...1.1.64.psy-ab..2.9.955...0i22i30k1j33i22i29i30k1j33i21k1.0.NBFx4atJu0k
$(document).ready(function() {
  let GoogleAuth;
  const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  //const SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  handleClientLoad();

  function initClient() {
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    gapi.client.init({
      'apiKey': 'AIzaSyBWrgnkm-MthtW_BHJESICgDFT-CvoEL-Y',
      'discoveryDocs': [discoveryUrl],
      'clientId': '964563006626-f45oa1v8vigge5gvsuucd4633l1s9huk.apps.googleusercontent.com',
      'scope': SCOPE
    }).then(function() {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
      const user = GoogleAuth.currentUser.get();
      setSigninStatus();

      $("#oauth-connect-button").click(function() {
        handleClientLoad();
        handleAuthActions();
        alert("test");
      });

      // $("#revoke-button").click(function() {
      //
      // });
    });
  }

  function handleAuthActions() {
    if (GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signOut();
    } else {
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  function setSigninStatus() {
    const user = GoogleAuth.currentUser.get();
    console.log(user);
    const isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      const name = user.w3.ig;
      const email = user.w3.U3;
      $("#oauth-connect-button").text("Sign out");
      $("#status-text").text("You are authorized with: " + name + " (" + email + ")");
    } else {
      $("#oauth-connect-button").text("Sign in/authorize");
      $("#status-text").text("You are not authorized");
    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }
});
