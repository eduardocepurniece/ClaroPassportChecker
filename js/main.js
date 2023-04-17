document.querySelector('#darkModeButton').addEventListener('click', turnDark);

function turnDark(){
    document.querySelector('#darkModeButton').classList.toggle('shadow');
    document.querySelector('#searchBar').classList.toggle('darkModeOn');
    document.querySelector('#body').classList.toggle('darkModeOn');
    document.querySelector('#searchTextInput').classList.toggle('darkModeOn');
}