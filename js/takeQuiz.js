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
    SDK.Quiz.loadQuestion((err, data) => {
        if (err) throw err;
        const questions = JSON.parse(data);
        console.log(questions);


        $("#quizTablehead").append("<thead>\n" +
            "<th> Titel</th>\n" +

            "</thead>");

        $.each(questions, function (i, val) {
            var tr = '<tr>';
            tr += '<td width="80%">' + questions[i].question + '</td>';
            tr += '<td width="20%"><button class="takeQuizBtn btn-primary btn-lg" data-key="' + (i+1) + '">Take quiz</button></td>';
            tr += '</tr>';
            i + 1;
            $("#questionList").append(tr);
        });
        $(".takeQuizBtn").click(function () {
            console.log(this.id);
            window.location.href = "takeQuiz.html";

        });
    });

});