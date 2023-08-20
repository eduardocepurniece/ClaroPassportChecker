document.querySelector('#darkModeButton').addEventListener('click', turnDark);
document.querySelector('#searchTextInput').addEventListener('focus', deployList);
document.querySelector('#searchTextInput').addEventListener('focusout', hideList, false);
document.querySelector('#searchButton').addEventListener('click', searchAndDeploy);


function getPassportNodes(){
  fetch('http://172.27.72.88:40002/nodes')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    passportNodes = data.value;
    createNodesLi(passportNodes);

    /*const nodesOnLine = document.querySelectorAll('.current-alarm');
    console.log(nodesOnLine)
    
    nodesOnLine.forEach(element => element.addEventListener('click', console.log(element))) /*searchAndDeployFromList))*/
    
  })
  .catch(err => {
      console.log(`error ${err}`)
  });  
}

function turnDark(){
  document.querySelector('#darkModeButton').classList.toggle('shadow');
  document.querySelector('#searchBar').classList.toggle('darkModeOn');
  document.querySelector('#body').classList.toggle('darkModeOn');
  document.querySelector('#searchTextInput').classList.toggle('darkModeOn');
  document.querySelector('#infoDetailed').classList.toggle('darkModeOn');
  document.querySelector('#searchList').classList.toggle('darkModeOn');
}

function deployList(){
  document.querySelector('#searchListContainer').classList.remove('hide');
  document.querySelector('#searchBar').classList.add('search-bar-bottom-border-hide');
}
function hideList(e){
  if (e.relatedTarget != null) {
    const passportNodeName = e.relatedTarget.childNodes[0].childNodes[0].nodeValue;
    document.querySelector('#searchTextInput').value = passportNodeName;
    document.querySelector('#searchListContainer').classList.add('hide');
    document.querySelector('#searchBar').classList.remove('search-bar-bottom-border-hide');
  } else {
    document.querySelector('#searchListContainer').classList.add('hide');
    document.querySelector('#searchBar').classList.remove('search-bar-bottom-border-hide');
  }
}

let dataPassportNodes = getPassportNodes()/*init passport nodes list*/
let passportNodes;/*create variable for storing nodes list fetched*/

function createNodesLi(nodes){
    nodes.forEach(element => {
        const newLi = document.createElement("li");
        const refLi = document.createElement('a');
        const liText = document.createTextNode(element);
        refLi.appendChild(liText);
        newLi.appendChild(refLi);
        newLi.classList.add('current-alarm');
        newLi.tabIndex = 0;
        newLi.addEventListener('click', () => {console.log(liText)}, true);
        document.querySelector('#searchList').appendChild(newLi);
    });
}


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

function searchAndDeploy(){
  const toRemove = document.querySelectorAll('#currentAlarms li');
  if(toRemove) toRemove.forEach( e => e.parentElement.removeChild(e));
  const input = document.querySelector('#searchTextInput').value;
  if(input.length < 1){
    fetch('http://172.27.72.88:40002/traceback')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let nodesAndAlarms = data.value;
      for (const property in nodesAndAlarms) {
        if(!nodesAndAlarms[property].includes('No trace')){
          const newLi = document.createElement("li");
          const liText = document.createTextNode(`${property}: ${nodesAndAlarms[property]}`);
          newLi.appendChild(liText);
          document.querySelector('#currentAlarms').appendChild(newLi);
        }        
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });  
  } else{
    fetch(`http://172.27.72.88:40002/traceback/${input}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let nodesAndAlarms = data.value;
      const newLi = document.createElement("li");
      const liText = document.createTextNode(`${input.toUpperCase()}: ${nodesAndAlarms}`);
      newLi.appendChild(liText);
      document.querySelector('#currentAlarms').appendChild(newLi);
    })
    .catch(err => {
      console.log(`error ${err}`)
    });  
  }
}

function searchAndDeployFromList(click){
  console.log('lol', click.target.value);
  document.querySelector('#searchTextInput').value = click.target.value;

}