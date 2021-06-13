var trueLang = ""
var trueLangId = ""
var lost = false
function requestApi(){
    fetch(`/api`, {
        method: "GET"
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json()
      })
      .then((data) => {
        for(i in [0,1,2,3]){
            document.getElementById(i).disabled = false
        }
        console.log(data['langs'])
        trueLang = data['c']
        for(i in data['langs']){
            if(data['langs'][i] == trueLang){
                trueLangId = `${i}`
            }
            document.getElementById(`${i}`).innerText = data['langs'][i]
        }
        // document.getElementsByClassName("code-block").innerHTML = `<script class="gist-code" src="https://gist.github.com/${data['uri']}.js"></script>`
        let container = document.getElementById("code-container")
        container.className = "language-" + data['c']
        container.innerText = data['code']
        
        // hljs.highlightAll()
    })
      .catch(error => {
        console.log("ERROR: " + error)
      });
}
function checkLang(arg, clickId){
    if(arg.toLowerCase() == trueLang.toLowerCase()){
        document.getElementById("points").innerText = parseInt(document.getElementById("points").innerText) + 50
        document.getElementById(clickId).className = "btn btn-success"
        document.getElementById("next-btn").style.display = "block"
        
    }else{
        // document.getElementById("results").innerText = `You got ${document.getElementById("points").innerText} points!\nTake screenshot to show it to Kar1m!`
        document.getElementById(clickId).className = "btn btn-danger"
        document.getElementById(trueLangId).className = "btn btn-success"
        document.getElementById("next-btn").style.display = "block"
        alertify.error("You lost, You got " + document.getElementById("points").innerText + " Points!")
        lost = true
        document.getElementById("next-btn").innerText = "Retry"
    }
    for(i in [0,1,2,3]){
        document.getElementById(i).disabled = true
    }

}
window.onload = () => {
    // setInterval(() => {
    //     hljs.highlightAll()
    // }, 1000);
    for(i in [0,1,2,3]){
        document.getElementById(i).disabled = true
    }
    requestApi()

}
function next(){
    if(lost == true){
        window.location.reload()
    }else{
        document.getElementById("next-btn").style.display = "none"
        for(i in [0,1,2,3]){
            document.getElementById(i).disabled = false
            document.getElementById(i).innerText = "Loading"
            document.getElementById(i).disabled = true
            document.getElementById(i).className = "btn btn-secondary"
        }
        document.getElementById("code-container").innerText = "Loading..."
        requestApi()
    }
}

window.addEventListener("load", () => {
    if(window.location.href.includes("kar1m7.repl.co")){
        document.onkeydown = function(e) {
            if(event.keyCode == 123) {
				alertify.error("Inspect is disabled by Kar1m")
               return false;
            }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
				alertify.error("Inspect is disabled by Kar1m")
               return false;
            }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
				alertify.error("Inspect is disabled by Kar1m")
               return false;
            }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
				alertify.error("Inspect is disabled by Kar1m")
               return false;
            }
            if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
				alertify.error("Inspect is disabled by Kar1m")
               return false;
            }
          }
    }
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
})