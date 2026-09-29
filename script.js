const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";
let images = []



//recup de la data
fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
 .then(response => {
   if(response.ok) {
      console.log("Clé Valide")
   } else {
      console.log("Clé non valide")
   }


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
    //on coupe le texte en phrases puis on les regroupe par paquets d'environ 300 caractères pour faire des paragraphes
    const phrases = description.split(/(?<=[.!?])\s+(?=[A-Z])/)
    const paragraphes = []
    let paragraphe = ''
    phrases.forEach(phrase => {
       if (paragraphe && paragraphe.length + phrase.length > 300) {
          paragraphes.push(paragraphe)
          paragraphe = ''
       }
       paragraphe += (paragraphe ? ' ' : '') + phrase
    })
    if (paragraphe) paragraphes.push(paragraphe)

    addDescriptif.innerHTML = '' // on vide le texte provisoire
    paragraphes.forEach(texte => {
       const p = document.createElement('p')
       p.textContent = texte
       addDescriptif.appendChild(p)
    })
   
    const titre = data.title
    const addTitre = document.getElementById('title')
    addTitre.innerHTML = titre

    const publication = data.date
    const addDate = document.getElementById('date')
    addDate.innerHTML= publication

 })
   .catch(error => {
      console.error('Error:', error);
      document.getElementById('title').textContent = "Couldn't load today's photo, try again later."
   });


for(let i = 1 ; i < 5 ; i++) {

   //on repart d'aujourd'hui à chaque tour pour avoir J-1, J-2, J-3, J-4
   let date = new Date()
   date.setDate(date.getDate() - i)

   let year = date.getFullYear()
   let month = ("0" + (date.getMonth() + 1)).slice(-2)
   let day = ("0" + date.getDate()).slice(-2)

   fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${year}-${month}-${day}`)
   .then(response => {
      console.log('Response:', response);
      return response.json();
   })
   .then(data => {
      console.log('Data:', data);

      //on range l'image à sa place (i - 1) peu importe l'ordre d'arrivée des réponses
      images[i - 1] = data.url
      document.getElementById(`image-space${i + 1}`).src = data.url

      //titre et date sous chaque image
      document.getElementById(`title-space${i + 1}`).textContent = data.title
      document.getElementById(`date-space${i + 1}`).textContent = data.date
   })
   
   .catch(error => {
   });
}

//Pop-upde l'image 1
function popupImage1() {

   var popup = window.open('', 'Image Pop-up', 'width=600,height=400');

   popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
   popup.document.write('<img src="' + spaceURL + '" alt="Image" style="width:100%; height:auto; display:block;">');
   popup.document.write('</body></html>');
   popup.document.close();
}
   
   popupImage1();

//Pop-upde l'image 2
function popupImage2() {

   var popup = window.open('', 'Image Pop-up', 'width=600,height=400');

   popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
   popup.document.write('<img src="' + images[0] + '" alt="Image" style="width:100%; height:auto; display:block;">');
   popup.document.write('</body></html>');
   popup.document.close();
}
   
   popupImage2();

//Pop-upde l'image 3
function popupImage3() {

   var popup = window.open('', 'Image Pop-up', 'width=600,height=400');

   popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
   popup.document.write('<img src="' + images[1] + '" alt="Image" style="width:100%; height:auto; display:block;">');
   popup.document.write('</body></html>');
   popup.document.close();
}
   
   popupImage3();

//Pop-upde l'image 4
function popupImage4() {

   var popup = window.open('', 'Image Pop-up', 'width=600,height=400');

   popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
   popup.document.write('<img src="' + images[2] + '" alt="Image" style="width:100%; height:auto; display:block;">');
   popup.document.write('</body></html>');
   popup.document.close();
}
   
   popupImage4();

//Pop-upde l'image 5
function popupImage5() {

   var popup = window.open('', 'Image Pop-up', 'width=600,height=400');

   popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
   popup.document.write('<img src="' + images[3] + '" alt="Image" style="width:100%; height:auto; display:block;">');
   popup.document.write('</body></html>');
   popup.document.close();
}
   
   popupImage5();
