
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

const searchResults_heading = document.createElement("h1");
searchResults_heading.id = "search-results-heading";
searchResults_heading.innerText = "Search Results for " + search;
searchResultsContainer = document.getElementById("search-results-container");

// Use the data to populate the search results container
const searchResults = document.getElementById("search-results");
searchResults.classList.add("resultContainer")

const regexmodelNumber = new RegExp(
    `A[0-9,]+$`
)

// Extract year from search query (if present)
const yearMatch = cleanedSearch.match(/\b(19\d{2}|20\d{2})\b/);
const searchYear = yearMatch ? parseInt(yearMatch[0]) : null;
console.log("Extracted year from search:", searchYear);

// Remove year from search for device type matching
const searchWithoutYear = searchYear 
    ? cleanedSearch.replace(/\b(19\d{2}|20\d{2})\b/g, '').trim().replace(/\s+/g, ' ')
    : cleanedSearch;
console.log("Search without year:", searchWithoutYear);

// Cache for loaded JSON data
const jsonCache = new Map();

const fetchJSON = async (url) => {
    // Check if data is already cached
    if (jsonCache.has(url)) {
        console.log(`Using cached data for ${url}`);
        return jsonCache.get(url);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    const data = await response.json();
    
    // Cache the data
    jsonCache.set(url, data);
    return data;
};

const searchInputNav = document.getElementById("search-input-nav"); // search input
let linkTagNav = document.getElementById("a-bt"); // link

// Get footer element reference
const footer = document.querySelector('.footer');

// Declare filtData at module scope so it's accessible for sorting
let filtData = [];

const processData = async () => {
    const deviceFiles = [
        "AppleTV.json",
        "Display.json",
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
        "Pencil.json",
        "macOS.json",
        "Xserve.json"
        // Add other device JSON file names here
    ];

    const data = [];

    const fetchAllJSON = async (directory, device) => {
        // Fetch all files in parallel instead of sequentially
        const fetchPromises = device.map(file => 
            fetchJSON(`${directory}/${file}`)
                .then(jsonData => {
                    data.push(jsonData);
                    return jsonData;
                })
                .catch(error => {
                    console.error(`Error fetching ${file}: ${error}`);
                    return null;
                })
        );
        
        await Promise.all(fetchPromises);
        console.log(`Fetched ${device.length} files from ${directory}`);
    };

    console.log("Data: ", data);

    // Reset filtData array (don't redeclare it)
    filtData = [];

    function includesString(s1, s2) {
        // Remove parentheses and spaces from both strings
        const s1Cleaned = s1.replace(/\(|\)|\s/g, "");
        const s2Cleaned = s2.replace(/\(|\)|\s/g, "");
    
        // Check if s2Cleaned is a substring of s1Cleaned
        return s1Cleaned.includes(s2Cleaned);
    }

    // Helper function to check if device matches year
    function matchesYear(deviceInfo, year) {
        if (!year) return true; // No year filter
        
        // Check various year fields
        const introduced = deviceInfo.Info?.Overview?.Introduced;
        const discontinued = deviceInfo.Info?.Overview?.Discontinued;
        
        if (introduced) {
            const deviceYear = parseInt(introduced.match(/\b(19\d{2}|20\d{2})\b/)?.[0]);
            if (deviceYear === year) return true;
        }
        
        // Also check model identifier for year hints (e.g., "MacBookPro11,1" where 11 might indicate 2011)
        // Or check if the name contains the year
        if (deviceInfo.Name && deviceInfo.Name.includes(year.toString())) {
            return true;
        }
        
        return false;
    }

    function checkConcatenatedString(arr, targetString) {
        if (!targetString || targetString.trim() === '') return false;
        
        const targetArray = targetString.split(" ").filter(word => word.length > 0);
        targetArray.forEach((item, index) => {
            if (item.includes('"')) {
                targetArray[index] = item.replace('"', "-inch");
            }
        });
        
        console.log("Target Array:", targetArray, "Keywords:", arr);
        
        // First, try to match the full search string against multi-word keywords
        const fullSearchLower = targetString.toLowerCase();
        for (const keyword of arr) {
            const keywordLower = keyword.toLowerCase();
            if (keywordLower.includes(' ')) {
                // Multi-word keyword - check if all words match
                const keywordWords = keywordLower.split(' ');
                if (keywordWords.every(word => fullSearchLower.includes(word))) {
                    console.log("Match result: true (multi-word keyword matched)");
                    return true;
                }
            }
        }
        
        // Check if all words in targetArray exist in the keywords array (exact match, case-insensitive)
        const result = targetArray.every(item => 
            arr.some(keyword => keyword.toLowerCase() === item.toLowerCase())
        );
        
        console.log("Match result:", result);
        return result;
    }

    const models = [
        { keywords: ["MacBook Pro", "MBP", "MacBookPro"], device: "MacBook Pro" },
        { keywords: ["MacBook Air", "MBA", "MacBookAir"], device: "MacBook Air" },
        { keywords: ["MacBook", "MB"], device: "MacBook" },
        { keywords: ["Mac Pro", "MacPro"], device: "Mac Pro" },
        { keywords: ["Mac Mini", "MacMini", "Mini"], device: "MacMini" },
        { keywords: ["Mac Studio", "MacStudio", "Studio"], device: "Mac Studio" },
        { keywords: ["iMac", "iMacPro"], device: "iMac" },
        { keywords: ["iPhoneOS"], device: "iPhoneOS"},
        { keywords: ["iOS"], device: "iOS" },
        { keywords: ["iPhone"], device: "iPhone" },
        { keywords: ["iPad"], device: "iPad" },
        { keywords: ["iPod"], device: "iPod" },
        { keywords: ["Apple TV", "AppleTV", "TV"], device: "AppleTV" },
        { keywords: ["Apple Watch", "AppleWatch", "AW", "Watch"], device: "Watch"},
        { keywords: ["Pencil", "Apple Pencil"], device: "Pencil"},
        { keywords: ["macOS", "MacOS"], device: "macOS"},
        { keywords: ["Xserve", "XServe"], device: "Xserve"}
    ];
    
    // Generic search terms that should load all files
    const genericTerms = ["mac", "apple"];
    
    let found = false;
    
    // Check if search is only a year
    if (searchYear && cleanedSearch.trim() === searchYear.toString()) {
        console.log("Year-only search detected:", searchYear);
        // Load all device files for year search
        await fetchAllJSON("Models", deviceFiles);
        found = true;
    } else if (genericTerms.includes(searchWithoutYear.toLowerCase().trim())) {
        // Generic search - load all files to search across all devices
        console.log("Generic search term detected, loading all device files...");
        await fetchAllJSON("Models", deviceFiles);
        found = true;
    } else {
        // Check for device type keywords (use search without year)
        for (const model of models) {
            console.log("Model: " + model.keywords);
            console.log("Testing against:", searchWithoutYear);
            if (checkConcatenatedString(model.keywords, searchWithoutYear)) {
                console.log("TRUE - Matched device type:", model.device);
                const devices = await fetchJSON(`Models/${model.device}.json`);

                // Push each device into the filtData array, filtering by year if present
                for (let i = 0; i < devices.length; i++) {
                    const deviceInfo = devices[i];
                    if (!searchYear || matchesYear(deviceInfo, searchYear)) {
                        filtData.push(deviceInfo);
                    }
                }

                found = true;
                break;
            } else if (checkConcatenatedString(model.keywords, cleanedSearch)) {
                console.log("TRUE - Matched with year included");
                const devices = await fetchJSON(`Models/${model.device}.json`);
                
                // Push matched devices, filtering by year if present
                for (let i = 0; i < devices.length; i++) {
                    const deviceInfo = devices[i];
                    if (!searchYear || matchesYear(deviceInfo, searchYear)) {
                        filtData.push(deviceInfo);
                    }
                }
                
                found = true;
                break;
            } else if (regexmodelNumber.test(cleanedSearch)) {
                console.log("Testing model number pattern");
                const devices = await fetchJSON(`Models/${model.device}.json`);
                
                // Check each device for model number match
                for (let i = 0; i < devices.length; i++) {
                    const deviceInfo = devices[i];
                    const mnr = deviceInfo.Info.Overview["Model Number"];
                    const omnr = deviceInfo.Info.Overview["Other Model Numbers"];
                    
                    if (pattern.test(mnr) || pattern.test(omnr)) {
                        if (!searchYear || matchesYear(deviceInfo, searchYear)) {
                            filtData.push(deviceInfo);
                        }
                    }
                }
                
                if (filtData.length > 0) {
                    found = true;
                    break;
                }
            }
        }
        
        if (!found) {
            // Only load all files as last resort
            console.log("No keyword match found, loading all device files...");
            await fetchAllJSON("Models", deviceFiles);
        }
    }

    console.log("Filtered Data: ", filtData);


    if (filtData.length >= 0) {
        for (let i = 0; i < data.length; i++) {

            const deviceInfo = data[i];

            
            for (let j = 0; j < deviceInfo.length; j++) {
                // console.log("Device Info Len: ", deviceInfo);
                let name = deviceInfo[j].Name;
                let mid = deviceInfo[j].Info.Overview["Model Identifier"];
                let mnr = deviceInfo[j].Info.Overview["Model Number"];
                let omnr = deviceInfo[j].Info.Overview["Other Model Numbers"];
            
                // const name = deviceInfo[i].Name;
    
                // console.log("Name: ", name);
    
                const resultTest = includesString(name, search);
                // console.log("Device Info: ", deviceInfo[j]);

        
                if (pattern.test(name)) {
                    if (!searchYear || matchesYear(deviceInfo[j], searchYear)) {
                        filtData.push(deviceInfo[j]);
                    }
                } else if (pattern.test(mid)) {
                    if (!searchYear || matchesYear(deviceInfo[j], searchYear)) {
                        filtData.push(deviceInfo[j]);
                    }
                } else if (resultTest) {
                    if (!searchYear || matchesYear(deviceInfo[j], searchYear)) {
                        filtData.push(deviceInfo[j]);
                    }
                } else if (pattern.test(mnr)) {
                    if (!searchYear || matchesYear(deviceInfo[j], searchYear)) {
                        filtData.push(deviceInfo[j]);
                    }
                } else if (pattern.test(omnr)) {
                    if (!searchYear || matchesYear(deviceInfo[j], searchYear)) {
                        filtData.push(deviceInfo[j]);
                    }
                }
            }
        }
    }


    console.log("Filtered Data: ", filtData);
    console.log("Filtered Data Length: ", filtData.length);

    searchResults_heading.innerText = filtData.length + " Results for " + search;

    // Show sort controls if there are multiple results
    if (filtData.length > 1) {
        document.querySelector('.sort-controls').style.display = 'block';
    }

    if (filtData.length === 0) {
        const notFoundMessage = document.createElement("p");
        notFoundMessage.innerHTML = "'" + search + "' not found :("
        notFoundMessage.style.textAlign = "center";
        notFoundMessage.style.position = "absolute";
        notFoundMessage.style.fontWeight = "bold";
        notFoundMessage.style.fontSize = "1.8rem";
        searchResults.appendChild(notFoundMessage);

        const notFoundHr = document.createElement("hr");
        notFoundMessage.appendChild(notFoundHr);

        const requestMsg = document.createElement("p");
        requestMsg.innerHTML = "If you want to request a device, please contact me <br> \
            On Twitter: <a class='linkNotFound' href='https://twitter.com/@mactracker.online'> @mactracker.online </a> <br> \
            On Discord: <a class='linkNotFound' href='https://discord.gg/hyTP8ynDAz'> i_progeny </a><br> \
            On Reddit: <a class='linkNotFound' href='https://reddit.com/u/ytnocontent06'>u/ytnocontent06</a>"
        requestMsg.style.textAlign = "center";
        requestMsg.style.fontWeight = "bold";
        requestMsg.style.fontSize = "1rem";
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
            let modelNumber = filtData[0]
                .Info
                .Overview["Model Number"]
                // .replace(/ /g, "")
                // .replace("(", "")
                // .replace(")", "");
            location.href = `detailed.html?modelNumber=${modelNumber}&type=${filtData[0].Type}`; // Use foundIndex here
    } else {
        renderResults(filtData);
        // Footer is already in the HTML, no need to append it
    }

};

// Function to render results
function renderResults(dataArray) {
    // Clear existing results
    searchResults.innerHTML = '';
    
    for (let index = 0; index < dataArray.length; index++) {
        const item = dataArray[index];

        console.log("item: " + item);

        const result = document.createElement("div");
        result.classList.add("result");

        // Create image element
        let image = document.createElement("img");
        image.src = `img/${item.image}`;
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
            location.href = `detailed.html?modelNumber=${item.Info.Overview["Model Number"]}&type=${item.Type}`;
        });
    }
}

// Sorting function
function sortResults(dataArray, sortType) {
    const sorted = [...dataArray]; // Create a copy to avoid mutating original
    
    switch(sortType) {
        case 'name-asc':
            sorted.sort((a, b) => a.Name.localeCompare(b.Name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.Name.localeCompare(a.Name));
            break;
        case 'date-newest':
            sorted.sort((a, b) => {
                const dateA = parseIntroducedDate(a.Info.Overview.Introduced);
                const dateB = parseIntroducedDate(b.Info.Overview.Introduced);
                return dateB - dateA; // Newest first
            });
            break;
        case 'date-oldest':
            sorted.sort((a, b) => {
                const dateA = parseIntroducedDate(a.Info.Overview.Introduced);
                const dateB = parseIntroducedDate(b.Info.Overview.Introduced);
                return dateA - dateB; // Oldest first
            });
            break;
        case 'model-asc':
            sorted.sort((a, b) => a.Info.Overview["Model Identifier"].localeCompare(b.Info.Overview["Model Identifier"]));
            break;
        case 'model-desc':
            sorted.sort((a, b) => b.Info.Overview["Model Identifier"].localeCompare(a.Info.Overview["Model Identifier"]));
            break;
        default:
            // No sorting
            break;
    }
    
    return sorted;
}

// Helper function to parse introduced date
function parseIntroducedDate(dateStr) {
    if (!dateStr) return new Date(0);
    
    // Extract month and year from formats like "Jan 2006", "January 2006", "Mar 2024"
    const monthNames = {
        'jan': 0, 'january': 0, 'feb': 1, 'february': 1, 'mar': 2, 'march': 2,
        'apr': 3, 'april': 3, 'may': 4, 'jun': 5, 'june': 5,
        'jul': 6, 'july': 6, 'aug': 7, 'august': 7, 'sep': 8, 'september': 8,
        'oct': 9, 'october': 9, 'nov': 10, 'november': 10, 'dec': 11, 'december': 11
    };
    
    const match = dateStr.match(/([a-z]+)\s+(\d{4})/i);
    if (match) {
        const month = monthNames[match[1].toLowerCase()] || 0;
        const year = parseInt(match[2]);
        return new Date(year, month);
    }
    
    return new Date(0);
}

searchResults_heading.style.textAlign = "center";
document.body.insertBefore(searchResults_heading, searchResultsContainer);

processData().then(() => {
    // Initialize sort dropdown after data is loaded
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && filtData.length > 1) {
        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            const sortedData = sortResults(filtData, sortType);
            renderResults(sortedData);
            // Footer is already in the HTML, no need to append it
        });
    }
}).catch((error) => {
    console.error(error);
});
