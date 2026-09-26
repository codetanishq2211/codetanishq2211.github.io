const username = "codetanishq2211";

const projects = [
  {name:"Medshuraksha-2.0", repo:"Medshuraksha-2.0", desc:"Medicine verification application exploring barcode-based drug information and verification workflows.", tags:["Flutter","FastAPI","Python"]},
  {name:"SkillMeasure", repo:"skillmeasure", desc:"Resume-based skill assessment platform with AI-oriented analysis, quizzes and coding evaluation.", tags:["Python","FastAPI","JavaScript"]},
  {name:"SIH80", repo:"SIH80", desc:"Smart India Hackathon project workspace for a real-world problem statement solution.", tags:["Python","AI/ML"]},
  {name:"Social-Media-Sentiments", repo:"Social-Media-Sentiments", desc:"Sentiment-analysis project focused on classifying social-media text with machine learning.", tags:["Python","Machine Learning"]},
  {name:"Craftlink_AI", repo:"Craftlink_AI", desc:"Flutter-focused AI marketplace concept for connecting marginalized artisans with customers.", tags:["Flutter","AI","Firebase"]},
  {name:"resume-skill-assessment-backend", repo:"resume-skill-assessment-backend", desc:"Backend services for an AI-powered resume skill assessment workflow.", tags:["Python","FastAPI","AI"]}
];

function $(id){return document.getElementById(id)}

function renderProjects(){
  const grid = $("projectsGrid");
  grid.innerHTML = projects.map((p,i)=>`
    <article class="project">
      <span class="project-num">${String(i+1).padStart(2,"0")} / NODE</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="mini-tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
      <div class="project-links">
        <a href="https://github.com/${username}/${p.repo}" target="_blank" rel="noreferrer">⌘ CODE</a>
        <a href="https://github.com/${username}/${p.repo}" target="_blank" rel="noreferrer">OPEN →</a>
      </div>
    </article>
  `).join("");
  $("projectCounter").textContent = `${String(projects.length).padStart(2,"0")} NODES`;
}

function buildHeatmap(){
  const h=$("heatmap");
  h.innerHTML="";
  for(let i=0;i<26*7;i++){
    const cell=document.createElement("i");
    cell.title="GitHub activity";
    h.appendChild(cell);
  }
}

async function loadGithub(){
  try{
    const user = await fetch(`https://api.github.com/users/${username}`).then(r=>r.json());
    if(user && !user.message){
      $("repoCount").textContent=user.public_repos ?? "--";
      $("followers").textContent=user.followers ?? "--";
      $("ghState").textContent="ONLINE";
      $("liveStatus").textContent="ONLINE";
    }
    const repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then(r=>r.json());
    if(Array.isArray(repos)){
      let stars=0,forks=0;
      repos.forEach(r=>{stars += r.stargazers_count||0; forks += r.forks_count||0;});
      $("stars").textContent=stars;
      $("forks").textContent=forks;
      $("repoState").textContent=`${repos.length} LOADED`;
    }
  }catch(e){
    $("ghState").textContent="OFFLINE";
    $("repoState").textContent="LOCAL MODE";
  }
}

const lines=[
  "initializing AI/ML workspace...",
  "building practical applications...",
  "learning. shipping. improving.",
  "welcome to my cyber lab."
];
let line=0, char=0, deleting=false;
function typeLoop(){
  const el=$("typing");
  const word=lines[line];
  if(!deleting){
    el.textContent=word.slice(0,++char);
    if(char===word.length){deleting=true;setTimeout(typeLoop,1400);return}
  }else{
    el.textContent=word.slice(0,--char);
    if(char===0){deleting=false;line=(line+1)%lines.length}
  }
  setTimeout(typeLoop,deleting?28:48);
}

function clock(){
  $("clock").textContent=new Date().toLocaleTimeString("en-GB");
}
renderProjects(); buildHeatmap(); loadGithub(); typeLoop(); clock(); setInterval(clock,1000);
