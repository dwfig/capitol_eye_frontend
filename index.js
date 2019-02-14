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

   let collectionContainer = document.querySelector("#left-pane")
   let collectionShow = document.getElementById("show-collection")
   let yourCollection = document.getElementById("your-collection")



   // fetch("http://localhost:3000/api/v1/collections")
   // .then(r => r.json())
   // .then(data => {
   //
   //   allCollections = data
   //   allCollections.map(collection => {
   //     collectionShow.innerHTML += `
   //     <li>${collection.name}</li>
   //
   //     `
   //
   //   })// end of map


   //})//end second then
  //function getCollReps {
   fetch ("http://localhost:3000/api/v1/custom")
   .then(r => r.json())
   .then(data => {
     collections = data
     collections.map(collection => {
       yourCollection.innerText +=
           collection
     })
      //console.log(data);

       // console.log(collrep.representative_id);
       // console.log(collrep.collection_id);

     })


 //}// end function get Collreps


   collectionContainer.addEventListener('click', e => {

     // let stateName = e.target.state
     // console.log(stateName);
     if(e.target.id === "state"){
       //console.log(e.target.value);
       let stateValue = e.target.value


     }//end of if



   })//end of listener




}) //end of DOMContentLoaded
