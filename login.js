//----------Silder Button------------------------
var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var slide = document.getElementById("btn");

if (localStorage.getItem('users') === null || localStorage.getItem('users') === '[]') {
    let admin = new User('admin', '123456');
    let users = [admin];
    localStorage.setItem('users', JSON.stringify(users));
}

function signupSlider() {
    loginForm.style.left = "-600px";
    signupForm.style.left = '75px';
    slide.style.left = "155px";
    $('.error-alert').text("");
}

function loginSlider() {
    loginForm.style.left = "75px";
    signupForm.style.left = '675px';
    slide.style.left = "-5px";
    $('.error-alert').text("");
}

//-------- SignUp & LogIn Button --------------
function signUp() {
    let signupUsername = document.getElementById('signupUsername').value;
    let signupPassword = document.getElementById('signupPassword').value;

    if (signupUsername.length === 0 || signupPassword.length === 0) {
        $('#signupUsername').addClass("error-alert-border");
        $('.signup-alert').css('color', 'rgb(223, 106, 106)');
        $('.signup-alert').text(`User name and password must be provided!`);
    }
    else if (signupPassword.length < 6) {
        $('#signupPassword').addClass("error-alert-border");
        $('.signup-alert').css('color', 'rgb(223, 106, 106)');
        $('.signup-alert').text(`Password must contains at least 6 characters`);
    }
    else if (!isValidUsername(signupUsername)) {
        $('#signupUsername').addClass("error-alert-border");
        $('.signup-alert').css('color', 'rgb(223, 106, 106)');
        $('.signup-alert').text(`User name must contain only characters, numeric digits and/or underscore!`);
    }
    else {
        let usersJSON = JSON.parse(localStorage.getItem('users'));
        let existedUser = usersJSON.find((user) => {
            return user.userName === signupUsername;
        })
        if (existedUser) {
            $('#signupUsername').addClass("error-alert-border");
            $('.signup-alert').css('color', 'rgb(223, 106, 106)');
            $('.signup-alert').text(`User name "${signupUsername}" already exists!`);
        }
        else{
            let user = new User(signupUsername, signupPassword);
            usersJSON.push(JSON.parse(JSON.stringify(user)))
            localStorage.setItem('users', JSON.stringify(usersJSON));
            $('#loginUsername').val(`${signupUsername}`);
            $('#loginPassword').focus();
            setTimeout(() => loginSlider(), 1000)
            $('.signup-alert').css('color', 'green');
            $('.signup-alert').text("Sign up successfully!");
        }    
    };
};

function logIn() {
    let loginUsername = document.getElementById('loginUsername').value;
    let loginPassword = document.getElementById('loginPassword').value;

    if (loginUsername.length === 0 || loginPassword.length === 0) {
        $('.login-alert').text(`User name or password is missing!`);
        $('.login-alert').css('color', 'rgb(223, 106, 106)');
    }
    else {
        let usersJSON = JSON.parse(localStorage.getItem('users'));
        let userJSON = usersJSON.find((user) => {
            return user.userName === loginUsername;
        })
        if (!userJSON) {
            $('#loginUsername').addClass("error-alert-border");
            $('.login-alert').css('color', 'rgb(223, 106, 106)');
            $('.login-alert').text(`User name "${loginUsername}" not existed!`);
        } else {
            if (loginUsername === userJSON.userName && loginPassword === userJSON.password) {
                localStorage.setItem('currentUser', JSON.stringify(userJSON));
                window.location = "main.html";
            } else {
                $('#loginPassword').addClass("error-alert-border");
                $('.login-alert').css('color', 'rgb(223, 106, 106)');
                $('.login-alert').text(`Incorrect password!`);
            };
        }
    }
};

//----------------------------------------------------------------------
function isValidUsername(name) {
    const VALID_NAME_REGEX = /^[\w]+$/;
    return name.match(VALID_NAME_REGEX);
}

$('#signupUsername').keyup(function (e) {
    let signupUsername = document.getElementById('signupUsername').value;
    let signupPassword = document.getElementById('signupPassword').value;
    if (!isValidUsername(signupUsername)) {
        $('#signupUsername').addClass("error-alert-border");
        $('.signup-alert').css('color', 'rgb(223, 106, 106)');
        $('.signup-alert').text(`User name must contain only characters, numeric digits and/or underscore!`);
    }
    else {
        if (signupPassword.length > 0) $('#signupPasswordname').removeClass("error-alert-border");
        $('#signupUsername').removeClass("error-alert-border");
        $('.signup-alert').text("");
        if (e.key === "Enter") signUp();
    }
})

$('#signupPassword').keyup(function (e) {
    let signupUsername = document.getElementById('signupUsername').value;
    let signupPassword = document.getElementById('signupPassword').value;
    if (signupPassword.length >= 6) {
        if (signupUsername.length > 0) $('#signupUsername').removeClass("error-alert-border");
        $('#signupPassword').removeClass("error-alert-border");
        $('.signup-alert').text("");
        if (e.key === "Enter") signUp();
    }
})

$('#loginUsername, #loginPassword').keyup(function(e){
    if (e.key === "Enter") logIn();
})

$('.toggle-btn').click(function () {
    $('#signupUsername').removeClass("error-alert-border");
    $('.signup-alert').text("");
    $('#signupPassword').removeClass("error-alert-border");
    $('.signup-alert').text("");
    $('#signupUsername').val('');
    $('#signupPassword').val('');
    $('#loginUsername').removeClass("error-alert-border");
    $('.login-alert').text("");
    $('#loginPassword').removeClass("error-alert-border");
    $('.login-alert').text("");
    $('#loginUsername').val('');
    $('#loginPassword').val('');
})