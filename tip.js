let bill = Number(prompt("Enter bill amount"));
let numberOfPeople = Number(prompt("Enter the number of people."));
let service = prompt("Enter the level of the service(good, fair or poor)");
let tip
if(bill == 0){
    console.log("Wrong amount.");
}
else if(bill > 300){
    tip = bill * 0.10;
}
else{
    tip = bill * 0.05;
}

let totalBill = bill + tip;

let fee = 0

switch(service){
    case "telebirr":
        fee = 5;
        break;

    case "CBE":
        fee = 10;
        break;

    default:
        alert("Invalid service");    
}

alert(totalBill += fee);
