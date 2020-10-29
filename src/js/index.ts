import axios, {​​ AxiosResponse, AxiosError}​​ from "../../node_modules/axios/index";
import {ICar} from "./ICar";

let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars";
let getAllButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
let getButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton")
let clearGetAllListButton:HTMLButtonElement =<HTMLButtonElement> document.getElementById("clearGetAllListButton")
let carsElement: HTMLUListElement = <HTMLUListElement> document.getElementById("carsContent");
let getContent: HTMLDivElement = <HTMLDivElement> document.getElementById("getContent");

getAllButton.addEventListener("click", GetAllCars);
getButton.addEventListener("click",GetCar);
clearGetAllListButton.addEventListener("click",ClearGetAllList);


function GetAllCars():void{
    axios.get<ICar[]>(carWebUrl)
    .then(function(AxiosResponse):void{
        console.log(AxiosResponse);
        console.log("Status Code: ",AxiosResponse.status);
        ClearGetAllList();
        AxiosResponse.data.forEach((car: ICar) => {
         let newNode:HTMLLIElement = AddLiElement("ID: "+car.id+", Vendor: " +car.vendor+", Model: " + car.model +  ", Price: "+car.price);
         carsElement.appendChild(newNode);
        });
    })
    .catch(function(error:AxiosError):void{
        console.log(error);
        let errorMessage = "Error Code: "+error.response.status;
        console.log(errorMessage);
    })
}

function GetCar():void{
    let getInput: HTMLInputElement = <HTMLInputElement> document.getElementById("getInput");
    let getInputValue : number = +getInput.value;
    axios.get(carWebUrl + "/" + getInputValue)
    .then(function(response: AxiosResponse<ICar>):void{
        console.log(response);
        console.log("Statuscode is :" + response.status);
        let car:ICar = response.data;
        console.log(car);
        if (response.status!=204){
            getContent.innerHTML = "ID: "+car.id+"<br>Vendor: " +car.vendor+",<br>Model: " + car.model +  ",<br>Price: "+car.price;
        }
        else {
            getContent.innerHTML = "No car found with this ID. Try again!";
        }
    })
    .catch(function(error:AxiosError):void{
        console.log(error);
    })
}


function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
    return newLi;
}

function ClearGetAllList():void{
    while (carsElement.firstChild){
        carsElement.removeChild(carsElement.lastChild)
    }
}

