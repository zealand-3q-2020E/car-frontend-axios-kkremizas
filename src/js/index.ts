import axios, {​​ AxiosResponse, AxiosError}​​ from "../../node_modules/axios/index";
import {ICar} from "./ICar";
let timeout: any;

let carWebUrl: string = "https://webapicar20201108104414.azurewebsites.net/api/Cars";
let getAllButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
let clearGetAllListButton:HTMLButtonElement =<HTMLButtonElement> document.getElementById("clearGetAllListButton")
let getButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton")
let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton")
let updateButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("updateButton")
let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton")

let carsElement: HTMLUListElement = <HTMLUListElement> document.getElementById("carsContent");
let getContent: HTMLDivElement = <HTMLDivElement> document.getElementById("getContent");
let postContent: HTMLDivElement = <HTMLDivElement>document.getElementById("postContent");
let putContent: HTMLDivElement = <HTMLDivElement>document.getElementById("putContent");
let deleteContent: HTMLDivElement = <HTMLDivElement>document.getElementById("deleteContent");

getAllButton.addEventListener("click", GetAllCars);
getButton.addEventListener("click",GetCar);
clearGetAllListButton.addEventListener("click",ClearGetAllList);
addButton.addEventListener("click", AddCar);
updateButton.addEventListener("click", UpdateCar);
deleteButton.addEventListener("click", DeleteCar);

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

function AddCar(): void {
    let addVendorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendorInput");
    let addModelInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addModelInput");
    let addPriceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("addPriceInput");

    let myVendor: string = addVendorInput.value;
    let myModel: string = addModelInput.value;
    let myPrice: number = +addPriceInput.value;

    axios.post<ICar>(carWebUrl,
        { vendor: myVendor, model: myModel, price: myPrice })
        .then(function (response: AxiosResponse): void {
            console.log("Statuscode is :" + response.status);
            let message: string = response.data;
            postContent.innerHTML = message;
            // Clear postContent after 3 seconds
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                postContent.innerHTML = "";
            }, 3000);


        })
        .catch(
            function (error: AxiosError): void {
                console.log(error);
                postContent.innerHTML = "Wrong information entered. Try again!";

                // Clear postContent after 3 seconds
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    postContent.innerHTML = "";
                }, 3000);
            }
        )
}

function UpdateCar(): void {
    let updateIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("updateIdInput");
    let updateVendorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("updateVendorInput");
    let updateModelInput: HTMLInputElement = <HTMLInputElement>document.getElementById("updateModelInput");
    let updatePriceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("updatePriceInput");

    let myId: number = +updateIdInput.value;
    let myVendor: string = updateVendorInput.value;
    let myModel: string = updateModelInput.value;
    let myPrice: number = +updatePriceInput.value;

    axios.put<ICar>(carWebUrl + "/" + myId ,
        { id: myId, vendor: myVendor, model: myModel, price: myPrice })
        .then(function (response: AxiosResponse): void {
            console.log("Statuscode is :" + response.status);
            let message: string = response.data;
            putContent.innerHTML = message;

            // Clear postContent after 3 seconds
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                putContent.innerHTML = "";
            }, 3000);


        })
        .catch(
            function (error: AxiosError): void {
                console.log(error);
                putContent.innerHTML = "Wrong information entered. Try again!";

                // Clear postContent after 3 seconds
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    putContent.innerHTML = "";
                }, 3000);
            }
        )
}

function DeleteCar(): void {
    let deleteInput: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let myId: number = +deleteInput.value;

    axios.delete<ICar>(carWebUrl + "/" + myId)
        .then(function (response: AxiosResponse): void {
            console.log("Statuscode is :" + response.status);
            let message: string = response.data;
            deleteContent.innerHTML = message;

            // Clear postContent after 3 seconds
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                deleteContent.innerHTML = "";
            }, 3000);


        })
        .catch(
            function (error: AxiosError): void {
                console.log(error);
                deleteContent.innerHTML = "Wrong information entered. Try again!";

                // Clear postContent after 3 seconds
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    deleteContent.innerHTML = "";
                }, 3000);
            }
        )
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

