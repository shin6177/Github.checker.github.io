const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function fetcher(query){
    let response = await fetch(APIURL + query)
    if(!response.ok){
      console.log("error has come")
       errorFectch()
    }else{
      let data = await response.json()
      console.log(data)
    createdatacard(data)
    }
   
}

function errorFectch(){
  main.innerHTML = `
  <div class="error">
  <img src="https://t3.ftcdn.net/jpg/04/48/35/42/360_F_448354204_33yPB12jtqzD31robpa85NoPctJ2thRd.jpg" alt="">
</div>
  `
}


form.addEventListener("submit", (e)=>{
  e.preventDefault()
      let query = search.value
        
      if(query == ""){
        console.log("nothing is same")
      }

     fetcher(query)
     getrepos(query)
     form.reset()
})


async function getrepos(query){
 let response = await fetch(APIURL + query + "/repos")
 let reposdata = await response.json()
   displayprojects(reposdata)

}

let repoNumber;


function createdatacard (data){
   repoNumber = data.public_repos
  const cardHtml = `
  <div class="card">
  <div>
      <img class="avatar" src="${data.avatar_url}" alt="${data.name}" />
  </div>
  <div class="data-info">
      <h2>${data.name}</h2>
      <h3>${data.login}</h3>
      <a>${data.url}</a>

      <ul class="info">
          <li>${data.followers}<strong>Followers</strong></li>
          <li>${data.following}<strong>Following</strong></li>
          <li>${data.public_repos}<strong>Repos</strong></li>
      </ul>

      <h2 class="repo-header">
          Repositories <span class="repo-num">${data.public_repos}</span>
      </h2>

      <div id="repos"></div>
  </div>
</div>
  `

  main.innerHTML = cardHtml

}

function displayprojects(reposdata){
  const reposEl = document.getElementById("repos");
     

  reposdata
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, repoNumber)
  .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
  });
 
}