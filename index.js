const url = "http://localhost:3000/api/v1/representatives"

document.addEventListener("DOMContentLoaded", (e)=>{
  let centerContainer = document.querySelector("#center-feed")
  let billButton = document.querySelector("#bill-btn")
  let repButton = document.querySelector("#rep-btn")

  function fetchAllReps(){
    fetch(url)
    .then(r => r.json())
    // .then(console.log)
    .then(parsed => renderAllReps(parsed))
  }

  function renderSingleRep(rep){
    return `<div class = "rep">
              <div class= "rep-img" style="background-image: url(https://theunitedstates.io/images/congress/original/${rep.pp_id}.jpg);">
                <div class = "hover-info">
                  <p>${rep.office} </br>
                    ${rep.phone}</p>
                </div>
              </div>
              <div class = "rep-info">
                <a class= "rep-link" href="${rep.url}"><h3>${rep.short_title} ${rep.first_name} ${rep.last_name}</h3></a>
                <h5>${rep.party}</h5><br>
                <h5>${rep.state} - ${rep.district}</h5>
                <span class= "info-footer">
                  <i class="fab fa-youtube"></i>
                  <i class="fab fa-twitter"></i>
                </span>
              </div>
            </div>`
  }

  function renderAllReps(reps){
    centerContainer.innerHTML = reps.map(function(rep){
      return renderSingleRep(rep)
    }).join("")
  }

   fetchAllReps()


})
