
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

let og_title_element = document.head.querySelector('meta[property="og:title"][content]');
log("og:title element: " + og_title_element.outerHTML);

let title = document.getElementById("title");
title.innerText = "Search Results for " + search;

// Get the og:title element
if (og_title_element) {
    // Extract the content attribute
    let og_title = document.querySelector('meta[property="og:title"]').setAttribute("content", title.innerText);
    // Now you can use the og_title variable as needed
    console.log("OG Title: " + og_title);   
} else {
    console.log("og:title element not found or missing content attribute.");
}


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

const filesiOS = [
    "iPhoneOS.json", 
    "iPhoneOS2.json", 
    "iPhoneOS3.json", 
    "iOS4.json",
    "iOS5.json",
    "iOS6.json",
    "iOS7.json",
    "iOS8.json",
    "iOS9.json",
    "iOS10.json",
    "iOS11.json",
    "iOS12.json",
    "iOS13.json",
    "iOS14.json",
    "iOS15.json",
    "iOS16.json"  
]

const filesiPhone = [
    "iPhone1,1.json", 
    "iPhone1,2.json", 
    "iPhone2,1.json", 
    "iPhone3,1.json", 
    "iPhone3,2.json",
    "iPhone3,3.json",
    "iPhone4,1.json",
    "iPhone5,1.json",
    "iPhone5,2.json",
    "iPhone5,2China.json",
    "iPhone5,3.json",
    "iPhone5,4.json",
    "iPhone6,1.json",
    "iPhone6,2.json",
    "iPhone7,2.json",
    "iPhone7,1.json",
    "iPhone8,1.json",
    "iPhone8,2.json",
    "iPhone8,4.json",
    "iPhone9,1.json",
    "iPhone9,3.json",
    "iPhone9,2.json",
    "iPhone9,4.json",
    "iPhone10,1.json",
    "iPhone10,4.json",
    "iPhone10,2.json",
    "iPhone10,5.json",
    "iPhone10,3.json",
    "iPhone10,6.json",
    "iPhone11,2.json",
    "iPhone11,6.json",
    "iPhone11,8.json",
    "iPhone12,1.json",
    "iPhone12,3.json",
    "iPhone12,5.json",
    "iPhone12,8.json",
    "iPhone13,1.json",
    "iPhone13,2.json",
    "iPhone13,3.json",
    "iPhone13,4.json",
    "iPhone14,5.json",
    "iPhone14,4.json",
    "iPhone14,2.json",
    "iPhone14,3.json",
    "iPhone14,6.json",
    "iPhone14,7.json",
    "iPhone15,2.json",
    "iPhone15,3.json",
    "iPhone14,8.json",
    
]

const filesiPad = [
    "iPad1,1.json",
    "iPad2,1.json",
    "iPad2,2.json",
    "iPad2,3.json",
    "iPad2,5.json",
    "iPad2,6.json",
    "iPad3,1.json",
    "iPad1,1.json",
    "iPad2,1.json",
    "iPad2,2.json", 
    "iPad2,3.json", 
    "iPad2,5.json", 
    "iPad2,6.json", 
    "iPad3,1.json", 
    "iPad3,3.json", 
    "iPad3,4.json", 
    "iPad3,5.json", 
    "iPad4,1.json", 
    "iPad4,2.json", 
    "iPad4,4.json", 
    "iPad4,5.json", 
    "iPad4,7.json", 
    "iPad4,8.json", 
    "iPad5,1.json", 
    "iPad5,2.json", 
    "iPad5,3.json", 
    "iPad5,4.json", 
    "iPad6,3.json", 
    "iPad6,4.json", 
    "iPad6,7.json", 
    "iPad6,8.json", 
    "iPad6,11.json", 
    "iPad6,12.json", 
    "iPad7,1.json", 
    "iPad7,2.json", 
    "iPad7,3.json", 
    "iPad7,4.json", 
    "iPad7,5.json", 
    "iPad7,6.json", 
    "iPad7,11.json", 
    "iPad7,12.json", 
    "iPad8,1.json", 
    "iPad8,2.json", 
    "iPad8,3.json", 
    "iPad8,4.json", 
    "iPad8,5.json", 
    "iPad8,6.json", 
    "iPad8,7.json", 
    "iPad8,8.json", 
    "iPad8,9.json", 
    "iPad8,10.json", 
    "iPad8,11.json", 
    "iPad8,12.json", 
    "iPad11,1.json", 
    "iPad11,2.json", 
    "iPad11,3.json", 
    "iPad11,4.json", 
    "iPad11,6.json", 
    "iPad11,7.json", 
    "iPad12,1.json", 
    "iPad12,2.json", 
    "iPad13,1.json", 
    "iPad13,2.json", 
    "iPad13,4.json", 
    "iPad13,5.json", 
    "iPad13,6.json", 
    "iPad13,7.json", 
    "iPad13,8.json", 
    "iPad13,9.json", 
    "iPad13,10.json",
    "iPad13,11.json", 
    "iPad13,16.json", 
    "iPad13,17.json", 
    "iPad13,18.json", 
    "iPad13,19.json", 
    "iPad14,1.json", 
    "iPad14,2.json", 
    "iPad14,3.json", 
    "iPad14,4.json", 
    "iPad14,5.json", 
    "iPad14,6.json"
]

const filesiPod = [
    "iPod_with_scroll_wheel.json",
    "iPod_with_touch_wheel.json",
    "iPod_(Dock_Connector).json",
    "iPod_mini.json",
    "iPod_(Click_Wheel).json",
    "iPod_U2_Special_Edition.json",
    "iPod_photo.json",
    "iPod_shuffle.json",
    "iPod_mini_(2nd_Gen).json",
    "iPod_color_display.json",
    "iPod_U2_Special_Edition_(color_display).json",
    "iPod_nano.json",
    "iPod_(5th_Gen).json",
    "iPod_(5th_Gen_U2).json",
    "iPod_shuffle_(2nd_Gen).json",
    "iPod_nano_(2nd_Gen).json",
    "iPod_(5th_Gen_Late_2006).json",
    "iPod_(5th_Gen_U2_Late_2006).json",
    "iPod_shuffle_(2nd_Gen_Late_2007).json",
    "iPod_nano_(3rd_Gen).json",
    "iPod_classic.json",
    "iPod1,1.json",
    "iPod2,1.json",
    "iPod_shuffle_(2nd_Gen_Late_2008).json",
    "iPod_nano_(4th_Gen).json",
    "iPod_classic_(120_GB).json",
    "iPod_shuffle_(3rd_Gen).json",
    "iPod_shuffle_(3rd_Gen_Late_2009).json",
    "iPod_nano_(5th_Gen).json",
    "iPod_classic_(160_GB)_(Late_2009).json",
    "iPod3,1.json",
    "iPod_shuffle_(4th_Gen).json",
    "iPod_nano_(6th_Gen).json",
    "iPod4,1.json",
    "iPod_nano_(7th_Gen).json",
    "iPod5,1.json",
    "iPod7,1.json",
    "iPod9,1.json",
]

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

const filesAppleTV = [
    "AppleTV1,1.json",
    "AppleTV2,1.json",
    "AppleTV3,1.json",
    "AppleTV3,2.json",
    "AppleTV5,3.json",
    "AppleTV6,2.json",
    "AppleTV11,1.json",
    "AppleTV14,1.json",
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

    function checkConcatenatedString(arr, targetString) {
        const targetArray = targetString.split(" ");
        targetArray.forEach((item, index) => {
            if (item.includes('"')) {
                targetArray[index] = item.replace('"', "-inch");
            }
        });
        console.log("Target Array: " + targetArray);
        return targetArray.every(item => arr.includes(item));
    }


    const models = [
        { keywords: ["Mac Mini", "MacMini"], path: "Models/Mac Mini", files: filesMacMini },
        { keywords: ["Mac Pro", "MacPro"], path: "Models/Mac Pro", files: filesMacPro },
        { keywords: ["iMac", "iMacPro"], path: "Models/iMac", files: filesiMac },
        { keywords: ["Mac Studio", "MacStudio"], path: "Models/Mac Studio", files: filesMacStudio },
        { keywords: ["iOS", "iPhoneOS"], path: "Models/iOS", files: filesiOS},
        { keywords: ["iPhone"], path: "Models/iPhone", files: filesiPhone },
        { keywords: ["iPad"], path: "Models/iPad", files: filesiPad },
        { keywords: ["iPod"], path: "Models/iPod", files: filesiPod },
        { keywords: ["MacBook", "MB"], path: "Models/MacBook", files: filesMacBook },
        { keywords: ["MacBook", "Pro", "MBP", "MacBookPro"], path: "Models/MacBook Pro", files: filesMacBookPro },
        { keywords: ["MacBook", "Air", "MBA", "MacBookAir"], path: "Models/MacBook Air", files: filesMacBookAir },
        { keywords: ["AppleTV", "AppleTV"], path: "Models/Apple TV", files: filesAppleTV },

    ];
    
    let found = false;
    
    for (const model of models) {
        if (checkConcatenatedString(model.keywords, search)) {
            await fetchAllJSON(model.path, model.files);
            found = true;
            break;
        }
    }
    
    if (!found) {
        // Handle case when no match is found
        await Promise.all([
            fetchAllJSON("Models/Mac Mini", filesMacMini),
            fetchAllJSON("Models/Mac Pro", filesMacPro),
            fetchAllJSON("Models/iMac", filesiMac),
            fetchAllJSON("Models/Mac Studio", filesMacStudio),
            fetchAllJSON("Models/iOS", filesiOS),
            fetchAllJSON("Models/iPhone", filesiPhone),
            fetchAllJSON("Models/iPad", filesiPad),
            fetchAllJSON("Models/iPod", filesiPod),
            fetchAllJSON("Models/MacBook", filesMacBook),
            fetchAllJSON("Models/MacBook Air", filesMacBookAir),
            fetchAllJSON("Models/MacBook Pro", filesMacBookPro),
            fetchAllJSON("Models/Apple TV", filesAppleTV),
        ]);
    }
    

    log("Data: " + data.length + " files")


    data.filter(device => {
        let name = device.Name;
        let mid = device.Info.Overview["Model Identifier"];


        function includesString(s1, s2) {
        // Remove parentheses and spaces from both strings
            const s1Cleaned = s1.replace(/\(|\)|\s/g, "");
            const s2Cleaned = s2.replace(/\(|\)|\s/g, "");

            log("s1Cleaned: " + s1Cleaned + " s2Cleaned: " + s1Cleaned)

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
            console.log("Target Array: " + targetArray);
            // log(targetArray.includes("MacBook") && targetArray.includes("Pro"))
            return targetArray.every(item => arr.includes(item));
        }


        // Test the function
        const resultTest = includesString(name, search);
        
        // Use the updated pattern to test the match
        if (pattern.test(name)) {
            filtData.push(device);
        } else if (pattern.test(mid)) {
            filtData.push(device);
        } else if (resultTest) {
            filtData.push(device);
        } else if (checkConcatenatedString(name, search)) {
            filtData.push(device);
        }
    });
    
    let footer = document.createElement("footer");
    footer.setAttribute("class", "footer");
    footer.innerText += returnString;

      

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
            On Discord: <a class='linkNotFound' href='https://discord.gg/hyTP8ynDAz'>AppleGuy#7469</a><br> \
            On Reddit: <a class='linkNotFound' href='https://reddit.com/u/ytnocontent06'>u/ytnocontent06</a>" 
        requestMsg.style.textAlign = "center";
        requestMsg.style.fontWeight = "bold";
        requestMsg.style.fontSize = "1.5rem";
        notFoundMessage.appendChild(requestMsg);
        
        let notFoundFooter = document.createElement("footer");
        notFoundFooter.setAttribute("class", "footer");
        notFoundFooter.innerText += returnString;
        notFoundFooter.style.position = "absolute";
        notFoundFooter.style.bottom = "0";
        notFoundFooter.style.width = "100%";
        notFoundFooter.style.textAlign = "center";
        notFoundFooter.style.fontSize = "1rem";
        notFoundFooter.style.fontWeight = "normal";
        notFoundFooter.style.color = "gray";
        notFoundFooter.style.marginBottom = "5vh";
        document.body.appendChild(notFoundFooter);

    } else if (filtData.length === 1) {
        // If only one result, redirect to device page

        let model = filtData[0]
            .Info
            .Overview["Model Identifier"]
            .replace(/ /g, "")
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
            let MId = item.Info.Overview["Model Identifier"];
            MId = MId.replace(/_/g, " ")
            text.classList.add("result__text");
            text.innerHTML = `<p class="mid_text_result">${item.Name}</p>
            <p id='mid_text_${item.Info.Overview["Model Identifier"]
                .replace(",", "")
                .replace(/ /g, "")
                .replace("(", "")
                .replace(")", "")}'>${MId} </p>`;
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
                        .replace(/ /g, "_")
                        .replace("(", "")
                        .replace(")", "");
                    // Redirect the user to the detailed page
                    location.href = `detailed.html?model=${modelIdentifier}&type=${item.Type}`;
                });
            }
            
            
        }


        searchResults.appendChild(footer);
        
    }
    document.body.insertBefore(searchResults_heading, searchResultsContainer).style.textAlign = "center";
};



processData().catch((error) => {
    console.error(error);
});
