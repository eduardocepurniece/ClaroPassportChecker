document.querySelector('#darkModeButton').addEventListener('click', turnDark);

function turnDark(){
    document.querySelector('#darkModeButton').classList.toggle('shadow');
    document.querySelector('#searchBar').classList.toggle('darkModeOn');
    document.querySelector('#body').classList.toggle('darkModeOn');
    document.querySelector('#searchTextInput').classList.toggle('darkModeOn');
    document.querySelector('#infoDetailed').classList.toggle('darkModeOn');
}

function getPassportNodes(){
    fetch('http://172.27.72.88:40002/nodes')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

let dataPassportNodes = {"value":["D30PB1","D30PB2","D30PB3","DRTPB1","DRTPB2","DRTPB3","STGPB1","STGPB2","STGPB3","MELPB1","MELPB2","MELPB3","D30PT1","DRTPT1","STGPT1","D30PP2","STGPP2","ROMPB1","CAQPB1","HERPB1","HERPB2","HERPB3","D30PT2","DRTPT2","MELPT1","STGPT2"],"start":"2023-04-17T13:39:22.090459","end":"2023-04-17T13:39:22.090669","delta":0.00021};
let passportNodes = dataPassportNodes.value;
console.log(passportNodes);

function createNodesLi(nodes){
    nodes.forEach(element => {
        const newLi = document.createElement("li");
        const refLi = document.createElement('a');
        const liText = document.createTextNode(element);
        refLi.appendChild(liText);
        newLi.appendChild(refLi);
        document.querySelector('#searchList').appendChild(newLi);
    });
}
createNodesLi(passportNodes);

function filterSearchList() {
    // Declare variables
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchTextInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchList");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}