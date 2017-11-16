$(document).ready(function() {
  let GoogleAuth;
  const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  handleClientLoad();

  function initClient() {
    console.log("hello");
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    gapi.client.init({
      'apiKey': 'VD-oCk7QeBcLcM-hHxYJAhrW',
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
        alert("test");
        //handleAuthActions();
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
    const isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      //console.log(user.getDisplayName());
    } else {

    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }
});
