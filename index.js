const url = "http://localhost:3000/api/v1/representatives"

document.addEventListener("DOMContentLoaded", (e)=>{


  function getAllReps(){
    fetch(url)
    .then(r => r.json())
    .then(console.log)
  }

  getAllReps()
})
