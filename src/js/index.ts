import axios, {​​ AxiosResponse, AxiosError}​​ from "../../node_modules/axios/index";
import {ICar} from "./ICar";

let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars";
let buttonElement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("myButton")
let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsContent");

document.getElementById("myButton").addEventListener("click", GetAllCars)

function GetAllCars(){
    axios.get<ICar[]>(carWebUrl)
    .then(function(AxiosResponse){
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
    .catch(function(error:AxiosError){
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

function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
}
