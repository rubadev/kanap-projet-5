//récupérer donnée du produit depuis le locale storager
let productBasket = getProductDeStorage();

let url = `http://localhost:3000/api/products/`; //methode GET "/"

fetch(url)
.then(data => { if (data.ok) { return data.json(); }})
.then(dataList => {
    
    productBasket.forEach(product => {

        //on ne garde que les produit qui ont le méme ID que ceux du panier  
        const found = dataList.find(element => element._id == product.id);
        
        //selectioner la class ou on injecte le code HTML
        const section = document.getElementById('cart__items');
       
        //la structure HTML pour l'affichage des produits
        const structure = `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${found.imageUrl}" alt="${found.altTxt}">
             </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${found.name}</h2>
                    <p>${product.color}</p>
                    <p>${found.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" >Supprimer</p>
                    </div>
                </div>
            </div>
         </article> 
        `
        //injection des produit dans la page HTML
        section.innerHTML += structure;
    
        
    });
    
    //calculer le nombre total d'article dans le panier
    let totalQuantity = getNumberProduct();
    let divTotalQuantity = document.getElementById("totalQuantity");
    divTotalQuantity.innerHTML = totalQuantity;
    
    //calculer le prix total du panier
    let totalPrice = getTotalPrice(dataList);
    let divTotalPrice = document.getElementById("totalPrice");
    divTotalPrice.innerHTML = totalPrice;
    
    modifyQuantity();
    removeFromBasket();
    
}).catch(err => { console.log('ERREUR : ' + err)});



///*********************************  Formulaire  *******************************

/// ***** RegExp Prenom *****

let firstName = document.getElementById('firstName');
firstName.addEventListener('change', function(){
    validName(this);
})

const validName = function(inputName){
    //creation de la RegExp pour validation Prenom
    let nameRegExp = new RegExp('^[a-zA-Z -]+$', 'g');

    let nameError = document.getElementById('firstNameErrorMsg');
    // test de la RegExp Prenom
    let testName = nameRegExp.test(inputName.value);
    if(testName == true){
        nameError.innerHTML = '';
    }
    else{
        nameError.innerHTML = 'Prénom Invalide';
    }
};



/// ***** RegExp Nom *****

let lastName = document.getElementById('lastName');
lastName.addEventListener('change', function(){
    validLastName(this);
})

const validLastName = function(inputName){
    //creation de la RegExp pour validation Nom
    let nameRegExp = new RegExp('^[a-zA-Z -]+$', 'g');
    
    let nameError = document.getElementById('lastNameErrorMsg');
    // test de la RegExp Nom
    let testName = nameRegExp.test(inputName.value);
    if(testName == true){
        nameError.innerHTML = '';
    }
    else{
        nameError.innerHTML = 'Nom Invalide';
    }
};



/// ***** RegExp Adresse *****

let address = document.getElementById('address');
address.addEventListener('change', function(){
    validAddress(this);
})

const validAddress = function(inputAddress){
    //creation de la RegExp pour validation de l'Adresse
    let addressRegExp = new RegExp('^[a-zA-Z0-9 -^]+$', 'g');

    let addressError = document.getElementById('addressErrorMsg');
    // test de la RegExp Adresse
    let testAddress = addressRegExp.test(inputAddress.value);
    if(testAddress == true){
        addressError.innerHTML = '';
    }
    else{
        addressError.innerHTML = 'Adresse non valide';
    }
};



/// ***** RegExp Ville *****

let city = document.getElementById('city');
city.addEventListener('change', function(){
    validCity(this);
})

const validCity = function(inputCity){
    //creation de la RegExp pour validation de la Ville
    let cityRegExp = new RegExp('^[a-zA-Z0-9 -^]+$', 'g');

    let cityError = document.getElementById('cityErrorMsg');
    // test de la RegExp Ville
    let testCity = cityRegExp.test(inputCity.value);
    if(testCity == true){
        cityError.innerHTML = '';
    }
    else{
        cityError.innerHTML = 'Ville non valide';
    }
};



/// ***** RegExp Email *****

let email = document.getElementById('email');
email.addEventListener('change', function(){
    validEmail(this);
})

const validEmail = function(inputEmail){
    //creation de la RegExp pour validation de l'Email
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let emailError = document.getElementById('emailErrorMsg');
    // test de la RegExp Email
    let testEmail = emailRegExp.test(inputEmail.value);
    if(testEmail == true){
        emailError.innerHTML = '';
    }
    else{
        emailError.innerHTML = 'Email non valide';
    }
};

//// ************************************** commander *******************************

let orderBtn = document.getElementById('order');

orderBtn.addEventListener('click', e => {
    
    const productsId = productBasket.map(p => p.id) ;

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    if (
        !firstName ||
        !lastName ||
        !address ||
        !city ||
        !email 
      ) {

        alert("Vous devez renseigner tous les champs !");
        e.preventDefault();

      } else {

          const order = {
            contact: {
              firstName: firstName,
              lastName: lastName,
              city: city,
              address: address,
              email: email,
            },
            products: productsId,
          };
          
          let url = `http://localhost:3000/api/products/order`;
      
          const option = {
              method: "POST",
              body: JSON.stringify(order),
              headers: { "Content-Type": "application/json" },
          };
      
          fetch(url, option)
          .then(data => { if (data.ok) { return data.json(); }})
          .then(data => {
              
              localStorage.clear();
              localStorage.setItem("orderId", data.orderId );
              window.location.replace("./confirmation.html?orderId="+ data.orderId );
              
          }).catch(err => { console.log('ERREUR : ' + err)});
        
    } 



    
});
    







