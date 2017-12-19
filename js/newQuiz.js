$(document).ready(() => {

    SDK.User.loadNav();

    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "index.html";
    });

$("#setTitle-button").click(() => {
    console.log("title button clicked");
    const quizTitle = $("#quizTitle").val();
    const courseId = SDK.Storage.load("myCourseId");

    SDK.Quiz.createQuiz(quizTitle, courseId, (err, data) => {

        const quizId = this.id;
        const myId = parseInt(quizId);
        console.log(myId);
        SDK.Storage.persist("myQuizId",myId);

        var createQuiz = JSON.parse(data);

        window.location.href="newQuestion.html"
    });


})
});