// Import stylesheets
import './style.css';

// Write Javascript code!
//const appDiv = document.getElementById('app');
//appDiv.innerHTML = `<h1>JS Starter</h1>`;

/* fetch("https://i.ibb.co/VLJJKCg/image.png")
.then( response => {
  if(response.ok) {
      return response.blob();
  } else {
    throw new Error(`Error while fetching image : ${response.statusText}`);
  }
})
.then(myBlob => {
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image)  
})
.catch(reason => console.error(`Une erreur est survenue : ${reason.message}`)); */

function fetchAndDecode(url, type) {
  return fetch(url).then(response => {
    if(!response.ok){
      throw new Error (`Erreur HTTP! statut = ${response.status} : ${response.statusText}`);
    } else {
        if("blob" === type){
          return response.blob();
        } else if("text" === type){
          return response.text();
        }
    }
  })
  .catch(reason => `Error while fetching the ressource ${url} : ${reason.message}`);
}

let coffee = fetchAndDecode("https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/promises/coffee.jpg","blob");

let tee = fetchAndDecode("https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/promises/tea.jpg","blob");

let description = fetchAndDecode("https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/promises/description.txt","text");

Promise.all([coffee,tee,description]).then(values => {
  console.log(values);
// Stocke chaque valeur renvoyée par les promesses dans
// des variables distinctes ; crée des URL d'objets à partir des blobs.
let objectURL1 = URL.createObjectURL(values[0]);
let objectURL2 = URL.createObjectURL(values[1]);
let descText = values[2];

// Affiche les images dans les éléments <img>
let image1 = document.createElement('img');
let image2 = document.createElement('img');
image1.src = objectURL1;
image2.src = objectURL2;
document.body.appendChild(image1);
document.body.appendChild(image2);

// Affiche le texte d'un paragraphe
let para = document.createElement('p');
para.textContent = descText;
document.body.appendChild(para);

});