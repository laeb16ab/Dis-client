$(document).ready(() => {

    SDK.User.loadNav();
    const $quizList = $("#quizList");


    SDK.Quiz.loadQuizzes((err, myQuizzes) => {
        if (err) throw err;
        const quizzes = JSON.parse(myQuizzes);
        console.log(quizzes);

        $("#tablehead").append(`<thead>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th><button class=\"quizCreateBtn btn btn-success pull-left\">Create quiz</button></th>
        </thead>`);

        $("#quizList").append("<thead>\n" +
            "<th>Quiz Titel</th>\n" +
            "<th><button class=\"quizCreateBtn btn-primary btn-lg\" >Create quiz</button></th>\n" +
            "</thead>");

        $.each(quizzes, (i, val) => {
            $("#quizList").append(`
            <tr>
           <td width="80%">' + quizzes[i].quizTitle + '</td>';
           <td width="20%"><button class="quizDeleteBtn btn-primary btn-lg" data-key="' + (i+1) + '">Delete quiz</button></td>';
           </tr>
            
            `);

        });

        $(".quizCreateBtn").click(function () {
            console.log(this.id);
            window.location.href = "newQuiz.html";

        });



    });




});