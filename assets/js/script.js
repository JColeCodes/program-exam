// Find HTML DOM
var mainBody = document.querySelector("#main-content");
var introPage = document.querySelector("#intro");
var timerText = document.querySelector("#timer");
var startButton = document.querySelector("#start-quiz");

// Assign Questions and Answers
var question01 = {
    question: "Which of the following is NOT a valid loop in JavaScript?",
    a: "while",
    b: "let",
    c: "for",
    d: "forEach"
}
var question02 = {
    question: "What is the correct way to call a random number?",
    a: "var randomNum = Math.random();",
    b: "var randomNum = Random.math();",
    c: "Math(random) = randomNum;",
    d: "Random(math) = randomNum;"
}
var questions = [question01, question02];
var questionNumber = 0;

var displayQuestion = function() {
    var currentQuestion = questions[questionNumber];
    var tempQuestionNumber = questionNumber + 1;

    var quizBody = document.createElement("div");
    quizBody.className = "quiz-body";
    quizBody.setAttribute("data-question", tempQuestionNumber);

    var quizQuestion = document.createElement("h2");
    quizQuestion.textContent = tempQuestionNumber + ". " + currentQuestion.question;

    var quizAnswerBody = document.createElement("ul");

    mainBody.appendChild(quizBody);
    quizBody.appendChild(quizQuestion);
    quizBody.appendChild(quizAnswerBody);

    for (const answer in currentQuestion) {
        if (answer != "question") {
            var quizAnswerLi = document.createElement("li");
            var quizAnswer = document.createElement("button");

            quizAnswer.textContent = answer + ". " + currentQuestion[answer];

            quizAnswerBody.appendChild(quizAnswerLi);
            quizAnswerLi.appendChild(quizAnswer);
        }
    }
    questionNumber++;
};

var timer = function() {
    introPage.className = "hidden";

    var timerLen = (questions.length * 10);

    var timeInterval = setInterval(function() {
        if (timerLen === 0) {
            clearInterval(timeInterval);
        }
        timerText.textContent = "Timer: " + timerLen;
        timerLen--;
    }, 1000);

    displayQuestion();
}

startButton.addEventListener("click", timer);