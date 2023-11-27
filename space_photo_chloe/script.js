const url = "https://api.nasa.gov/planetary/apod";
const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";
let nextDay = dateFormat(getNextDay())

function getNextDay() {

   let today = new Date()
   let nextDay = new Date()
   nextDay.setDate(today.getDate() - 2)
   return nextDay
}

function dateFormat(date) {
   let year = date.getFullYear()
   let month = ("0" + (date.getMonth() + 1)).slice(-2)
   let day = ("0" + date.getDate()).slice(-2)
   return `${year}-${month}-${day}`
}


fetch(`${url}?api_key=${api_key}`)
 .then(response => {
  console.log('Response:', response);
  return response.json();
 })
 .then(data => {
    console.log('Data:', data);

    spaceURL = data.url

    document.getElementById('image-space').src = spaceURL
   
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

 fetch(`https://api.nasa.gov/planetary/apod?date=${nextDay}&api_key=${api_key}`)
 .then(response => {
  console.log('Response:', response);
  return response.json();
 })
 .then(data => {
    console.log('Data:', data);
    spaceURL2 = data.url

    document.getElementById('image-space2').src = spaceURL2


 })
 .catch(error => {
  console.error('Error:', error);
 });


