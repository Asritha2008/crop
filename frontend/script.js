const API_URL=window.location.protocol==="file:"? "http://127.0.0.1:8000/predict" : "/predict";
const FIELDS = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];

function readInputs()
{
    const data={};
    for(const f of FIELDS)
    {
        const value=document.getElementById(f).value;
        if(value==="")
        {
            showMessage("please fill in "+f);
            return null;
        }
        data[f]=Number(value);
    }
    return data;
}

async function sendToApi(data)
{
    const res=await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    if(!res.ok)
    {
        throw new Error("bad input");
    }
    return await res.json();
}

function showResult(result)
{
    let text="Best crop:"+result.crop+"("+(result.confidence*100).toFixed(1) +"%)";
    text+=" | Top 3: ";
    for(const item of result.top3)
    {
        text+=item.crop+" "+(item.probability*100).toFixed(1)+"%";

    }
    document.getElementById("result").textContent=text;
}
function showMessage(message)
{
    document.getElementById("result").textContent=message;
}

document.getElementById("btn").addEventListener("click",async()=>{
    const data=readInputs();
    if(data===null) return;
    showMessage("Predicting...");
    try{
        const result=await sendToApi(data);
        showResult(result);
    }
    catch(err)
    {
        if(err.message==="bad input")
        {
            showMessage("Invalid input.Check the ranges.");
        }
        else{
            showMessage("Could not reach the server.");
        }
    }
});