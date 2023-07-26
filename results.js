
// function log
function log(message) {
    console.log(message);
}

// Function to hide the loading screen after 3 seconds
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'none';
}
  
  // Wait for 3 seconds before hiding the loading screen
setTimeout(hideLoadingScreen, 1500);



// Retrieve the search results data from the URL
const params = new URLSearchParams(window.location.search);
// const dataString = params.get("data");
let search = params.get("search");

// Clean the search query to avoid regex issues
const cleanedSearch = search.replace(/<br>/gi, ' ').trim();

// Escape special characters in the cleaned search query to avoid regex issues
const escapedSearch = cleanedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Update the pattern to handle parentheses
let pattern = new RegExp(`.*${escapedSearch.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}.*`, 'i');

let searchResults_heading = document.createElement("h1");
searchResults_heading.id = "search-results-heading";
searchResults_heading.innerText = "Search Results for " + search.replace(".*", " ");
searchResultsContainer = document.getElementById("search-results-container");

let title = document.getElementById("title");
title.innerText = "Search Results for " + search.replace(".*", " ");

// Use the data to populate the search results container
const searchResults = document.getElementById("search-results");
// let data = filteredData;

const data = [];
const filtData = [];

const words = search.split(" ");
const year = words.find(word => /\d{4}/.test(word));
let screenSize = words.find(word => /-inch/.test(word));

log("Search: " + search)
log("Year: " + year)
log("Screen Size: " + screenSize)


const filesMacMini = [
    "PowerMac10,1.json",
    "Macmini1,1.json",
    "Macmini2,1.json",
    "Macmini3,1.json",
    "Macmini4,1.json",
    "Macmini5,1.json",
    "Macmini5,2.json",
    "Macmini5,3.json",
    "Macmini6,1.json",
    "Macmini6,2.json",
    "Macmini6,2Server.json",
    "Macmini7,1.json",
    "Macmini8,1.json",
    "Macmini9,1.json",

    "Mac14,3.json",
    "Mac14,12.json"
];
const filesMacPro = [
    "MacPro1,1.json", 
    "MacPro2,1.json",
    "MacPro3,1.json", 
    "MacPro4,1.json",
    "MacPro5,12010.json",
    "MacPro5,12012.json",
    "MacPro6,1.json",
    "MacPro7,1.json",

    "Mac14,8.json"
];
const filesiMac = [
    "PowerMac8,1.json",
    "PowerMac8,2.json",
    "PowerMac12,1.json",
    "iMac4,1.json",
    "iMac4,2.json",
    "iMac5,1.json",
    "iMac5,2.json",
    "iMac6,1.json",
    "iMac7,1.json",
    "iMac8,1.json",
    "iMac9,1.json",
    "iMac9,1_1.json",
    "iMac10,1 or iMac11,1.json",
    "iMac10,1.json",
    "iMac11,2.json",
    "iMac11,3.json",
    "iMac12,1.json",
    "iMac12,1_1.json",
    "iMac12,2.json",
    "iMac13,1.json",
    "iMac13,2.json",
    "iMac13,12013.json",
    "iMac14,1.json",
    "iMac14,3.json",
    "iMac14,2.json",
    "iMac14,4.json",
    "iMac15,1.json",
    "iMac15,12015.json",
    "iMac16,1.json",
    "iMac16,2.json",
    "iMac16,2Retina.json",
    "iMac17,1.json",
    "iMac18,1.json",
    "iMac18,2.json",
    "iMac18,3.json",
    "iMacPro1,1.json",
    "iMac19,1.json",
    "iMac19,2.json",
    "iMac20,1.json",
    "iMac20,2.json",
    "iMac21,1.json",
    "iMac21,2.json"
];

const filesMacStudio = [
    "Mac13,1.json", 
    "Mac13,2.json",

    "Mac14,13.json",
    "Mac14,14.json",
]

const filesiOS = ["iPhoneOS.json", "iPhoneOS2.json", "iPhoneOS3.json"]

const filesiPhone = ["iPhone1,1.json", "iPhone1,2.json", "iPhone2,1.json", "iPhone3,1.json", "iPhone3,2.json"]

const filesMacBook = [
    "MacBook1,1.json",
    "MacBook2,12006.json",
    "MacBook2,12007.json",
    "MacBook3,1.json",
    "MacBook4,1E2008.json",
    "MacBook4,1L2008.json",
    "MacBook5,1.json",
    "MacBook5,2E2009.json",
    "MacBook5,2M2009.json",
    "MacBook6,1.json",
    "MacBook7,1.json",
    "MacBook8,1.json",
    "MacBook9,1.json",
    "MacBook10,1.json"
]

const filesMacBookAir = [
    "MacBookAir1,1.json",
    "MacBookAir2,12008.json",
    "MacBookAir2,12009.json",
    "MacBookAir3,1.json",
    "MacBookAir3,2.json",
    "MacBookAir4,1.json",
    "MacBookAir4,2.json",
    "MacBookAir5,1.json",
    "MacBookAir5,2.json",
    "MacBookAir6,12013.json",
    "MacBookAir6,12014.json",
    "MacBookAir6,22013.json",
    "MacBookAir6,22014.json",
    "MacBookAir7,1.json",
    "MacBookAir7,22015.json",
    "MacBookAir7,22017.json",
    "MacBookAir8,1.json",
    "MacBookAir8,2.json",
    "MacBookAir9,1.json",
    "MacBookAir10,1.json",

    "Mac14,2.json",
    "Mac14,15.json"
]

const filesMacBookPro = [
    "MacBookPro1,1.json",
    "MacBookPro1,2.json",
    "MacBookPro2,2.json",
    "MacBookPro2,1.json",
    "MacBookPro3,115-inch.json",
    "MacBookPro3,117-inch.json",
    "MacBookPro4,115-inch.json",
    "MacBookPro4,117-inch.json",
    "MacBookPro5,1.json",
    "MacBookPro4,1L2008.json",
    "MacBookPro5,2E.json",
    "MacBookPro5,5.json",
    "MacBookPro5,4.json",
    "MacBookPro5,3.json",
    "MacBookPro5,2M.json",
    "MacBookPro7,1.json",
    "MacBookPro6,2.json",
    "MacBookPro6,1.json",
    "MacBookPro8,1E.json",
    "MacBookPro8,2E.json",
    "MacBookPro8,3E.json",
    "MacBookPro8,1L.json",
    "MacBookPro8,2L.json",
    "MacBookPro8,3L.json",
    "MacBookPro9,2.json",
    "MacBookPro9,1.json",
    "MacBookPro10,12012.json",
    "MacBookPro10,12013.json",
    "MacBookPro10,22012.json",
    "MacBookPro10,22013.json",
    "MacBookPro11,12013.json",
    "MacBookPro11,12014.json",
    "MacBookPro11,22013.json",
    "MacBookPro11,22014.json",
    "MacBookPro11,32013.json",
    "MacBookPro11,32014.json",
    "MacBookPro12,1.json",
    "MacBookPro11,4.json",
    "MacBookPro11,5.json",
    "MacBookPro13,1.json",
    "MacBookPro13,2.json",
    "MacBookPro13,3.json",
    "MacBookPro14,1.json",
    "MacBookPro14,2.json",
    "MacBookPro14,3.json",
    "MacBookPro15,22018.json",
    "MacBookPro15,12018.json",
    "MacBookPro15,32018.json",
    "MacBookPro15,22019.json",
    "MacBookPro15,12019.json",
    "MacBookPro15,32019.json",
    "MacBookPro15,4.json",
    "MacBookPro16,1.json",
    "MacBookPro16,4.json",
    "MacBookPro16,3.json",
    "MacBookPro16,2.json",
    "MacBookPro17,1.json",
    "MacBookPro18,3.json",
    "MacBookPro18,4.json",
    "MacBookPro18,1.json",
    "MacBookPro18,2.json",

    "Mac14,7.json",
    "Mac14,9.json",
    "Mac14,5.json",
    "Mac14,10.json",
    "Mac14,6.json",
]

const fetchJSON = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`)
    }
    return await response.json();
};

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
    log(`Fetched ` + device.length + ` files from ` + directory)


};

const processData = async () => {


    await Promise.all([
        fetchAllJSON("Models/Mac Mini", filesMacMini),
        fetchAllJSON("Models/Mac Pro", filesMacPro),
        fetchAllJSON("Models/iMac", filesiMac),
        fetchAllJSON("Models/Mac Studio", filesMacStudio),
        fetchAllJSON("Models/iOS", filesiOS),
        fetchAllJSON("Models/iPhone", filesiPhone),
        fetchAllJSON("Models/MacBook", filesMacBook),
        fetchAllJSON("Models/MacBook Air", filesMacBookAir),
        fetchAllJSON("Models/MacBook Pro", filesMacBookPro)
    ]);
    log("Data: " + data.length + " files")

    // check if device.Name includes RexExp (use result as variable)

    // if result is true, push to filtData

    data.filter(device => {
        let name = device.Name;
        let mid = device.Info.Overview["Model Identifier"];
        
        // Use the updated pattern to test the match
        if (pattern.test(name)) {
            filtData.push(device);
        } else if (pattern.test(mid)) {
            filtData.push(device);
        }
        // } else if (pattern.test(modelIdentifier)) {
        //     filtData.push(device);
        // }

    });
    

      

    log("Len: " + filtData.length)
    if (filtData.length === 0) {
        // console.log("Filt-Data: " + filtData.length); Show "Not Found :(" message
        // Search Input searchResults_heading.innerText = "Search Results for " +
        // search;

        const notFoundMessage = document.createElement("p");
        notFoundMessage.innerHTML = "Not Found :("
        notFoundMessage.style.textAlign = "center";
        notFoundMessage.style.position = "absolute";
        notFoundMessage.style.fontWeight = "bold";
        notFoundMessage.style.fontSize = "2rem";
        searchResults.appendChild(notFoundMessage);

        const requestMsg = document.createElement("p");
        requestMsg.innerHTML = "If you want to request a device, please contact me <br> \
            On Twitter: <a class='linkNotFound' href='https://twitter.com/@NoContent_06'> @NoContent_06 </a> <br> \
            On Discord: <a class='linkNotFound' href='https://discord.com/invite'>AppleGuy#7469 </a> <br> \
            On Reddit: u/ytnocontent06" 
        requestMsg.style.textAlign = "center";
        requestMsg.style.fontWeight = "bold";
        requestMsg.style.fontSize = "1.5rem";
        notFoundMessage.appendChild(requestMsg);

    } else if (filtData.length === 1) {
        // If only one result, redirect to device page

        let model = filtData[0]
            .Info
            .Overview["Model Identifier"]
            .replace(" ", "")
            .replace("(", "")
            .replace(")", "");
        location.href = `detailed.html?model=${model}&type=${filtData[0].Type}`;

    } else {
        for (let index = 0; index < filtData.length; index++) {
            let item = filtData[index];

            const result = document.createElement("div");

            result.classList.add("result");

            

            // Create image element
            let image = document.createElement("img");
            image.src = `img\\${item.image}`;
            image.id = `result-image-${item.Info.Overview["Model Identifier"].replace(",", "")}`;
            image.classList.add("result_img");
            result.prepend(image);

            const text = document.createElement("div");
            text
                .classList
                .add("result__text");
            text.innerHTML = `<p class="mid_text_result">${item
                .Name} </p>
            <p id='mid_text_${item
                .Info
                .Overview["Model Identifier"]
                .replace(",", "")
                .replace(" ", "")
                .replace("(", "")
                .replace(")", "")}'>${item
                .Info
                .Overview["Model Identifier"]}  </p>`;
            result.appendChild(text);
            searchResults.appendChild(result);



            // Add event listener to each result element
            let results = document.querySelectorAll(".result");
            for (let result of results) {
                result.addEventListener("click", function () {
                    // Get the Model Identifier of the selected result
                    const modelIdentifier = this
                        .querySelector(
                            `#mid_text_${item.Info.Overview["Model Identifier"].replace(",", "").replace(" ", "").replace("(", "").replace(")", "")}`
                        )
                        .innerText
                        .replace(" ", "")
                        .replace("(", "")
                        .replace(")", "");
                    // Redirect the user to the detailed page
                    location.href = `detailed.html?model=${modelIdentifier}&type=${item.Type}`;
                });
            }
            
            
        }
        let footer = document.createElement("footer");
        footer.setAttribute("class", "footer");
        footer.innerText = returnString;

        searchResults.appendChild(footer);
        
    }
    document.body.insertBefore(searchResults_heading, searchResultsContainer).style.textAlign = "center";
};



processData().catch((error) => {
    console.error(error);
});
