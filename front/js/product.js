const productID = window.location.search.split("?").join("");

let itemData =[];
const fetchItem = async() => {
    await fetch (`http://localhost:3000/api/products/${productID}`).then((res) => res.json())
    .then((promi) => {
        itemData = promi;
      // console.log(itemData);
    });
   };

const itemDisplay = async() =>{
    await fetchItem(); 

    let image_div = document.querySelector(".item__img");
    let image =document.createElement("img");
    image.src=`${itemData.imageUrl}`;
    image.alt="Photographie d'un canapé";
    image_div.appendChild(image);
   
    document.getElementById("title").textContent =`${itemData.name}`;
    document.getElementById("price").textContent =`${itemData.price}`;
    document.getElementById("description").textContent =`${itemData.description}`;

    let color=document.getElementById("colors");
    itemData.colors.forEach(coleur => {
        let option= document.createElement("option");
        option.innerHTML=`${coleur}`;
        option.value=`${coleur}`;
        color.appendChild(option);
    });

    ajouterAuPanier();
};

itemDisplay();


const ajouterAuPanier = () => {
   let botton = document.getElementById("addToCart");
   
   botton.addEventListener("click", () => {
     let itemTable = JSON.parse(localStorage.getItem("produit"));
     let select = document.getElementById("colors");
     let quantityValeur =document.getElementById("quantity");
     
    const itemDataNewObjet = Object.assign({},itemTable ,{
        colorSelected :`${select.value}`,
        quantity :`${quantityValeur.value}`,
        id : itemData._id,
        name : itemData.name,
        img : itemData.imageUrl,
        price: itemData.price


    });
    
    
    if (itemTable == null){
        itemTable=[];
        itemTable.push(itemDataNewObjet);
        console.log(itemTable);
        localStorage.setItem("produit", JSON.stringify(itemTable));
   } 
   else if(itemTable != null){
    for(i=0; i<itemTable.length ; i++){
        if(itemTable[i].id == itemData._id && itemTable[i].colorSelected == select.value){
           return (itemTable[i].quantity++ , 
                   localStorage.setItem(("produit"),JSON.stringify(itemTable)),
                   (itemTable = JSON.parse(localStorage.getItem("produit")))
                   );
           
        }
    }
    for(i=0; i<itemTable.length ; i++){
        if(itemTable[i].id == itemData._id && itemTable[i].colorSelected != select.value || itemTable[i].id != itemData._id){
            return (console.log("new"),
            itemTable.push(itemDataNewObjet),
            localStorage.setItem("produit", JSON.stringify(itemTable)),
            itemTable = JSON.parse(localStorage.getItem("produit"))
            );
        }
    }
    
   }
   })
   return  (itemTable= JSON.parse(localStorage.getItem("produit"))) ;

   
};