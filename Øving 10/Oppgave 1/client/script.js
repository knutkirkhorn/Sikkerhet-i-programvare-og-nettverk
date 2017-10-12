$(document).ready(function() {

  const hostName = "localhost";
  const path = "/";
  const options = {keySize: 512/32, iterations: 1024};

  $("#register-button").click(function() {
    const username = $("#username-register-input").val();
    const password = $("#password-register-input").val();
    const salt = hostName + path + username;
    const hash = CryptoJS.PBKDF2(password, salt, options).toString();
    const registerInformation = JSON.stringify({
      username: username,
      hash: hash
    });

    $(this).blocked = true;

    $.ajax({
      url: "/register",
      type: "post",
      beforeSend: function(request) {
        //TODO: get localstorage??
        request.setRequestHeader("Authorization", "bearer yeaaa");
      },
      contentType: "application/json;charset=UTF-8",
      success: function(data) {
        //TODO: set localstorage
        console.log(data);
        $(this).blocked = false;
      },
      data: registerInformation
    });
  });

  $("#login-button").click(function() {
    const username = $("#username-login-input").val();
    const password = $("#password-login-input").val();
    const salt = hostName + path + username;
    const hash = CryptoJS.PBKDF2(password, salt, options).toString();
    const loginInformation = JSON.stringify({
      username: username,
      hash: hash
    });

    $.ajax({
      url: "/login",
      type: "post",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "bearer yeaaa");
      },
      contentType: "application/json;charset=UTF-8",
      success: function(data) {
        console.log(data);
        //window.localStorage.setItem("yee", "yee");
        //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
      },
      data: loginInformation
    });
  });
});
