let myLeads = []


const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const clrBtn = document.getElementById("clr-btn")
const downoladBtn = document.getElementById("download-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) { //makes sure myLeads is not empty
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

function renderLeads(leads){
let listItems = ""
for (let i =0; i<leads.length;i++){
    listItems += `
    <li>
    <a target='_blank' href=  ${leads[i]}>  ${leads[i]} 
    </a>
    </li>  `    
}
ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function() {
   // console.log("Button clicked from addEventListener")
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = ""
    
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
    
    console.log( localStorage.getItem("myLeads") )
    
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})



// myLeads.push(tabs[0].url)
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     renderLeads(myLeads)



clrBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads= []
    renderLeads(myLeads)
    
})

downoladBtn.addEventListener("click",function(){
    const jsonContent = JSON.stringify(myLeads); //converts into JSON
    const blob = new Blob([jsonContent], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "array_data.json"; // Set desired file name
    link.click();

    URL.revokeObjectURL(url);
})




