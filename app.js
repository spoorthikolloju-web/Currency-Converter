const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".drop-down select");

let i=0;

const btn =document.querySelector("button");

const fromCurr =document.querySelector(".From select");

const toCurr=document.querySelector(".To select");

const msg=document.querySelector(".msg");


for(let select of dropdown){
    for (currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name=='from' && currCode==='USD'){
            newoption.selected='selected';
        }else if(select.name=='to' && currCode==='INR'){
            newoption.selected='selected';
        }
          select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}



btn .addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    console.log(fromCurr.value+"\tto\t"+toCurr.value);
    const URL=`${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    console.log(response);
    let data= await response.json();
    console.log(data);
    let exRate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(exRate);
    let finalRate= amount.value*exRate;
    console.log(finalRate);
    msg.innerText=`${amount.value}${fromCurr.value}=${finalRate}${toCurr.value}`;
})

