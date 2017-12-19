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
                SDK.Storage.persist("myQuestionId", newQuestion.questionId);

                console.log("clicked");
                const option1 = $("#option1").val();
                const questionId = SDK.Storage.load("myQuestionId");
                const optionToQuestionId = createQuestion.parse(data);
                //const isCorrect = $("#isCorrect").val();
                const correctOption = $("#correctOption").val();
                const wrongOption1 = $("#wrongOption1").val();
                const wrongOption2 = $("#wrongOption2").val();
                const wrongOption3 = $("#wrongOption3").val();

                if (!correctOption || !wrongOption1 || !wrongOption2 || !wrongOption3) {
                    alert("alle svar muligheder skal udfyldes")
                } else {
                    var isCorrect = 1;

                    SDK.Quiz.createOption(correctOption, optionToQuestionId, isCorrect, (err, data) => {

                        $("#correctOption").val("");

                        SDK.Quiz.createOption(wrongOption1, optionToQuestionId, isCorrect = 0, (err, data) => {
                            $("#wrongOption1").val("");

                            SDK.Quiz.createOption(wrongOption2, optionToQuestionId, isCorrect = 0, (err, data) => {
                                $("#wrongOption2").val("");

                                SDK.Quiz.createOption(wrongOption3, optionToQuestionId, isCorrect = 0, (err, data) => {
                                    $("#wrongOption3").val("");
                                });

                            });
                        });
                    });
                };
            });
        };
    });
});

