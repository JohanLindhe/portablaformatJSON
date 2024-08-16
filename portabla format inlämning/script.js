'use strict';
 
 
window.addEventListener('load', loadFunk);
 
function loadFunk(){
   
    document.querySelector('#spinners').classList.add('d-none'); //Gömmer spinners
    document.querySelector('.sok-form').addEventListener('submit', formFix);
    console.log("loadFunk körs");
}
 
function formFix(e){
    e.preventDefault(); //Så datan inte skickas till servern
 
    document.querySelector('#content').innerHTML = null; //Tar bort tidigare sökning
    console.log("formFix körs");
 
    //anropas search funktionen och skickar med värdet av det man söker på samt vart det ska hamna
    search(document.querySelector('#search').value, document.querySelector('#content'));
   
}


function search(query, container){

    window.fetch('http://www.omdbapi.com/?apikey=31f9a423&t=' + encodeURIComponent(query))
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .catch(function(error) {
        console.log(error.message);
        // Om något krånglar, loggar ut det
        })
    .then(function(data){
        console.log(data);
        console.log(query);
 
 
        // Skapar en div där all fakta om filmer läggs
        let film = document.createElement('div');
        film.classList.add('Film');
        film.style.maxWidth='25rem';
        film.style.boxSizing = "border-box";
        film.style.backgroundColor = '#ffffff';
        film.style.textAlign = 'left';
        film.style.padding = '10px';
       
 
        container.appendChild(film);
 
        let filmImg = document.createElement('img');
        film.classList.add('Film-poster');
        filmImg.src = data.Poster;
        filmImg.alt = 'Film-poster';
        filmImg.style.height = '400px'; //vid mindre pixlar blir bilden suddig
        filmImg.style.width = '100%';
        film.appendChild(filmImg);
 
        let filmTitle = document.createElement('h4');
         filmTitle.classList.add('Title');
         filmTitle.textContent = data.Title;
         filmTitle.style.paddingTop = '20px';
         filmTitle.style.fontFamily = '400';
         film.appendChild(filmTitle);
 
        let filmYear = document.createElement('p');
        filmYear.classList.add('Film-year');
        filmYear.textContent = 'Year: ' + data.Year;
        film.appendChild(filmYear);
 
        let filmWriter = document.createElement('p');
        filmWriter.classList.add('Film-writer');
        filmWriter.textContent = 'Writers: ' + data.Writer;
        film.appendChild(filmWriter);
 
        let filmActors = document.createElement('p');
        filmActors.classList.add('Film-actors');
        filmActors.textContent = 'Actors: ' + data.Actors;
        film.appendChild(filmActors);
 
        let filmTime = document.createElement('p');
        filmTime.classList.add('Film-time');
        filmTime.textContent = 'Runtime: ' + data.Runtime;
        film.appendChild(filmTime);
 
        let filmRating = document.createElement('p');
        filmRating.classList.add('Film-rating');
        filmRating.textContent = 'imdb rating: ' + data.imdbRating;
        film.appendChild(filmRating);
 
    });
   
}
