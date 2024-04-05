
// Retrieve the search results data from the URL
const params = new URLSearchParams(window.location.search);
let search = params.get("search");

// Clean the search query to avoid regex issues
const cleanedSearch = search
    .replace(/<br>/gi, ' ')
    .trim();

// Escape special characters in the cleaned search query to avoid regex issues
const escapedSearch = cleanedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Update the pattern to handle parentheses
let pattern = new RegExp(
    `.*${escapedSearch.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}.*`,
    'i'
);

let searchResults_heading = document.createElement("h1");
searchResults_heading.id = "search-results-heading";
searchResults_heading.innerText = "Search Results for " + search;
searchResultsContainer = document.getElementById("search-results-container");

// Use the data to populate the search results container
const searchResults = document.getElementById("search-results");
searchResults.classList.add("resultContainer")

const regexModelIdentifier = new RegExp(
    `(MacBook|iMac|iPhone)[0-9,]+$`
)

const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return await response.json();
};

const searchFormNav = document.getElementById("search-form-nav");
const searchInputNav = document.getElementById("search-input-nav"); // search input
let linkTagNav = document.getElementById("a-bt"); // link

searchFormNav.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let webLink = `results.html?search=${searchInputNav.value}`;
        linkTagNav.setAttribute("href", webLink);
        linkTagNav.click();
    }
});

window.onscroll = function () {
    scrollFunction();
};

// Make Navbar sticky

let navbar = document.getElementById("bt-nav");
let sticky = navbar.offsetHeight;




function scrollFunction() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

const processData = async () => {
    const deviceFiles = [
        "AppleTV.json",
        "iMac.json",
        "iOS.json",
        "iPad.json",
        "iPhone.json",
        "iPhoneOS.json",
        "iPod.json",
        "MacBook.json",
        "Mac Pro.json",
        "Mac Studio.json",
        "MacBook Air.json",
        "MacBook Pro.json",
        "MacMini.json",
        "Mac Pro.json",
        "Watch.json",
        "Pencil.json"
        // Add other device JSON file names here
    ];

    const data = [];

    const fetchAllJSON = async (directory, device) => {
        // You can change the list of files to fetch here
        for (const file of device) {
            try {
                const jsonData = await fetchJSON(`${directory}/${file}`);
                data.push(jsonData);
            } catch (error) {
                console.error(`Error fetching ${file}: ${error}`);
            }
        }
        console.log(`Fetched ` + device.length + ` files from ` + directory)
    
    
    };

    console.log("Data: ", data);

    const filtData = [];

    function includesString(s1, s2) {
        // Remove parentheses and spaces from both strings
        const s1Cleaned = s1.replace(/\(|\)|\s/g, "");
        const s2Cleaned = s2.replace(/\(|\)|\s/g, "");
    
        // Check if s2Cleaned is a substring of s1Cleaned
        return s1Cleaned.includes(s2Cleaned);
    }

    function checkConcatenatedString(arr, targetString) {
        const targetArray = targetString.split(" ");
        targetArray.forEach((item, index) => {
            if (item.includes('"')) {
                targetArray[index] = item.replace('"', "-inch");
            }
        });
        // console.log("Target Array: " + targetArray);
        return targetArray.every(item => arr.includes(item));
    }

    const models = [
        { keywords: ["Mac Mini", "MacMini", "Mac", "Mini"], device: "MacMini" },
        { keywords: ["Mac Pro", "MacPro"], device: "Mac Pro" },
        { keywords: ["iMac", "iMacPro"], device: "iMac" },
        { keywords: ["Mac Studio", "MacStudio", "Mac"], device: "Mac Studio" },
        { keywords: ["iOS", "iPhoneOS"], device: "iOS" },
        { keywords: ["iPhone"], device: "iPhone" },
        { keywords: ["iPad"], device: "iPad" },
        { keywords: ["iPod"], device: "iPod" },
        { keywords: ["MacBook", "MB", "Mac", "Book"], device: "MacBook" },
        { keywords: ["MacBook", "Pro", "MacBook Pro", "MBP", "MacBookPro"], device: "MacBook Pro" },
        { keywords: ["MacBook", "Air", "MacBook Air", "MBA", "MacBookAir"], device: "MacBook Air" },
        { keywords: ["Apple", "TV", "Apple TV", "AppleTV"], device: "AppleTV" },
        { keywords: ["Apple", "Watch", "AppleWatch", "AW"], device: "Watch"},
        { keywords: ["Pencil", "Apple Pencil"], device: "Pencil"}
    ];
    
    let found = false;
    
    for (const model of models) {
        console.log("Model: " + model.keywords);
        if (checkConcatenatedString(model.keywords, search)) {
            console.log("TRUE");
            const devices = await fetchJSON(`Models/${model.device}.json`);

            // Push each device into the filtData array

            for (let i = 0; i < devices.length; i++) {
                const deviceInfo = devices[i];
                filtData.push(deviceInfo);
            }

            
            found = true;
            break;
        } else if (checkConcatenatedString(model.keywords, cleanedSearch)) {
            console.log("TRUE");
            const devices = await fetchJSON(`Models/${model.device}.json`);
        } else if (regexModelIdentifier.test(cleanedSearch)) {
            console.log("TRUE");
            const devices = await fetchJSON(`Models/${model.device}.json`);
        } else {
            console.log("FUCK THAT SHIT BRO");
        }
    }
    
    if (!found) {
        // Handle case when no match is found
        await fetchAllJSON("Models", deviceFiles);
    }

    console.log("Filtered Data: ", filtData);


    if (filtData.length >= 0) {
        for (let i = 0; i < data.length; i++) {

            const deviceInfo = data[i];

            
            for (let j = 0; j < deviceInfo.length; j++) {
                console.log("Device Info Len: ", deviceInfo);
                let name = deviceInfo[j].Name;
                let mid = deviceInfo[j].Info.Overview["Model Identifier"];
            
                // const name = deviceInfo[i].Name;
    
                console.log("Name: ", name);
    
                const resultTest = includesString(name, search);
                // console.log("Device Info: ", deviceInfo[j]);

        
                if (pattern.test(name)) {
                    filtData.push(deviceInfo[j]);
                } else if (pattern.test(mid)) {
                    filtData.push(deviceInfo[j]);
                } else if (resultTest) {
                    filtData.push(deviceInfo[j]);
                } else if (checkConcatenatedString(name, search)) {
                    filtData.push(deviceInfo[j]);
                }
            }
        }
    }


    console.log("Filtered Data: ", filtData);
    console.log("Filtered Data Length: ", filtData.length);

    searchResults_heading.innerText = filtData.length + " Results for " + search;

    let footer = document.createElement("footer");
    footer.setAttribute("class", "footer");
    footer.innerText = returnString; // Replace with your footer content

    if (filtData.length === 0) {
        const notFoundMessage = document.createElement("p");
        notFoundMessage.innerHTML = "Not Found :("
        notFoundMessage.style.textAlign = "center";
        notFoundMessage.style.position = "absolute";
        notFoundMessage.style.fontWeight = "bold";
        notFoundMessage.style.fontSize = "2rem";
        searchResults.appendChild(notFoundMessage);

        const requestMsg = document.createElement("p");
        requestMsg.innerHTML = "If you want to request a device, please contact me <br> \
            On Twitt" +
                "er: <a class='linkNotFound' href='https://twitter.com/@NoContent_06'> @NoConte" +
                "nt_06 </a> <br> \
            On Discord: <a class='linkNotFound' href='https:" +
                "//discord.gg/hyTP8ynDAz'>AppleGuy#7469</a><br> \
            On Reddit: <a cla" +
                "ss='linkNotFound' href='https://reddit.com/u/ytnocontent06'>u/ytnocontent06</a" +
                ">";
        requestMsg.style.textAlign = "center";
        requestMsg.style.fontWeight = "bold";
        requestMsg.style.fontSize = "1.5rem";
        notFoundMessage.appendChild(requestMsg);

        let notFoundFooter = document.createElement("footer");
        notFoundFooter.setAttribute("class", "footer");
        notFoundFooter.innerText = "Your not found footer content here"; // Replace with your not found footer content
        notFoundFooter.style.position = "absolute";
        notFoundFooter.style.bottom = "0";
        notFoundFooter.style.width = "100%";
        notFoundFooter.style.textAlign = "center";
        notFoundFooter.style.fontSize = "1rem";
        notFoundFooter.style.fontWeight = "normal";
        notFoundFooter.style.color = "gray";
        notFoundFooter.style.marginBottom = "5vh";
        document
            .body
            .appendChild(notFoundFooter);
    } else if (filtData.length === 1) {
        console.error("Found 1 device: ", filtData);
            let modelIdentifier = filtData[0]
                .Info
                .Overview["Model Identifier"]
                .replace(/ /g, "")
                .replace("(", "")
                .replace(")", "");
            location.href = `detailed.html?modelIdentifier=${modelIdentifier}&type=${filtData[0].Type}`; // Use foundIndex here
    } else {
        for (let index = 0; index < filtData.length; index++) {
            const item = filtData[index];

            console.log("item: " + item);

            const result = document.createElement("div");
            result.classList.add("result");

            // Create image element
            let image = document.createElement("img");
            image.src = `img/${item.image}`;
            image.id = `result-image-${item.Info.Overview["Model Identifier"].replace(/,/g, "")}`;
            image.classList.add("result_img");
            result.prepend(image);

            const text = document.createElement("div");
            let MId = item.Info.Overview["Model Identifier"];
            MId = MId.replace(/_/g, " ");
            text.classList.add("result__text");
            text.innerHTML = `<p class="mid_text_result">${item.Name}</p>
            <p id='mid_text_${item
                .Info
                .Overview["Model Identifier"]
                .replace(/,/g, "")
                .replace(/ /g, "")
                .replace("(", "")
                .replace(")", "")}'>${MId} </p>`;
            result.appendChild(text);
            searchResults.appendChild(result);

            // Add event listener to each result element
            result.addEventListener("click", function () {
                // Get the index of the selected result in the filtData array
                const selectedIndex = index;

                console.error ("Selected Index: ", selectedIndex);

                // Redirect the user to the detailed page with the selected index
                location.href = `detailed.html?modelIdentifier=${item.Info.Overview["Model Identifier"]}&type=${item.Type}`;
            });

        }

        searchResults.appendChild(footer);
    }
    searchResults_heading.style.textAlign = "center";
    document
        .body
        .insertBefore(searchResults_heading, searchResultsContainer);
};

processData().catch((error) => {
    console.error(error);
});
