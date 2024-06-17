const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question: "1. What does a vampire never order at a restaurant?",
        imgSrc: "image/mcq/vampire.gif",
        choiceA: "A) Steak",
        choiceB: "B) Garlic bread",
        choiceC: "C) Blood pudding",
        choiceD: "D) Tomato soup",
        correct: "B"
    }, {
        question: "2. Why don't ghosts like to go out in the rain?",
        imgSrc: "image/mcq/ghost.gif",
        choiceA: "A) It dampens their spirits",
        choiceB: "B) They don't want to catch a cold",
        choiceC: "C) They can't swim",
        choiceD: "D) They might melt",
        correct: "A"
    }, {
        question: "3. What is a skeleton’s least favorite room in the house?",
        imgSrc: "image/mcq/skeleton.gif",
        choiceA: "A) The kitchen",
        choiceB: "B) The bathroom",
        choiceC: "C) The living room",
        choiceD: "D) The closet",
        correct: "C"
    }, {
        question: "4. What’s a witch’s favorite subject in school?",
        imgSrc: "image/mcq/witch.gif",
        choiceA: "A) Potions",
        choiceB: "B) Spelling",
        choiceC: "C) Hex-ercises",
        choiceD: "D) Witch-craftsmanship",
        correct: "B"

    }, {
        question: "5. Where do mummies go for a swim?",
        imgSrc: "image/mcq/mummy.gif",
        choiceA: "A) The Oasis",
        choiceB: "B) The Nile River",
        choiceC: "C) The Pyramid Pool",
        choiceD: "D) The Dead Sea",
        correct: "D"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
//render question
function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}


function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}


function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender() {
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score / questions.length);

    let img = (scorePerCent == 100) ? "image/mcq/score5.png" :
        (scorePerCent == 80) ? "image/mcq/score4.png" :
            (scorePerCent == 60) ? "image/mcq/score3.png" :
                (scorePerCent == 40) ? "image/mcq/score2.png" :
                    (scorePerCent == 20) ? "image/mcq/score1.png" :
                        "image/mcq/score0.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>Score: " + scorePerCent + "%</p>";
    scoreDiv.innerHTML += "<a href='Quizlet.html'>" + "<h1> Home </h1>" + "</a>";
    scoreDiv.innerHTML += "<a href='quiz.html'>" + "<h2>Try Again </h2>" + "</a>";
}
