const url = "https://api.nasa.gov/planetary/apod";
const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";

fetch(`${url}?api_key=${api_key}`)
 .then(response => {
  console.log('Response:', response);
  return response.json();
 })
 .then(data => {
    console.log('Data:', data);
    const img = new Image()
    img.src = data.url
    document.body.appendChild(img)
 

 })
 .catch(error => {
  console.error('Error:', error);
 });

