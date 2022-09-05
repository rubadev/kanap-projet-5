let url = `http://localhost:3000/api/products/`; //methode GET "/"

//appel de l'API: Catalogue de canapés
fetch(url)
.then(data => { if (data.ok) { return data.json(); }})
.then(dataList => {
    
    //affichage des éléments récupérer depuis l'API
    class Product{
        constructor(productData){
            productData && Object.assign(this, productData);
        }
    }
    for(let productData of dataList ) {
        let product = new Product(productData);
        
        //selectioner la class ou on injecte le code HTML
        const section = document.querySelector('.items');
       
        //la structure HTML pour l'affichage des produits
        const structure = `
        <a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
        </a> 
        `
        //injection des produit dans la page HTML
        section.innerHTML += structure;
    }
}).catch(err => { console.log('ERREUR : ' + err)});





