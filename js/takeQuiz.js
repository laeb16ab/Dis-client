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

    SDK.Quiz.loadQuestion((err, MyQuizzes)=> {
        console.log(err, quizzes);
        var quizzes = JSON.parse(MyQuizzes);

        if (err && err.xhr.status === 401) {
            $(".form-group").addClass("has-error");
        }else if (err) {
            console.log("BAd stuff happened")
        } else {
            var SelectedQuestionTitle = JSON.parse(data);

            i = 0;
            while (i < SelectedQuestionTitle.length) {
                var questionTitle = SelectedQuestionTitle[i].question;
                var questionId = SelectedQuestionTitle[i].quizId;
                console.log(data);
                /** loadChoices(questionTitle);
                 function loadChoices(questionTitle) {
                SDK.Quiz.loadChoices(questionId, (err, data) => {
                    $(".table").append(`<p><b>${questionTitle}</b></p>`);
                    var choices = JSON.parse(data);
                    var choicesLength = choices.length;
                    for (var k = 0; k < choicesLength; k++) {
                        $(".table").append(`<p><input type="radio" name="choice${questionId}" value="${choices.answer}">  ${choices[k].choiceTitle} </p>`);
                    }
                    console.log(questionId);
                });
                i++;
            }
                 **/

            }
        }


    });
});