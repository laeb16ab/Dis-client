const SDK = {
    //SDK = software Development kit
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
    Quiz: {create: (quizTitle, quizId, cb) => {
        SDK.request({
            data: {
                quizTitle: quizTitle,
                quizId: quizId
            },
            method: "POST",
            url: "/quiz",
            headers: {
                authorization: SDK.Storage.load("token"),
            },
        }, (err, user) => {
            if (err) return cb(err);
        });
    },

        loadQuizzes: (cb) => {
            const courseId = SDK.Storage.load("myCourseId");
            SDK.request({
                method: "GET",
                url: "/quiz/" + courseId,
                headers: {
                    authorization: SDK.Storage.load("token"),
                },
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
                console.log(data);
            });
        },
        createQuiz: (quizTitle, courseId, cb) => {
            SDK.request({
                data: {
                    quizTitle: quizTitle,
                    courseId: courseId,
                },
                method: "POST",
                url: "/quiz",
                headers: {
                    authorization: SDK.Storage.load("token"),
                }
            }, cb)
        },
        createQuestion: (question, quizId, cb) => {
            SDK.request({
                data: {
                    question: question,
                    questionToQuizId: quizId
                },
                url: "/question",
                method: "POST",
                headers: {
                    authorization: SDK.Storage.load("token"),
                }
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            })
        },
        createOption: (option, optionToQuestionId, isCorrect, cb) => {
            SDK.request({
                data: {
                    option: option,
                    optionToQuestionId: optionToQuestionId,
                    isCorrect: isCorrect,
                },
                method: "POST",
                url: "/option",
                headers: {
                    authorization: SDK.Storage.load("token"),
                }
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            })
        },
        loadQuestion: (quizId, cb) => {
            const MyQuizzes = SDK.Storage.load("MyQuizzes");
            const quizId = MyQuizzes.quizId;

            SDK.request({
                method: "GET",
                url: "/question/" + quizId,

            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            })
        },
        deleteQuiz: (cb) => {
            const MyQuizId = SDK.Storage.load("MyQuizId");
            const quizId = MyQuizId.quizId;

            SDK.request({
                    method: "DELETE",
                    url: "/quiz/" + quizId,

                    headers: {
                        authorization: SDK.Storage.load("token")
                    },
                },
                (err, data) => {
                    if (err) return cb(err);
                    cb(null, data);
                });
        },

        loadCourses: (cb) => {
            SDK.request({
                            method: "GET",
                            url: "/course",
                            headers: {authorization: SDK.Storage.load("token"),
                            },
                        }, (err, user) => {
                if (err) return cb(err);

                cb(null, user);
            });
        },
    },

  User: {
      loadCurrentUser: (cb) => {
          SDK.request({
              method: "GET",
              url: "/user/myuser",
              headers: {
                  authorization: SDK.Storage.load("token"),
              },
          }, (err, user) => {
              if (err) return cb(err);
              SDK.Storage.persist("myUser", user);
              cb(null, user);
          });

      },
      currentUser: () => {
          const loadedUser = SDK.Storage.load("myUser");
          console.log(loadedUser);
          return loadedUser;
      },

    logOut: () => {
      SDK.Storage.remove("token");
      SDK.Storage.remove("userId");
      SDK.Storage.remove("user");
      window.location.href = "index.html";
    },
    login: (username, password, cb) => {
      SDK.request({
        data: {
          username: username,
          password: password
        },
        url: "/user/login",
        method: "POST"
      }, (err, data) => {

        //On login-error
        if (err) return cb(err);

        //localStorage.setItem("token", data);
        SDK.Storage.persist("token", data);
        //SDK.Storage.persist("userId", data.userId);
        //SDK.Storage.persist("user", data.user);

        cb(null, data);

      });
    },
    loadNav: (cb) => {
      $("#nav-container").load("nav.html", () => {
        SDK.User.loadCurrentUser((err, data) => {
            let currentUser = JSON.parse(data);
            console.log(2, currentUser);

            if (currentUser.type === 2) {
                $(".navbar-right").html(`
             <li><a href="profile.html">Din profil</a></li>
             <li><a href="score.html">Score</a></li>
             <li><a href="courses.html">Fag</a></li>
             <li><a href="#" id="logout-link" onclick="SDK.User.logOut()">Logout</a> </li>
             
          `);
            }
            else if (currentUser.type === 1){
                $(".navbar-right").html(`
             <li><a href="profile.html">Din profil</a></li>
             <li><a  href="courses.html">Opret quiz</a></li>
             <li><a  href="CoursesQuizAdmin.html">Slet quiz</a></li>
             <li><a href="#" id="logout-link" onclick="SDK.User.logOut()">Logout</a> </li>
           
             `);
            }
            else {
                $(".navbar-right").html(`
            <li><a href="signup.html" onclick="SDK.User.signUp()">Opret bruger<span class="sr-only">(current)</span></a></li>
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
            }
            $("#logout-link").click(() => SDK.User.logOut());
            cb && cb();
        })

      });
    }
  },
    signUp: (newUsername, newPassword, cb) => {
        console.log(newUsername);
        console.log(newPassword);
        SDK.request({
            data: {
                username: newUsername,
                password: newPassword
            },
            url: "/user/signup",
            method: "POST"
        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data);
        });
    },



  Storage: {
    prefix: "DØKQuizSDK",
    persist: (key, value) => {
      window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: (key) => {
      const val = window.localStorage.getItem(SDK.Storage.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e) {
        return val;
      }
    },
    remove: (key) => {
      window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
  }
};