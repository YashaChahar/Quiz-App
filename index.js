let body =document.getElementsByTagName("body");
let startButton= document.getElementById("start-btn");
let question=document.getElementById("question-container");
let nextButton= document.getElementById("next-btn");
let questionElement=document.getElementById("question");
let answerButtons=document.getElementById("answer-buttons")
let score=document.getElementById("score");
let timeLeft=document.getElementById("ques-time-left");
let count;
var total_seconds=60*10;
var c_minutes=parseInt(total_seconds/60);
var c_seconds=parseInt(total_seconds%60);
function CheckTime(){
    timeLeft.innerHTML="Time-Left: "+ c_minutes+" Min "+c_seconds+" Sec";
    if(total_seconds<=0)
        {
        question.classList.add('hide');
        startButton.innerText="Wanna Retry"
        startButton.classList.remove('hide');
        body[0].style.background="black";    
        }
    else{
        total_seconds=total_seconds-1;
     c_minutes=parseInt(total_seconds/60);
     c_seconds=parseInt(total_seconds%60);
        setTimeout("CheckTime()",1000);
        if(c_minutes<2)
            {
               timeLeft.style.background="red";
            }
    }
}
setTimeout("CheckTime()",0);

startButton.addEventListener("click",startQuiz);
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQuestion();
})
let flag;
let shuffledQuestions,currentQuestionIndex;
function startQuiz()
{
    
    count=0;
    score.innerText="Score:0";
    console.log("started");
    startButton.classList.add('hide');
    question.classList.remove('hide');
    nextButton.classList.remove('hide');
    shuffledQuestions=questions.sort(()=> Math.random()-0.5)
    currentQuestionIndex=0;
    setNextQuestion()
    total_seconds=10*60;
    
    
}
function setNextQuestion()
{
    resetState();
   showQuestion(shuffledQuestions[currentQuestionIndex]) 
}
function showQuestion(question){
    flag=false;
   questionElement.innerText=question.question;
    question.answers.forEach(answer=>{
        let button =document.createElement("button");
        button.innerText=answer.text;
        button.classList.add('btn');
        if(answer.correct){
          button.dataset.correct=answer.correct; 
        }
        button.addEventListener("click",selectAnswer)
        answerButtons.appendChild(button);
    })
}
function resetState()
{
    
    nextButton.classList.add('hide');
    while(answerButtons.firstChild)
        {
            answerButtons.removeChild(answerButtons.firstChild)
        }
}
function selectAnswer(e){
    let selectedButton =e.target
    
    if(selectedButton.dataset.correct && !flag){
        count=count+1;
        score.innerText="Score:"+count;
        body[0].style.background="green";
    }
    else{
        
       body[0].style.background="red"; 
    }
    let correct=selectedButton.dataset.correct;
    Array.from(answerButtons.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffledQuestions.length>currentQuestionIndex+1){
    nextButton.classList.remove('hide');
        
    }
    else{
        question.classList.add('hide');
        startButton.innerText="Wanna Retry"
        startButton.classList.remove('hide');
        body[0].style.background="#3328b7";
    }
    
}
function setStatusClass(element,correct){
    clearStatusElement(element)
    if(correct)
        {
            element.classList.add('correct');
        }
    else{
        element.classList.add('wrong');
        flag=true;
    }
}
function clearStatusElement(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
let questions=[
    {
        question:"What does HTML stands for?",
        answers:[
            {text:"Hyper Text Marking Language",correct:false},
            {text: "Hyper Text MarkUp Language",correct:true}
        ]
    },
     {
        question:"Who is making the Web standards?",
        answers:[
            {text:"The World Wide Web Consortium",correct:true},
            {text: "Google",correct:false},
              {text: "Microsoft",correct:false},
              {text: "Mozilla",correct:false}
        ]
    },
     {
        question:"The biggest heading tag is",
        answers:[
           {text:"heading",correct:false},
            {text: "h1",correct:true},
              {text: "h6",correct:false},
              {text: "None of these",correct:false}
            ]
    },
 {
        question:"Which of the following is not JavaScript Data Types?",
         answers:[
           {text:"Undefined",correct:false},
            {text: "float",correct:true},
              {text: "Number",correct:false},
              {text: "boolean",correct:false}
            ]
    },
 {
        question:"Which of the following is correct about features of JavaScript?",
       answers:[
           {text:"It can not Handling dates and time",correct:false},
            {text: "JavaScript is a object-based scripting language",correct:true},
              {text: "JavaScript is not interpreter based scripting language.",correct:false},
              {text: "All of the above",correct:false}
            ]
    },
 {
        question:"Inside which HTML element do we put the JavaScript?",
       answers:[
           {text:"script",correct:true},
            {text: "head",correct:false},
              {text: "meta",correct:false},
              {text: "style",correct:false}
            ]
    },
 {
        question:"What is the original name of JavaScript?",
       answers:[
           {text:"LiveScript",correct:false},
            {text: "JavaScript",correct:false},
              {text: "Mocha",correct:true},
              {text: "EScript",correct:false}
            ]
    },
    {
        question:" JavaScript is designed for following purpose -",
       answers:[
           {text:"to style HTML pages",correct:false},
            {text: " to execute Queries related to databases on a server",correct:false},
              {text: "to add interactivity to html pages",correct:false},
              {text: "All of the above",correct:true}
            ]
    },
    {
        question:"What does javascript use instead of == and !=?",
       answers:[
           {text:"It uses bitwise checking",correct:false},
            {text: "It uses === and !== instead",correct:true},
              {text: "It uses equals() and notequals() instead",correct:false},
              {text: "It uses equalto()",correct:false}
            ]
    },
    {
        question:"Among the keywords below, which one is not a statement?",
       answers:[
           {text:"if",correct:false},
            {text: "with",correct:false},
              {text: "debugger",correct:false},
              {text: "use strict",correct:true}
            ]
    }
]
