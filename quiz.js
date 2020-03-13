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
const scoreContainer = document.getElementById('scoreContainer');

//created questions
let questions = [
    {
        question:"What does HTML Stand for?",
        choiceA:"Hyper Tags Mean Love",
        choiceB:"Hot Tamales Muddle Liquid",
        choiceC:"Hyper Text Markup Language",
        correct:"C",
    },

    {
        question:"What does a parent have?", 
        choiceA:"Dogs",
        choiceB:"Money",
        choiceC:"Children",
        correct:"C",
    },

    {
        question:"Where's a good place to debug your website/application?", 
        choiceA:"DevTools in Chrome",
        choiceB:"Outside on the porch",
        choiceC:"Going for a run",
        correct:"A",
    },

    {
        question:"What does DOM stand for?",
        choiceA:"Dogs our Masters",
        choiceB:"Document Object Model",
        choiceC:"Deathstart Overt Mission",
        correct:"B",
    },
    
    {
        question:"What do .getElementbyId reference in Javascript?",
        choiceA:"Elements in the CSS",
        choiceB:"Elements from the periodic table",
        choiceC:"Elements in the HTML page",
        correct:"C",
    },

    {
        question:"Who invented HTML?", 
        choiceA:"Steve Jobs",
        choiceB:"Tim Berners-Lee",
        choiceC:"Bill Gates",
        correct:"B",
    },
    
    {
        question:"What does CSS Stand for?", 
        choiceA:"Cascading Style Sheets",
        choiceB:"Cool Slide Socks",
        choiceC:"Combination Shock and Stick",
        correct:"A",
    }
];

//variables of questions and time length
let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
let count = 0;
const questionTime=10;
const gaugeWidth=150;
const gaugeUnit= gaugeWidth/questionTime;
let TIMER;
let score=0;

//rendering a question
function renderQuestion(){
    let q = questions[runningQuestionIndex];

    question.innerHTML = "<p>"+ q.question +"</p>"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click',startQuiz);

//start quiz
function startQuiz(){
    start.style.display="none";
    renderQuestion();
    quiz.style.display='block';
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

//render progress
function renderProgress(){
    for(let qIndex=0; qIndex <= lastQuestionIndex; qIndex++){
        progress.innerHTML += "<div class='prog' id='+ qIndex +'></div>";
    }
}

//counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = gaugeProgressUnit*count+"px";
        count++;
    }
    else{
        count=0;
        answerIsWrong();
        if (runningQuestionIndex < lastQuestionIndex){
            runningQuestionIndex++;
            renderQuestion();
        }
        else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
 
//checkAnswer
function checkAnswer(answer){
    if(answer == questions[runningQuestionIndex].correct){
        score++;
        answerIsCorrect();
    }
    else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestionIndex < lastQuestionIndex){
        runningQuestionIndex++;
        renderQuestion();
    }
    else{
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor="green";
}

//answer is wrong
function answerIsWrong(){
    document.getElementById(runningQuestionIndex).style.backgroundColor="red";
}

//score render
function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round (100* score/questions.length);

    let img =   (scorePerCent >=80) ? "img/5.png":
                (scorePerCent >=60) ? "img/4.png":
                (scorePerCent >=40) ? "img/3.png":
                (scorePerCent >=20) ? "img/2.png":
                "img/1.png";  
    
    scoreDiv.innerHTML = "<img src="+ img+">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent + "%</p>";
}