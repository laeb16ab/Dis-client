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

        SDK.Quiz.createQuestion(question, quizId, (err, data) => {
            var newQuestion = JSON.parse(data);
            SDK.Storage.persist("myQuestionId", newQuestion.questionId);

            $("#createOption-button").click(() => {
                console.log("clicked");
                const option = $("#option").val();
                const questionId = SDK.Storage.load("myQuestionId");
                const optionToQuestionId = createQuestion.parse(data);
                const isCorrect = $("#isCorrect").val();

                SDK.Quiz.createOption(option, optionToQuestionId, isCorrect, (err, data) => {

                    const questionId = this.id;
                    const myId = parseInt(questionId);
                    console.log(myId);
                    SDK.Storage.persist("myQuestionId", myId);
                    console.log(data);

                    //var createQuestion = JSON.parse(data);
                });

                window.location.href = "newQuestion.html"
            });

        });

        $("#addQuestion-button").click(() => {
            console.log("clicked");
            const question = $("#question").val();
            const quizId = SDK.Storage.persist("myQuizId");


            SDK.Quiz.question.createQuestion(question, quizId, (err, data) => {
                console.log("Virker det ?");

                const questionId = this.id;
                const myId = parseInt(questionId);
                console.log(myId);
                SDK.Storage.persist("myQuestion", myId);

                var createQuestion = JSON.parse(data);

                window.location.href = "newQuestion.html"


            });
        })

    });
});