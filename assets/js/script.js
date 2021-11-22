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

// Other variables to assign
var score = 0;
var timeInterval = null;
var timerLen = (questions.length * 10);

// Display the question and answers
var displayQuestion = function() {
    var currentQuestion = questions[questionNumber];
    var tempQuestionNumber = questionNumber + 1; // Since people count from 1, not 0

    // Make Quiz Body
    var quizBody = document.createElement("div");
    quizBody.className = "quiz-body";
    quizBody.setAttribute("data-question", tempQuestionNumber);

    // Display Question
    var quizQuestion = document.createElement("h2");
    quizQuestion.textContent = tempQuestionNumber + ". " + currentQuestion.question;

    var quizAnswerBody = document.createElement("ul");

    // Append to page
    mainBody.appendChild(quizBody);
    quizBody.appendChild(quizQuestion);
    quizBody.appendChild(quizAnswerBody);

    // Loop through each answer
    for (const answer in currentQuestion) {
        if (answer != "question") { // Don't include the question
            // Make each answer a button
            var quizAnswerLi = document.createElement("li");
            var quizAnswer = document.createElement("button");

            // Set data attribute to a, b, c, or d
            quizAnswer.setAttribute("data-answer", answer);

            // Display the answer button
            quizAnswer.textContent = answer + ". " + currentQuestion[answer];

            // Append to page
            quizAnswerBody.appendChild(quizAnswerLi);
            quizAnswerLi.appendChild(quizAnswer);

            // What happens when a button is clicked
            if (tempQuestionNumber === questions.length) {
                // End quiz if at last question
                quizAnswer.addEventListener("click", endQuiz);
            } else {
                // Run displayQuestion function again
                quizAnswer.addEventListener("click", displayQuestion);
            }
        }
    }
    // Hide previous question
    if (questionNumber > 0) {
        var prevQuestion = document.querySelector("div[data-question='" + questionNumber + "']");
        prevQuestion.className = "hidden";
    }
    // Increase which question number we are on to go to next question
    questionNumber++;
};

// What happens when the quiz ends
var endQuiz = function() {
    // Stop timer
    clearInterval(timeInterval);

    // Add remaining time to score
    score += timerLen;

    // Hide last question
    var lastQuestion = document.querySelector("div[data-question='" + questionNumber + "']");
    console.log(lastQuestion);
    lastQuestion.className = "hidden";

    // Make end of quiz content
    var quizBody = document.createElement("div");
    quizBody.className = "quiz-body";

    var endTitle = document.createElement("h2");
    endTitle.textContent = "All done!";

    var endMessage = document.createElement("p");
    endMessage.textContent = "You got a score of " + score + ".";

    var enterInitials = document.createElement("p");
    enterInitials.innerHTML = "Please enter your initials to save your score: <form><input type='text' name='initials' /><button class='submit-initials' type='submit'>Save Score</button>";

    // Append to page
    mainBody.appendChild(quizBody);
    quizBody.appendChild(endTitle);
    quizBody.appendChild(endMessage);
    quizBody.appendChild(enterInitials);
};

// Timer
var timer = function() {
    // Hide Javascript Coding Quiz introduction
    introPage.className = "hidden";

    // Display timer immediately
    timerText.textContent = "Timer: " + timerLen;

    // Start time interval
    timeInterval = setInterval(function() {
        // Stop timer when it hits 0
        if (timerLen === 0) {
            clearInterval(timeInterval);
        }
        // Display timer text at one second faster to fit with score and inital display
        timerText.textContent = "Timer: " + (timerLen - 1);
        timerLen--;
    }, 1000);

    // Start displaying questions
    displayQuestion();
};

// Start timer when "Start Quiz" button is clicked
// Currently broken on High Scores page... needs to run ONLY on index. Coming soon.
startButton.addEventListener("click", timer);