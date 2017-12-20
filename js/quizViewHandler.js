$(document).ready(() => {
    $(".user-display").hide();
    $(".admin-display").hide();


    SDK.User.loadNav();
    const currentUser = SDK.User.currentUser();

    SDK.Quiz.loadQuizzes((err, data) => {
        let currentUser = JSON.parse(data);
        if (currentUser.type === 2) {
            $(".admin-display").show();
        } else if (currentUser.type === 1) {
            $(".user-display").show();
        }

    });

    SDK.Quiz.loadQuizzes((err, myQuizzes) => {
        console.log(err, quizzes);
        var quizzes = JSON.parse(myQuizzes);
        quizzes.forEach((course) =>  {
            $("#quizContainer").append('<button class="quizBtn btn-primary btn-lg" id='+quizzes.quizId+'>'+quizzes.quizTitle+'</button>');
            console.log(quizzes.quizId);
        });
        console.log(quizzes);

        $(".quizBtn").click(function () {
            console.log(this.id);
            const quizId = this.id;
            const myId = parseInt(quizId);
            console.log(myId);
            SDK.Storage.persist("myQuizId",myId);
            {
                SDK.User.loadCurrentUser((err, data) => {
                    let currentUser = JSON.parse(data);
                    if (currentUser.type === 2) {
                        window.location.href = "CoursesQuizUser.html";
                    } else if (currentUser.type === 1) {
                        window.location.href = "CoursesQuizAdmin.html";
                    }

                });
            }

        });

    });

});