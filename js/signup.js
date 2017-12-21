$(document).ready(() => {

    SDK.User.loadNav();

    $("#signup-button").click(() => {
        console.log("clicked");

        const newUsername = $("#newUsername").val();
        const newPassword = $("#newPassword").val();
        const passwordVerifier = $("#PasswordVerifier").val();

        if (!newUsername || !newPassword || !passwordVerifier) {
           alert("Information missing");
        }else {
            if (newPassword.valueOf() === passwordVerifier.valueOf()) {
                console.log(newUsername);
                console.log(newPassword);
                console.log(passwordVerifier);
                SDK.signUp(newUsername, newPassword, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("has-error");
                    }
                    else if (err) {
                        console.log("error")
                    } else {
                        window.alert("\t" + "Sign up successful");
                        window.location.href = "login.html"
                    }

                });

            } else {
                $(newPassword).val('');
                $(passwordVerifier).val('');
                alert("Password not identical");

            }
        }

        });
    $("#cancel-button").click(()=> {
        window.location.href=("index.html");
        console.log("clicked");
    });

    });
