//recuperrer l'ID du produit
const keyUrl = window.location.search;
const keyValue = new URLSearchParams(keyUrl);
const id = keyValue.get('id');

let url = `http://localhost:3000/api/products/${id}`;

///appel de l'API: Catalogue de canapés
fetch(url)
.then(data => { if (data.ok) { return data.json(); }})
.then(product => {
    
    //image du produit
    const containerImg = document.querySelector('.item__img');
    const structureImg = `<img src="${product.imageUrl}" alt=${product.altTxt}>`
    containerImg.innerHTML = structureImg;

    //titre du produit
    const containerTitle = document.querySelector('#title');
    const structureTitle = `${product.name}`
    containerTitle.innerHTML = structureTitle;

    //prix du produit
    const containerPrice = document.querySelector('#price');
    const structurePrice = `${product.price}`
    containerPrice.innerHTML = structurePrice;

    //Description du produit
    const containerDescription = document.querySelector('#description');
    const structureDescription = `${product.description}`
    containerDescription.innerHTML = structureDescription;

    //couleur du produit
    const containerColor = document.getElementById('colors');
    product.colors.forEach(color => {
        
        structureColor = document.createElement("option")
        structureColor.value = `${color}`
        structureColor.innerHTML = `${color}`
        
        containerColor.appendChild(structureColor);

    });
    
}).catch(err => { console.log('ERREUR : ' + err)});




///******** Ajout au panier ***********


let button = document.getElementById("addToCart");
button.onclick = () => {

    //recupérer la couleur séléctionner 
    const containerColor = document.getElementById('colors');
    let selcteColor = containerColor.options[containerColor.selectedIndex].text;
    //recupérer la quantitée séléctionner 
    let selcteQuantity = document.querySelector("#quantity").value;
    //crée un tableau du produit 
    let product = {
        id : id,
        color : selcteColor,
        quantity : selcteQuantity 
    } 

    if (containerColor.value == ""){

        alert("veuillez choisir une couleur");

    }else if(selcteQuantity == 0){

        alert("veuillez choisir une quantitée");

    } else{
        
        //sauvegarder le produit 
        ajouterAuPanier(product);
        alert("votre article a été ajouter au panier");
    }
   
}


