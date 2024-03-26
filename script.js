const api_key = "nyAfB7JXz5pufTPcJBHue2c8DBILeTaHZviBTzEU";
let fetchObjects = []
 let date = new Date()
let promises = []



// console.log(dateDuJour.year + "-" + dateDuJour.month +  "-" + dateDuJour.day);
// for(let i = 0 ; i < 5 ; i++) {
//    function getDateobject () {
//       const date = new Date(); // Appel de la fonction existante pour obtenir la date
//       const dateObject = {
//           year: date.getFullYear(),
//           month: ("0" + (date.getMonth() + 1)).slice(-2), // Les mois commencent à 0, donc on ajoute 1
//           day: ("0" + date.getDate()).slice(-2),
//          };
   
//          return dateObject;
         
         
//       }
      
      

      /*const dateDuJour = getDateobject();*/
      
      
      // let dateDuJour = new Date();
      // dateDuJour.setDate(dateDuJour.getDate() - i);
      // let dateObject = getDateObject(dateDuJour);
      // promises.push(getImages(dateObject));

      // on a la date du jour grâce à l'objet dateObject qu'on appelle la fonction getDateobject.

   let year = date.getFullYear()
   let month = ("0" + (date.getMonth() + 1)).slice(-2)
   let day = ("0" + date.getDate()).slice(-2) 
 
 
 async function getImages() {
         try {
            let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${dateDuJour.year}-${dateDuJour.month}-${dateDuJour.day}`)
            
            if(!response.ok) {
               throw new Error('Cannot get images');
            }

            //Si la date du l'image fetch.date = à la date du jour            
            
            const images = await response.json()
            fetchObjects.push(images)
            
            // console.log(images)
            const imageElement = document.createElement('img')
            imageElement.src = images.url
            document.body.appendChild(imageElement)
         } catch (error) {
            console.error('Failed to load images : ', error)
         }
         
      promises.push(getImages());

   }
   

Promise.all(promises).then((resolve) => {
  console.log(fetchObjects)

  const imageSpace = document.getElementById('image-space')
  imageSpace.src = fetchObjects[0].url

   const titleSpace = document.getElementById('title')

   titleSpace.innerHTML = fetchObjects[0].title

   const descriptif = document.getElementById('descriptif')
   descriptif.innerHTML = fetchObjects[0].explanation 

   const date = document.getElementById('date')
   date.innerHTML = fetchObjects[0].date


   //on veut prendre la class gallery, et affiche à l'aide d'une boucle for où une élément correspond à un lien d'une image.

   const contenuGallery = document.getElementsByClassName('gallery').innerHTML = "<p>Salut<p/>"



});

 console.log(date)




// ArrayImages = [image1, images2]
// ArrayImages[0].url
//recup de la data
// fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
//  .then(response => {
//    if(response.ok) {
//       console.log("Clé Valide")
//    } else {
//       console.log("Clé non valide")
//    }


//     console.log('Response:', response);
//     return response.json();
//  })
//  .then(data => {
//     console.log('Data:', data);

//     spaceURL = data.url

//     document.getElementById('image-space').src = spaceURL
   
//     //Pour display la description
//     const description = data.explanation //ici, on va chercher le description dans l'objet 'data'
//     const addDescriptif = document.getElementById('descriptif')//on return la valeur 'addDescriptif' là où il y a l'id 'descriptif'
//     addDescriptif.innerHTML = description // on dit que 'description' représente 'addDescriptif' et on va avec innerHTLM, l'écrire sur la page html
   
//     const titre = data.title
//     const addTitre = document.getElementById('title')
//     addTitre.innerHTML = titre

//     const publication = data.date
//     const addDate = document.getElementById('date')
//     addDate.innerHTML= publication

//  })
//    .catch(error => {
//       console.error('Error:', error);
//    });


// for(let i = 0 ; i < 5 ; i++) {
      
//    date.setDate(date.getDate() - i) 

//    let year = date.getFullYear()
//    let month = ("0" + (date.getMonth() + 1)).slice(-2)
//    let day = ("0" + date.getDate()).slice(-2)

// fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${year}-${month}-${day}`)
//    .then(response => {
//       console.log('Response:', response);
//       return response.json();
//    })
//    .then(data => {
//       console.log('Data:', data);
      
//       images.push(data.url)

//       // images.map(imageUrl => {
//       //    const gallery = document.getElementsByClassName('gallery')
//       //    const newImages = document.createElement('img')

//       //    newImages.src = imageUrl

//       //    document.body.appendChild(newImages)

//       //    //afficher les images avec boucle qui remplace à chaque itération le lien et donc innerHTML
//       // })
//       //    const newImages = document.createElement('img')
//       //    const spaceURL2 = images[0]
//       //    newImages.src = spaceURL2

//       //    document.body.appendChild(newImages)
   
      
//       // console.log(images)




//       let spaceURL2 = images[0]
//       document.getElementById('image-space2').src = spaceURL2
      
//       let spaceURL3 = images[1]
//       document.getElementById('image-space3').src = spaceURL3

//       let spaceURL4 = images[2]
//       document.getElementById('image-space4').src = spaceURL4

//       let spaceURL5 = images[3]
//       document.getElementById('image-space5').src = spaceURL5
//    })
   
//    .catch(error => {
//    });
//    console.log(i)
// }

// const img = document.createElement("img");
// img.src = "https://picsum.photos/200/301";
// document.body.appendChild(img);

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
   
   // popupImage5();
