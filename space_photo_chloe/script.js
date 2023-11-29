const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";
let images = []
let date = new Date()



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


for(let i = 1 ; i < 5 ; i++) {
      
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
      
      images.push(data.url)
      let spaceURL2 = images[0]
      document.getElementById('image-space2').src = spaceURL2
      
      let spaceURL3 = images[1]
      document.getElementById('image-space3').src = spaceURL3

      let spaceURL4 = images[2]
      document.getElementById('image-space4').src = spaceURL4

      let spaceURL5 = images[3]
      document.getElementById('image-space5').src = spaceURL5
   })
   
   .catch(error => {
   });
}
      







 
 //Pop-upde l'image 1
 function popupImage() {
 
    var popup = window.open('', 'Image Pop-up', 'width=600,height=400');
 
    popup.document.write('<html><head><title>Image Pop-up</title></head><body style="margin:0;text-align:center;background: #111">');
    popup.document.write('<img src="' + spaceURL + '" alt="Image" style="width:100%; height:auto; display:block;">');
    popup.document.write('</body></html>');
    popup.document.close();
 }
    
    popupImage();
 

