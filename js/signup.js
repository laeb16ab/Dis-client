$(document).ready(() => {

    SDK.User.loadNav();

    $("#signup-button").click(() => {
        console.log("clicked");

        const newUsername = $("#newUsername").val();
        const newPassword = $("#newPassword").val();
        const passwordVerifier = $("#passwordVerifier").val();

        if (!newUsername|| !newPassword || !passwordVerifier) {
            document.getElementById("emptyError").innerHTML = "Information missing";
        }else {
            if (password.valueOf() === passwordVerifier.valueOf()) {
                SDK.signup(username, password, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("has-error");
                    }
                    else if (err) {
                        console.log("error")
                    } else {
                        window.location.href = "my-page.html";
                    }
                });

            } else {
                $("#inputPassword").val('');
                $("#passwordVerifier").val('');
                document.getElementById("empty error").innerHTML = "Password doens't match";

            }
        }

        });

    });
