$(document).ready(() => {

    SDK.User.loadNav();


    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "CoursesQuizAdmin.html";
    });

    $("#createQuestion-button").click(() => {
        console.log("clicked");
        const question = $("#question").val();
        const quizId = SDK.Storage.load("myQuizId");

        if (!question) {
            alert("Du har ikke indtastet noget");
        }
        else {
            SDK.Quiz.createQuestion(question, quizId, (err, data) => {
                var newQuestion = JSON.parse(data);
                console.log(newQuestion.questionId);
                console.log("clicked");
                const optionToQuestionId = newQuestion.questionId;
                const correctOption = $("#option1").val();
                const wrongOption1 = $("#option2").val();
                const wrongOption2 = $("#option3").val();
                const wrongOption3 = $("#option4").val();

                if (!correctOption || !wrongOption1 || !wrongOption2 || !wrongOption3) {
                    alert("alle svar muligheder skal udfyldes")
                } else {
                    var isCorrect = 1;

                    SDK.Quiz.createOption(correctOption, optionToQuestionId, isCorrect, (err, data) => {
                        $("#option1").val("");

                        var isCorrect = 0;
                        SDK.Quiz.createOption(wrongOption1, optionToQuestionId, isCorrect, (err, data) => {
                            $("#option2").val("");

                            SDK.Quiz.createOption(wrongOption2, optionToQuestionId, isCorrect, (err, data) => {
                                $("#option3").val("");

                                SDK.Quiz.createOption(wrongOption3, optionToQuestionId, isCorrect, (err, data) => {
                                    $("#option4").val("");
                                });

                            });
                        });
                    });
                }
            });
        }
    });
    $("#make-button").click (() => {
        console.log("clicked");
        window.location.href = "CoursesQuizAdmin.html";
    });
});

