const url = "https://api.nasa.gov/planetary/apod";
const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";

fetch(`${url}?api_key=${api_key}`)
 .then(response => {
  console.log('Response:', response);
  return response.json();
 })
 .then(data => {
    console.log('Data:', data);

    //Pour display l'image
    const img = new Image()
    const addImage = document.getElementById('photo')
    img.src = data.url // ici, le .src correspond à l'url de l'image donc on va chercher dans l'objet 'data' .url
    img.id = "image-space"


    document.body.appendChild(img) //dessine l'image sur la page html
    document.body.insertBefore(img, document.getElementById('descriptif'))


    //Pour display la description
    const description = data.explanation //ici, on va chercher le description dans l'objet 'data'
    const addDescriptif = document.getElementById('descriptif')//on return la valeur 'addDescriptif' là où il y a l'id 'descriptif'
    addDescriptif.innerHTML = description // on dit que 'description' représente 'addDescriptif' et on va avec innerHTLM, l'écrire sur la page html
   
    const titre = data.title
    const addTitre = document.getElementById('title')
    addTitre.innerHTML = titre

    const publication = data.date
    const addDate = document.getElementById('date')
    addDate.innerHTML= publication
 })
 .catch(error => {
  console.error('Error:', error);
 });

