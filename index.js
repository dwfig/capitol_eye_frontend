const url = "http://localhost:3000/api/v1/representatives"
const apiBillsUrl = "https://api.propublica.org/congress/v1/116/house/bills/updated.json"

document.addEventListener("DOMContentLoaded", (e)=>{
  const centerContainer = document.querySelector("#center-feed")
  const billButton = document.querySelector("#bill-btn")
  const repButton = document.querySelector("#rep-btn")
  const billContainer = document.querySelector("#bill-container")
  const repContainer = document.querySelector("#rep-container")
  let fetchedReps = []
  let fetchedBills = []


  billButton.addEventListener("click", (e)=>{
    console.log("bill button")
    swapToBills()
  })

  repButton.addEventListener("click", (e)=>{
    console.log("rep button")
    swapToReps()
  })

  // this method is a bit of a mess but it handles the showing and hiding of the Votes
  // on the individual bill
  billContainer.addEventListener("click", (e)=>{
    if (e.target.className === "show-bill-btn"){
      console.log(e.target.parentNode.children[3].style.display)
      if (e.target.parentNode.children[3].style.display !== "block"){
        e.target.parentNode.children[3].style.display = "block"
        e.target.innerText="Hide Votes"
        return
        console.log(e.target.parentNode.children[3].style.display)
      }
      if (e.target.parentNode.children[3].style.display === "block"){
        e.target.parentNode.children[3].style.display = "none"
        e.target.innerText="Show Votes"
        return
        console.log(e.target.parentNode.children[3].style.display)
      }
    }
  })

  function fetchVotes(rep){
    fetch(`https://api.propublica.org/congress/v1/members/{member-id}/votes.json`,{
      method: "GET",
      // mode: "no-cors",
      headers: {
        "X-API-KEY" : keys.apiKey
      }
    })
    .then(r=>r.json())
    .then(parsed => console.log(parsed))
  }

  function fetchBills(){
    fetch(apiBillsUrl, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "X-API-KEY" : keys.apiKey
      }
    })
    .then(r => r.json())
    .then(parsed => renderAllBills(parsed.results[0].bills))
  }

  function renderSingleBill(bill){
    return `<div class = "bill" data-id="${bill.bill_id}">
              <h3 class = "bill-num"><a href = "${bill.govtrack_url}">${bill.number}</a></h3>
              <h4 class = "short-title">${bill.short_title}</h4>
              <span class = "show-bill-btn" data-id="${bill.bill_id}">Show Votes</span>
              <div class="rep-votes" data-id="${bill.bill_id}"><h1>This is where the votes go.</h1></div>
              <p class= "latest-action">${bill.latest_major_action}</p>
              <br>
              <span class= "introduced">Introduced ${bill.introduced_date}</span><span class= "sponsor">Sponsored by ${bill.sponsor_title} ${bill.sponsor_name}, ${bill.sponsor_party}-${bill.sponsor_state}</span>
            </div>`
  }

  function renderAllBills(bills){
    fetchedBills = bills.map(function(bill){
      return renderSingleBill(bill)
    }).join("")
    billContainer.innerHTML = fetchedBills
  }

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
    fetchedReps = reps.map(function(rep){
      return renderSingleRep(rep)
    }).join("")
    repContainer.innerHTML = fetchedReps
  }

  fetchAllReps()
  fetchBills()
  swapToBills()


   function swapToBills(){
     repContainer.style.display = "none"
     billContainer.style.display = "grid"
   }

   function swapToReps(){
     repContainer.style.display = "grid"
     billContainer.style.display = "none"
   }

   let collectionContainer = document.querySelector("#left-pane")
   let collectionShow = document.getElementById("show-collection")
   // let yourCollection = document.getElementById("your-collection")



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
     console.log(data)
     collections = data
     collectionShow.innerHTML +=
        renderAllCollections(collections)
     })

  function renderSingleCollection(collection){
    collectionName = collection.shift()
    repNameList = collection.map(function(rep){
      return `<p data-id="${rep.slice(0,7)}">${rep.slice(8)}</p>`
    }).join("")
    return `<div class="collection">
          <h4>${collectionName}</h4>
          ${repNameList}
          </div>`
  }

  function renderAllCollections(collections){
    return collections.map(function(collection){
      return renderSingleCollection(collection)
    }).join("")
  }
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
