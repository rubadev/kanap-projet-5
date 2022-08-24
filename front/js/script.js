let produitData = [];

const fetchProduit = async () => {
 await fetch ("http://localhost:3000/api/products").then((res) => res.json())
 .then((promi) => {
    produitData = promi;
    console.log(produitData);
 });
};

const productsDisplay = async () => {
    await fetchProduit();

    
    document.getElementById("items").innerHTML = produitData.map(
        (produit) => `<a href="./product.html?${produit._id}"><article><img src="${produit.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1" /><h3 class="productName">${produit.name}</h3><p class="productDescription">${produit.description}</p></article></a>`).join("");




};  



productsDisplay();