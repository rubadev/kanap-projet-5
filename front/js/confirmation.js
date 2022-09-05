let orderIdStorage = localStorage.getItem("orderId");


const orderDisplay = async()=> {

    if(orderIdStorage){
    
        let commandeNumber = document.getElementById("orderId");
        commandeNumber.innerHTML=orderIdStorage;
        console.log(commandeNumber);
    }
    return
};

orderDisplay();