//sauvgarder un produit dans le localStorage
function ajouterAuStorage(basket){

    localStorage.setItem("basket", JSON.stringify(basket) );
}



//recupérer un produit depuis le localStorage 
function getProductDeStorage() {

   let basket = localStorage.getItem("basket");
   if(basket == null){
       return [];
   }else{
    return JSON.parse(basket);
   }
}



//ajouter un produit au le localStorage
function ajouterAuPanier(product){
    
    let basket = getProductDeStorage();
    if (basket.lenght ){
        basket.push(product);
    }else{
        let foundProduct = basket.find(p => p.id == product.id && p.color == product.color) ;
        if (foundProduct != undefined) {
            const oldQuantity = parseInt(foundProduct.quantity);
            const newQuantity = parseInt(product.quantity) + oldQuantity;
            foundProduct.quantity = newQuantity;
        }else{
            basket.push(product);
        }
    }
    ajouterAuStorage(basket);
}



//calculer le nombre total de produit 
function getNumberProduct(){

    let basket = getProductDeStorage();
    let number = 0;
    for(let product of basket){
        number += parseInt(product.quantity);
    }
    return number;   
}



//calculer le prix total des produit
function getTotalPrice(products){

    let basket = getProductDeStorage();
    let total = 0;
    for(let product of basket){
        const curentProduct = products.find(element => element._id == product.id);
        total += parseInt(product.quantity) * parseInt(curentProduct.price);
    }
    return total;  
}



//changer la quantitée
function modifyQuantity(){
   
    let basket = getProductDeStorage() ;
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let j = 0; j < itemQuantity.length; j++ ){ 

        itemQuantity[j].addEventListener("change", (event) =>{
        
            let productId = basket[j].id;
            let productColor = basket[j].color;
            let productQuantity = basket[j].quantity;
            let inputQuantity = itemQuantity[j].value;
            
            //Je selectionne l'élément à modifier selon son Id et sa couleur
            let result = basket.find(p => p.id == productId && p.color == productColor);
            console.log(result);
   
            result.quantity = inputQuantity;
            productQuantity = result.quantity;
   
            ajouterAuStorage(basket);
   
            location.reload();
            alert("votre panier est à jour.")
         
        });
   }
}



//spprimer article
function removeFromBasket() {
    
    let deleteItem = document.querySelectorAll(".deleteItem");
    let basket = getProductDeStorage();
    
    for (let k=0; k < deleteItem.length; k++)
    { 
       deleteItem[k].addEventListener("click", (event) =>
       {
          event.preventDefault()
            
          //Je selectionne l'élément à modifier selon son Id et sa couleur
          let deleteId= basket[k].idProduct;
          let deleteColor= basket[k].color;
 
          basket = basket.filter(
          (element) => element.idProduct !== deleteId || element.color !== deleteColor);
          ajouterAuStorage(basket) ;
 
          location.reload();
          alert("Votre article a bien été supprimé.");
       })
    }
}
