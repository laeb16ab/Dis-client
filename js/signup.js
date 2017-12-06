$(document).ready(() => {

    SDK.User.loadNav();

    $("#signup-button").click(() => {
        console.log("clicked");

        const newUsername = $("#newUsername").val();
        const newPassword = $("#newPassword").val();
        const passwordVerifier = $("#PasswordVerifier").val();

        if (!newUsername || !newPassword || !passwordVerifier) {
           //document.getElementById("emptyError").innerHTML = "Information missing";
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
                        window.location.href = "index.html";
                    }
                });

            } else {
                $(newPassword).val('');
                $(passwordVerifier).val('');
                //  document.getElementById("empty error").innerHTML = "Password doens't match";

            }
        }

        });
    $("#cancel-button").click(()=> {
        console.log("clicked");

        window.location.href = "index.html";
    })

    });
