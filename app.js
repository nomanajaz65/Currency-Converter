const BASE_URL = 
 "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');  //form ke andar se select ko access
const msg = document.querySelector('.msg');



for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = 'selected';
        }
        else if (select.name === 'to' && currCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        upDateFlag(evt.target)
    });
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    // console.log(amtVal);
     
    if (amtVal === '' || amtVal<1){
        amtVal = 1;
        amount.value = '1';
    }

    // console.log(fromCurr.value,toCurr.value);    // USD  INR
 
const URL = `${BASE_URL}/${currencies.value.toLowerCase()}/${fromCurrency.value.toLowerCase()}.json`;
let response = await fetch(URL);
// console.log(response);         //status : 200
let data = await response.json();
// console.log(data);             //exchange value will print

let rate = data[toCurr.value.toLowerCase()];       //rate mai data wali value access
//   console.log(rate);                            //83.293  1.49929

let finalAmount = amtVal*rate;
            //1USD= amtVal     USD
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

// country flag update

const upDateFlag=(element)=>{
// console.log(element);       click other country =>select name= "from"..
let currCode = element.value;
// console.log(currCode);       //INR,USD
let countryCode = countryList[currCode];  //IN USD,EU

let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`; //abhi element pr select hai ,
                                                             //need to access parent
let img = element.parentElement.querySelector('img')
img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
 evt.preventDefault();
 updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});