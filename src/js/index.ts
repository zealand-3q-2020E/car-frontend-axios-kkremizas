import axios, {​​ AxiosResponse, AxiosError}​​ from "../../node_modules/axios/index";
import {ICar} from "./ICar";

let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars";
let getAllButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
let getButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton")
let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsContent");
let getInput: HTMLInputElement = <HTMLInputElement> document.getElementById("getInput");
let getInputValue : number = +getInput.value;
let getContent:HTMLDivElement=<HTMLDivElement> document.getElementById("getContent")

getAllButton.addEventListener("click", GetAllCars);
getButton.addEventListener("click",GetCar);


function GetAllCars():void{
    axios.get<ICar[]>(carWebUrl)
    .then(function(AxiosResponse):void{
        console.log(AxiosResponse);
        console.log("Status Code: ",AxiosResponse.status);
        while (ContentElement.firstChild){
            ContentElement.removeChild(ContentElement.lastChild)
        }
        AxiosResponse.data.forEach((car: ICar) => {
         let newNode:HTMLLIElement = AddLiElement("Vendor: " +car.vendor+", Model: " + car.model +  ", Price: "+car.price);
            ContentElement.appendChild(newNode);
        });
    })
    .catch(function(error:AxiosError):void{
        console.log(error);
        let errorMessage = "Error Code: "+error.response.status;
        console.log(errorMessage);
        while (ContentElement.firstChild){
            ContentElement.removeChild(ContentElement.lastChild)
        }
        let newNode:HTMLLIElement = AddLiElement(errorMessage);
        ContentElement.appendChild(newNode);
    })
}

function GetCar():void{
    axios.get<ICar>(carWebUrl + getInputValue)
    .then(function(AxiosResponse):void{
        console.log(AxiosResponse);
        console.log("Status Code: ",AxiosResponse.status);
        // getContent.innerHTML="AxiosResponse";
        })
    .catch(function(error:AxiosError):void{
        console.log(error);
        let errorMessage = "Error Code: "+error.response.status;
        console.log(errorMessage);
    })
}




function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
}
