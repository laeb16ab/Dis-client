$(document).ready(() => {

    SDK.User.loadNav();

        $("#addQuestion-button").click(() => {
            $(".add-quiz").show();
        console.log("clicked");
            $("#questionsContainer").append(
                "<br>Question</label><br>" +
                "<input type='text'class='form-control' name='question' placeholder='question title'>"+
                "<br>Answers</br>"+
                "<input type='text' class='form-control' name='question1' trueQuestion='true' placeholder='correct answer'>" +
                "<input type='text' class='form-control' name='question2'>" +
                "<input type='text' class='form-control' name='question3'>" +
                "<input type='text' class='form-control' name='question4'><br>"
            )
    });
        $("#cancel-button").click(() => {
        console.log("clicked");
            window.location.href = "index.html";
    });
    $("#setTitle-button").click(() => {
        console.log("title button clicked")
       const quizTitle = $("#quizTitle").val();
       const courseId = 2;

        SDK.Quiz.createQuiz(quizTitle, courseId, (err, data) => {

        });
        //$("#")
    });

});