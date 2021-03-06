$(document).ready(() => {

    SDK.User.loadNav();

    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "CoursesQuizAdmin.html";
    });

$("#setTitle-button").click(() => {
    console.log("title button clicked");
    const quizTitle = $("#quizTitle").val();
    const courseId = SDK.Storage.load("myCourseId");

    SDK.Quiz.createQuiz(quizTitle, courseId, (err, data) => {
        var newQuiz = JSON.parse(data);

        const quizId = newQuiz.quizId;

        SDK.Storage.persist("myQuizId",quizId);

        window.location.href="newQuestion.html"
    });


})
});