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
    d: "forEach",
    e: "obelisk"
}
var question02 = {
    question: "Which of the following is the correct way to call a random number?",
    a: "var randomNum = Math.random();",
    b: "var randomNum = Random.math();",
    c: "Math(random) = randomNum;",
    d: "Random(math) = randomNum;",
    e: "jambalaya"
}
var question03 = {
    question: "Which of the following is NOT a JavaScript library?",
    a: "jQuery",
    b: "React",
    c: "PHP",
    d: "D3",
    e: "except"
}
var question04 = {
    question: "A boolean can give the output...",
    a: "truth",
    b: "false",
    c: "0",
    d: "1",
    e: "cobbler"
}
var question05 = {
    question: "var fruits = ['Apples', 'Bananas', 'Cherries']; is an example of a/an...",
    a: "function",
    b: "string",
    c: "object",
    d: "array",
    e: "ending"
}
var question06 = {
    question: "If you wanted to iterate by 1, which way would NOT work?",
    a: "i = i + 1;",
    b: "i += 1;",
    c: "i++;",
    d: "i = 1+;",
    e: "oddity"
}
var question07 = {
    question: "How do // and /**/ comments differ?",
    a: "// comments multiple lines, /**/ comments only single lines",
    b: "// comments only single lines, /**/ comments multiple lines",
    c: "// is used only in CSS, while /**/ is used in JavaScript",
    d: "// is used in JavaScript, while /**/ is used only in CSS",
    e: "tribute"
}
var question08 = {
    question: "What is this code saying?: if (i === 1 || i > 3){...};",
    a: "if i is equal in only value to 1 and i is greater than 3",
    b: "if i is equal in value and type to 1 and i is greater than 3",
    c: "if i is equal in value and type to 1 or i is greater than 3",
    d: "if i is equal only in value to 1 or i is greater than 3",
    e: "cooked"
}
var question09 = {
    question: "How would you link a JavaScript file in your HTML file?",
    a: "<script src=\"file.js\"></script>",
    b: "<script href=\"file.js\"></script>",
    c: "<link rel=\"script\" href=\"file.js\" />",
    d: "<link rel=\"script\" src=\"file.js\" />",
    e: "safari"
}
var question10 = {
    question: "If you wanted a button to run a function called 'FunctionName' on click, which could potentially work?",
    a: "<button onclick=\"FunctionName()\" id=\"btn\">Click Me</button> in HTML",
    b: "<button onClick=\"FunctionName\" id=\"btn\">Click Me</button> in HTML",
    c: "document.querySelector(\"#btn\").onClick(\"click\", FunctionName()); in JavaScript",
    d: "document.querySelector(\"#btn\").addEventListener(click, FunctionName); in JavaScript",
    e: "archipelago"
}
var questions = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];
var questionNumber = 0;

// Other variables to assign
var wrongAnswers = 0;
var score = 0;
var timeInterval = null;
var timerLen = (questions.length * 10); // You get 10 seconds for every question

// I'm not going to blatantly put the answers in the source code, you've gotta work for that
var decrypt = function() {
    var breakIt = questions[questionNumber].e.split("");
    breakIt = breakIt.sort()[0]
    return breakIt;
}

// What happens when answer is wrong or right
var wrongAnswer = function() {
    timerLen -= 10; // Decrease time if wrong
    wrongAnswers ++; // Keep score of how many wrong answers because if you get ALL of them wrong, you don't get any points, come on now.
}
var correctAnswer = function() {
    score += 10; // Increase score if right
}

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
            quizAnswer.textContent = answer + ". " + currentQuestion[answer];

            // Append to page
            quizAnswerBody.appendChild(quizAnswerLi);
            quizAnswerLi.appendChild(quizAnswer);

            // What happens when a button is clicked
            if (decrypt() !== answer) {
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