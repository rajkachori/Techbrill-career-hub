console.log("JS Loaded");
const modal = document.getElementById("caseModal");

const buttons = document.querySelectorAll(".view-case");

const closeBtn = document.querySelector(".close");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

document.getElementById("modalTitle").innerText=btn.dataset.title;
document.getElementById("modalProblem").innerText=btn.dataset.problem;
document.getElementById("modalTech").innerText=btn.dataset.tech;
document.getElementById("modalBuild").innerText=btn.dataset.build;
document.getElementById("modalResult").innerText=btn.dataset.result;
document.getElementById("modalTeam").innerText=btn.dataset.team;
document.getElementById("modalFeedback").innerText=btn.dataset.feedback;

modal.style.display="flex";

});

});

closeBtn.onclick=()=>{
modal.style.display="none";
}

window.onclick=(e)=>{
if(e.target==modal){
modal.style.display="none";
}
}