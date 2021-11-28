// Find HTML DOM
var mainBody = document.querySelector("#main-content");
var scoreBody = document.querySelector("#score-content");
var introPage = document.querySelector("#intro");
var scoreList = document.querySelector("#scores-list");
var timerText = document.querySelector("#timer");

// Assign Questions and Answers
var question01 = {
    question: "Which of the following is NOT a valid loop in JavaScript?",
    a: "while",
    b: "let",
    c: "for",
    d: "forEach",
    e: "obelisk",
    userAnswer: null
};
var question02 = {
    question: "Which of the following is the correct way to call a random number?",
    a: "var randomNum = Math.random();",
    b: "var randomNum = Random.math();",
    c: "Math(random) = randomNum;",
    d: "Random(math) = randomNum;",
    e: "jambalaya",
    userAnswer: null
};
var question03 = {
    question: "Which of the following is NOT a JavaScript library?",
    a: "jQuery",
    b: "React",
    c: "PHP",
    d: "D3",
    e: "except",
    userAnswer: null
};
var question04 = {
    question: "A boolean can give the output...",
    a: "truth",
    b: "false",
    c: "0",
    d: "1",
    e: "cobbler",
    userAnswer: null
};
var question05 = {
    question: "var fruits = ['Apples', 'Bananas', 'Cherries']; is an example of a/an...",
    a: "function",
    b: "string",
    c: "object",
    d: "array",
    e: "ending",
    userAnswer: null
};
var question06 = {
    question: "If you wanted to iterate by 1, which way would NOT work?",
    a: "i = i + 1;",
    b: "i += 1;",
    c: "i++;",
    d: "i = 1+;",
    e: "oddity",
    userAnswer: null
};
var question07 = {
    question: "How do // and /**/ comments differ?",
    a: "// comments multiple lines, /**/ comments only single lines",
    b: "// comments only single lines, /**/ comments multiple lines",
    c: "// is used only in CSS, while /**/ is used in JavaScript",
    d: "// is used in JavaScript, while /**/ is used only in CSS",
    e: "tribute",
    userAnswer: null
};
var question08 = {
    question: "What is this code saying?: if (i === 1 || i > 3){...};",
    a: "if i is equal in only value to 1 and i is greater than 3",
    b: "if i is equal in value and type to 1 and i is greater than 3",
    c: "if i is equal in value and type to 1 or i is greater than 3",
    d: "if i is equal only in value to 1 or i is greater than 3",
    e: "cooked",
    userAnswer: null
};
var question09 = {
    question: "How would you link a JavaScript file in your HTML file?",
    a: "<script src=\"file.js\"></script>",
    b: "<script href=\"file.js\"></script>",
    c: "<link rel=\"script\" href=\"file.js\" />",
    d: "<link rel=\"script\" src=\"file.js\" />",
    e: "safari",
    userAnswer: null
};
var question10 = {
    question: "If you wanted a button to run a function called 'FunctionName' on click, which could potentially work?",
    a: "<button onclick=\"FunctionName()\" id=\"btn\">Click Me</button> in HTML",
    b: "<button onClick=\"FunctionName\" id=\"btn\">Click Me</button> in HTML",
    c: "document.querySelector(\"#btn\").onClick(\"click\", FunctionName()); in JavaScript",
    d: "document.querySelector(\"#btn\").addEventListener(click, FunctionName); in JavaScript",
    e: "archipelago",
    userAnswer: null
};
var questions = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];
var questionNumber = 0;

// Other variables to assign
var wrongAnswers = 0;
var score = 0;
var timeInterval = null;
var timerLen = (questions.length * 10); // You get 10 seconds for every question
var highScores = []; // Empty array to save high scores in

// I'm not going to blatantly put the answers in the source code, you've gotta work for that
var decrypt = function(questionNumber) {
    var breakIt = questions[questionNumber].e.split("");
    breakIt = breakIt.sort()[0]
    return breakIt;
};

// What happens when answer is wrong or right
var wrongAnswer = function() {
    if (timerLen > 9) {
        timerLen -= 10; // Decrease time if wrong
    } else {
        timerLen = 0; // If less than 9 seconds, end quiz because all remaining time will be subtracted
    }
    wrongAnswers ++; // Keep score of how many wrong answers because if you get ALL of them wrong, you don't get any points, come on now.
};
var correctAnswer = function() {
    score += 10; // Increase score if right
};

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
        if (answer != "question" && answer != "e" && answer != "userAnswer") { // Don't include the question
            // Make each answer a button
            var quizAnswerLi = document.createElement("li");
            var quizAnswer = document.createElement("button");

            // Set data attribute to a, b, c, or d
            quizAnswer.setAttribute("data-answer", answer);


            // Display the answer button
            var answerLetter = document.createElement("span");
            answerLetter.className = "letter";
            answerLetter.textContent = answer + ".";
            var answerText = document.createElement("span");
            answerText.className = "answer";
            answerText.textContent = currentQuestion[answer];
            // Did it this way so I could apply flexbox, but not apply any code in the answers

            // Append to page
            quizAnswerBody.appendChild(quizAnswerLi);
            quizAnswer.appendChild(answerLetter);
            quizAnswer.appendChild(answerText);
            quizAnswerLi.appendChild(quizAnswer);

            quizAnswer.addEventListener("click", function(){
                currentQuestion.userAnswer = answer;
            });
            
            // What happens when a button is clicked
            if (decrypt(questionNumber) !== answer) {
                quizAnswer.addEventListener("click", wrongAnswer);
            } else {
                quizAnswer.addEventListener("click", correctAnswer);
            }

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

    // If you answer ALL of the questions wrong, you don't get any points
    if (wrongAnswers < questions.length) {
        // Add remaining time to score
        score += timerLen;
    }
    
    // Hide last question
    var lastQuestion = document.querySelector("div[data-question='" + questionNumber + "']");
    lastQuestion.className = "hidden";

    // Make end of quiz content
    var quizBody = document.createElement("div");
    quizBody.className = "quiz-body";

    var endTitle = document.createElement("h2");
    endTitle.textContent = "All done!";

    var endMessage = document.createElement("p");
    endMessage.textContent = "You got a score of " + score + ".";

    var enterInitials = document.createElement("p");
    enterInitials.innerHTML = "Please enter your initials to save your score: <form><input type='text' name='initials' maxlength='3' required /><button id='submit-initials' type='submit'>Save Score</button></form>";

    // Append to page
    mainBody.appendChild(quizBody);
    quizBody.appendChild(endTitle);
    quizBody.appendChild(endMessage);
    quizBody.appendChild(enterInitials);

    var submitButton = document.querySelector("#submit-initials");
    var initialsInput = document.querySelector("input[name='initials']");
    initialsInput.addEventListener("input", evt => {
        var initials = initialsInput.value.trim();
        if (initials) {
            submitButton.disabled = false;
            submitButton.addEventListener("click", saveScore);
        } else {
            submitButton.disabled = true;
        }
    });
    //submitButton.addEventListener("click", saveScore);

    displayAnswers();
};

var displayAnswers = function() {
    for (i = 0; i < questions.length; i++) {
        var tempQuestionNumber = i + 1;
        var showQuestion = questions[i];

        var showQuestionBody = document.createElement("div");
        showQuestionBody.className = "quiz-body";

        // Display Question
        var quizQuestion = document.createElement("h3");
        quizQuestion.textContent = tempQuestionNumber + ". " + showQuestion.question;
        var quizAnswerBody = document.createElement("ul");

        // Append to page
        mainBody.appendChild(showQuestionBody);
        showQuestionBody.appendChild(quizQuestion);
        showQuestionBody.appendChild(quizAnswerBody);

        // Loop through each answer
        for (const answer in showQuestion) {
            if (answer != "question" && answer != "e" && answer != "userAnswer") { // Don't include the question
                // Make each answer a list
                var quizAnswer = document.createElement("li");
                quizAnswer.className = "show-answer";
                
                var answerLetter = document.createElement("span");
                answerLetter.className = "letter";
                answerLetter.textContent = answer + ".";
                var answerText = document.createElement("span");
                answerText.className = "answer";
                answerText.textContent = showQuestion[answer];

                // Apply correct or incorrect classes
                if (showQuestion.userAnswer == decrypt(i) && showQuestion.userAnswer == answer) {
                    quizAnswer.className += " correct-answer";
                } else if (showQuestion.userAnswer !== decrypt(i) && showQuestion.userAnswer == answer) {
                    quizAnswer.className += " wrong-answer";
                }

                //Append to page
                showQuestionBody.appendChild(quizAnswerBody);
                quizAnswer.appendChild(answerLetter);
                quizAnswer.appendChild(answerText);
                quizAnswerBody.appendChild(quizAnswer);
            }
        }
    }
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
            // Timer displays as 0 if time runs out
            timerText.textContent = "Timer: " + (timerLen);
            clearInterval(timeInterval);
            endQuiz();
        } else {
            // Display timer text at one second faster to fit with score and inital display
            timerText.textContent = "Timer: " + (timerLen - 1);
            timerLen--;
        }
    }, 1000);

    // Start displaying questions
    displayQuestion();
};

// Save High Score
var saveScore = function(event) {
    event.preventDefault();

    // Ensures all Initals are in only
    var initials = document.querySelector("input[name='initials']").value.toUpperCase();

    // High score object stores initials and score
    var highScoreObj = {
        initials: initials,
        score: score
    };
    highScores.push(highScoreObj);
    localStorage.setItem("highScores", JSON.stringify(highScores)); // Local Storage

    window.location.href = "./highscore.html"; // Go to high score page when score is submitted
};

// Clear High Score
var clearScore = function() {
    highScores = []; // Empty Array
    localStorage.setItem("highScores", JSON.stringify(highScores)); // Local Storage
    loadScore();
    window.location.href = "./highscore.html";
};

// Load High Score
var loadScore = function() {
    var savedScores = localStorage.getItem("highScores");

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);

    // Sort from highest to lowest scores
    savedScores.sort(function(a, b){
        return b.score - a.score 
    });

    highScores = savedScores; // Make sure the preivous scores are loaded onto the array

    if (scoreBody) { // Only runs loop on page with "scoreBody"
        for (i = 0; i < savedScores.length; i++) {
            var scoreLi = document.createElement("li");
            var currScore = savedScores[i];
            scoreLi.textContent = currScore.initials + " - " + currScore.score;

            scoreList.append(scoreLi);
        }
    }
};
loadScore();