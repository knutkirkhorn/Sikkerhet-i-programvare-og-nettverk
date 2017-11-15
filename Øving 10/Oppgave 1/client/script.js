$(document).ready(function() {
  const hostName = 'localhost';
  const path = '/';
  const options = {keySize: 512/32, iterations: 1024};
  let authBearer = '';
  let loggedInUser = '';

  if (localStorage.getItem('auth-bearer') !== null) {
    authBearer = localStorage.getItem('auth-bearer');
  }

  if (localStorage.getItem('logged-user') !== null) {
    const authBearerJSON = JSON.stringify({
      token: authBearer
    });

    $.ajax({
      url: '/auth',
      type: 'post',
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
        if (data !== 'Authenticated') {
          localStorage.removeItem('logged-user');
          localStorage.removeItem('auth-bearer');
        } else {
          loggedInUser = localStorage.getItem('logged-user');
          $('#top-right-container').css('visibility', 'inherit');
          $('#logged-in-user').text(loggedInUser);
          $('#authenticated-container').css('visibility', 'inherit');
          $('.register-container').css('visibility', 'hidden');
          $('.login-container').css('visibility', 'hidden');
        }
      },
      data: authBearerJSON
    });
  }

  $('#register-button').click(function() {
    const username = $('#username-register-input').val();
    const password = $('#password-register-input').val();
    const salt = hostName + path + username;
    const hash = CryptoJS.PBKDF2(password, salt, options).toString();
    const registerInformation = JSON.stringify({
      username: username,
      hash: hash
    });

    $(this).blocked = true;

    $.ajax({
      url: '/register',
      type: 'post',
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
        if (data === 'You are now registered! :)') {
          alert(data);
        }
        $(this).blocked = false;
      },
      data: registerInformation
    });
  });

  $('#login-button').click(function() {
    const username = $('#username-login-input').val();
    const password = $('#password-login-input').val();
    const salt = hostName + path + username;
    const hash = CryptoJS.PBKDF2(password, salt, options).toString();
    const loginInformation = JSON.stringify({
      username: username,
      hash: hash
    });

    $.ajax({
      url: '/login',
      type: 'post',
      contentType: 'application/json;charset=UTF-8',
      success: function(data, textStatus, request) {
        if (request.getResponseHeader('Authorization') !== null) {
          authBearer = request.getResponseHeader('Authorization').split(' ')[1];
          loggedInUser = username;
          localStorage.setItem('auth-bearer', authBearer);
          localStorage.setItem('logged-user', loggedInUser);

          $('#top-right-container').css('visibility', 'inherit');
          $('#logged-in-user').text(loggedInUser);
          $('#authenticated-container').css('visibility', 'inherit');
          $('.register-container').css('visibility', 'hidden');
          $('.login-container').css('visibility', 'hidden');
        } else {
          alert('Wrong username or password');
        }
      },
      data: loginInformation
    });
  });

  $('#sign-out-button').click(function() {
    const logOutInformation = JSON.stringify({
      token: authBearer
    });
    $.ajax({
      url: '/sign-out',
      type: 'post',
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
        console.log(data);
        localStorage.removeItem('auth-bearer');
        localStorage.removeItem('logged-user');
        location.reload();
      },
      data: logOutInformation
    });
  });

  $('#check-if-authenticated').click(function() {
    const authBearerJSON = JSON.stringify({
      token: authBearer
    });

    $.ajax({
      url: '/get-users',
      type: 'post',
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
        console.log(data);
        if (data !== 'Not Authenticated') {
          alert('User is authenticated');
          $('.all-users').html('Users: ');
          for (let i = 0; i < data.length; i++) {
            $('.all-users').append('<p>' + data[i].username + '</p>');
          }
        }
      },
      data: authBearerJSON
    });
  });
});
