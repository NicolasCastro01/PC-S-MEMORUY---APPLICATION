
let api = setInterval(() => {
    async function load() {
        const response = await fetch("http://localhost:3000").then(data => data.json()).catch(err => {
            setTimeout(() => { clearInterval(api) }, 900);
            console.clear();
            console.error("Api não foi encontrada.");
        });

        if (response === undefined) return;
        let data = []
        data.push(response)
        data.map(({ Free, Total, Usage, Os }) => attStats({ Free, Total, Usage, Os }))

    };



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
    load();
}, 1000);

