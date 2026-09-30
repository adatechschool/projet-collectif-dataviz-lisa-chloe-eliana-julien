//nouvelle API officielle de la NASA (l'ancienne api.nasa.gov/planetary/apod est retirée)
//un seul appel renvoie les 25 dernières photos, de la plus récente à la plus ancienne, et pas besoin de clé
const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic'

let spaceURL = ''
let images = []

//les images sont en très grande taille, on demande au serveur de la NASA une version plus petite
function imageRedimensionnee(url, largeur) {
   const lien = new URL(url)
   lien.searchParams.set('w', largeur)
   lien.searchParams.delete('h')
   return lien.toString()
}

//l'explication arrive en HTML : on garde le texte principal (avant les annonces de la NASA)
//et on enlève les balises et le "Explanation:" du début
function texteExplication(html) {
   const principal = html.split('<br><br>')[0]
   const texte = new DOMParser().parseFromString(principal, 'text/html').body.textContent
   return texte.replace(/^\s*Explanation:\s*/, '').trim()
}

//recup de la data
//si la NASA ne répond pas en 15 secondes, on abandonne et on affiche le message d'erreur
fetch(APOD_URL, { signal: AbortSignal.timeout(15000) })
 .then(response => {
   console.log('Response:', response);
   if (!response.ok) {
      //l'API a répondu par une erreur (ex : 504 quand elle est en panne), on passe directement au catch
      throw new Error(`API error ${response.status}`)
   }
   return response.json();
 })
 .then(liste => {
    console.log('Data:', liste);

    //on garde seulement les jours qui ont une image
    const jours = liste.filter(jour => jour.hdurl)
    if (jours.length === 0) {
       throw new Error('Aucune image')
    }

    afficherPhotoDuJour(jours[0])
    afficherGalerie(jours.slice(1, 5))
 })
   .catch(error => {
      console.error('Error:', error);
      document.getElementById('title').textContent = "Couldn't load today's photo, try again later."
      document.getElementById('gallery-title').style.display = 'none'
      document.querySelector('.gallery').style.display = 'none'
   })
   .finally(() => {
      //on enlève la roue de chargement dans tous les cas (succès ou erreur)
      document.getElementById('loader').remove()
   });


function afficherPhotoDuJour(data) {
    //la grande version pour le pop-up, une version plus légère pour la page
    spaceURL = data.hdurl
    const image = document.getElementById('image-space')
    image.src = imageRedimensionnee(data.hdurl, 1200)
    image.alt = data.alt || data.title

    //Pour display la description
    const description = texteExplication(data.explanation) //ici, on va chercher le description dans l'objet 'data'
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

    document.getElementById('title').textContent = data.title
    document.getElementById('date').textContent = data.date
}


function afficherGalerie(jours) {
   //on cache les cases en trop s'il y a moins de 4 jours avec une image
   for (let i = 0 ; i < 4 ; i++) {
      const jour = jours[i]
      const image = document.getElementById(`image-space${i + 2}`)

      if (!jour) {
         image.closest('.gallery-item').style.display = 'none'
         continue
      }

      //grande version pour le pop-up, petite version pour la galerie
      images[i] = jour.hdurl
      image.src = imageRedimensionnee(jour.hdurl, 400)
      image.alt = jour.alt || jour.title

      //titre et date sous chaque image
      document.getElementById(`title-space${i + 2}`).textContent = jour.title
      document.getElementById(`date-space${i + 2}`).textContent = jour.date
   }
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
