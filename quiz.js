//element selector
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const qImg = document.getElementById("questionImage");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById('progress');
const scoreDiv = document.getElementById('score');

//created questions
let questions = [
    {
        question: "What does HTML Stand for?",
        imgSrc: "img/html.png",
        choiceA: "Hyper Tags Mean Love",
        choiceB: "Hot Tamales Muddle Liquid",
        choiceC: "Hyper Text Markup Language",
        correct: "C",
    },

    {
        question: "What does a parent have?",
        choiceA: "Dogs",
        choiceB: "Money",
        choiceC: "Children",
        correct: "C",
    },

    {
        question: "Where's a good place to debug your website/application?",
        choiceA: "DevTools in Chrome",
        choiceB: "Outside on the porch",
        choiceC: "Going for a run",
        correct: "A",
    },

    {
        question: "What does DOM stand for?",
        choiceA: "Dogs our Masters",
        choiceB: "Document Object Model",
        choiceC: "Deathstart Overt Mission",
        correct: "B",
    },

    {
        question: "What do .getElementbyId reference in Javascript?",
        choiceA: "Elements in the CSS",
        choiceB: "Elements from the periodic table",
        choiceC: "Elements in the HTML page",
        correct: "C",
    },

    {
        question: "Who invented HTML?",
        choiceA: "Steve Jobs",
        choiceB: "Tim Berners-Lee",
        choiceC: "Bill Gates",
        correct: "B",
    },

    {
        question: "What does CSS Stand for?",
        imgSrc: "img/css.png",
        choiceA: "Cascading Style Sheets",
        choiceB: "Cool Slide Socks",
        choiceC: "Combination Shock and Stick",
        correct: "A",
    }
];

//createsome variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click', startQuiz);

//start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}


//render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion;
        qIndex++) {
        progress.innerHTML += "<div class='progress' id=" +
            qIndex + "></div>";
    }
}

//counter render
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }
    }
}

//check answer
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        //answer is correct
        score++
        //change progress bar to green
        answerIsCorrect();
    }
    else {
        //answer is wrong
        //change progress color to red
        answerIsWrong();
    }
    count = 0;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
    else {
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

//answer is wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

//score render
function scoreRender() {
    scoreDiv.style.display = "block";

    //calculate the % correct
    const scorePercent = Math.round(100 * score / questions.length);
    let img =   (scorePercent >= 80) ? "img/5.png" :
                (scorePercent >= 60) ? "img/4.png" :
                (scorePercent >= 40) ? "img/3.png" :
                (scorePercent >= 20) ? "img/2.png" :
                "img/1.png";
    scoreDiv.innerHTML = "<img src="+ img + ">";
    scoreDiv.innerHTML += "<p>"+ scorePercent + "</p>"

}