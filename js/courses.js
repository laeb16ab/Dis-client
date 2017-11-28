$(document).ready(() => {

    SDK.User.loadNav();

    SDK.Course.loadCourses((err, myCourses) => {
        console.log(err, courses);
        var courses = JSON.parse(myCourses);
        courses.forEach((course) =>  {
            $("#courseContainer").append('<button class="btn btn-primary btn-lg" id='+course.courseId+'>'+course.courseTitle+'</button>');
            console.log(course.courseId);
        });
        console.log(courses);

        $(".btn").click(function () {
            console.log(this.id);
            const courseId = this.id;
            const myId = parseInt(courseId);
            console.log(myId);
            courses.forEach((course) => {
                if(myId === course.courseId) {
                    SDK.Quiz.loadQuizzes(courseId, (data, err) => {
                    });
                }
            });
        });
    });
});