let index = "./index.html";
let infoOn = true;
let timeoutFinishReload;
let applicationReset;
let api = setInterval(() => {

    async function load() {
        let infoApi = document.getElementById("infoApi");
        const response = await fetch("http://localhost:3000").then(data => data.json()).then(finishReload()).catch(err => {
            setTimeout(() => {
                clearInterval(api);
                
            }, 900);
            console.clear();
            console.error("Api não foi encontrada.");
            infoApi.innerText = "OFF";
            infoApi.style.color = "red";
            attStatsToNormal();
            infoOn = false;
            startReload();
        });

        if (response === undefined) return;
        let data = []
        data.push(response);
        infoApi.innerText = "ON";
        infoApi.style.color = "green"
        data.map(({ Free, Total, Usage, Os }) => attStats({ Free, Total, Usage, Os }))

    };

    function attStatsToNormal(){
        let memoryTotal = document.getElementById("memoryTotal");
        let memoryCurrent = document.getElementById("memoryCurrent");
        let usagePercent = document.getElementById("usagePercent");
        let oS = document.getElementById("Os");

        let progressBarMemoryTotal = document.querySelector('progress[name="memoryT"]');
        let progressBarMemoryCurrent = document.querySelector('progress[name="memory"]');
        let progressBarUsagePercent = document.querySelector('progress[name="usage"]');

        memoryTotal.innerText = "###";
        memoryCurrent.innerText = "###";
        usagePercent.innerText = "###";
        oS.innerText = "#####";

        progressBarMemoryTotal.setAttribute("value",null);
        progressBarMemoryTotal.setAttribute("max",null);

        progressBarMemoryCurrent.setAttribute("value", null);
        progressBarMemoryCurrent.setAttribute("max",null);

        progressBarUsagePercent.setAttribute("value", null);

    }

    function attStats({ Free, Total, Usage, Os }) {
        let memoryTotal = document.getElementById("memoryTotal");
        let memoryCurrent = document.getElementById("memoryCurrent");
        let usagePercent = document.getElementById("usagePercent");
        let oS = document.getElementById("Os");

        let progressBarMemoryTotal = document.querySelector('progress[name="memoryT"]');
        let progressBarMemoryCurrent = document.querySelector('progress[name="memory"]');
        let progressBarUsagePercent = document.querySelector('progress[name="usage"]');


        memoryTotal.innerText = Total;
        memoryCurrent.innerText = Free;
        usagePercent.innerText = Usage;
        oS.innerText = Os;

        progressBarMemoryTotal.setAttribute("value",`${Total}`);
        progressBarMemoryTotal.setAttribute("max",`${Total}`);

        progressBarMemoryCurrent.setAttribute("value", `${Free}`);
        progressBarMemoryCurrent.setAttribute("max",`${Total}`);

        progressBarUsagePercent.setAttribute("value", `${Usage}`);
    };

    function finishReload() {
        if(infoOn){
            timeoutFinishReload = setTimeout(() => {
                clearInterval(applicationReset)
            }, 900);
        };
    };
    
    function startReload() {
        if(!infoOn){
            applicationReset = setInterval(() => {
                window.location.reload();
            }, 5 * 1000);
        };
    };
    load();
}, 1000);
