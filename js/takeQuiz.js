$(document).ready(() => {
    $(".user-display").hide();
    $(".admin-display").hide();

    SDK.User.loadNav();
    const currentUser = SDK.User.currentUser();

    SDK.User.loadCurrentUser((err, data) => {
        let currentUser = JSON.parse(data);
        if (currentUser.type === 2) {
            $(".admin-display").show();
        } else if (currentUser.type === 1) {
            $(".user-display").show();
        }

    });
    SDK.Quiz.loadQuestion((err, MyQuestion) => {
        console.log(err, questions);
        var questions = JSON.parse(MyQuestion);
        questions.forEach((question) => {
            $("#takeQuizContainer").append('<button class="questionBtn btn-primary btn-lg" id=' + question.questionToQuizId + '>' + question.question + '</button>');
            console.log(question.questionToQuizId);
        });
        console.log(questions);

    });

});