const searchFormIndex = document.getElementById("search-form-index");
const searchInputIndex = document.getElementById("search-input-index");
let linkTag = document.getElementById("a-index");

const searchFormNav = document.getElementById("search-form-nav");
const searchInputNav = document.getElementById("search-input-nav");
let linkTagNav = document.getElementById("a-bt");

searchFormIndex.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let webLink = `results.html?search=${searchInputIndex.value}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
});

// Update footer dynamically with main.js variables
function updateFooter() {
    // Wait for main.js variables to be available
    if (typeof version === 'undefined' || typeof build === 'undefined' || typeof commit === 'undefined') {
        // If variables aren't loaded yet, try again in a bit
        setTimeout(updateFooter, 200);
        return;
    }

    const versionInfoElements = document.querySelectorAll('.version-info');
    if (versionInfoElements.length >= 4) {
        versionInfoElements[0].textContent = `Version ${version} (Build ${build})`;
        versionInfoElements[1].textContent = `Commit: ${commit}`;
        versionInfoElements[2].textContent = `©2023-2026 MangoCoding-Inc. (Felix)`;
        versionInfoElements[3].textContent = "All rights reserved.";
    }

    // Update social links with correct URLs
    const githubLink = document.querySelector('a[aria-label="GitHub"]');
    const discordLink = document.querySelector('a[aria-label="Discord"]');
    
    if (githubLink) {
        githubLink.href = "https://github.com/nocontent06";
    }
    
    if (discordLink) {
        discordLink.href = "https://discord.gg/hyTP8ynDAz";
    }
}

// Cache for loaded JSON data  
const jsonCacheIndex = new Map();

const fetchJSON = async (url) => {
    // Check if data is already cached
    if (jsonCacheIndex.has(url)) {
        console.log(`Using cached data for ${url}`);
        return jsonCacheIndex.get(url);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    const data = await response.json();
    
    // Cache the data
    jsonCacheIndex.set(url, data);
    return data;
};

async function fetchData() {
    try {
        const iPhones = await fetchJSON(`Models/iPhone.json`);
        const MacBooks = await fetchJSON(`Models/MacBook Pro.json`);
        const featuredArray = [
            iPhones[iPhones.length - 1], 
            iPhones[iPhones.length - 2], 
            iPhones[iPhones.length - 4], 
            MacBooks[MacBooks.length - 3], 
            MacBooks[MacBooks.length - 1]
        ];

        const featuredContainer = document.getElementById('featuredContainer');
        
        for (let index = 0; index < featuredArray.length; index++) {
            const item = featuredArray[index];

            const featuredBox = document.createElement("div");
            featuredBox.classList.add("result");

            // Create image container
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("featured_img");
            
            const fImage = document.createElement("img");
            fImage.src = `img/${item.image}`;
            fImage.alt = item.Name;
            
            imageContainer.appendChild(fImage);
            featuredBox.appendChild(imageContainer);

            // Create text content
            const nameElement = document.createElement("div");
            nameElement.classList.add("res_name");
            nameElement.innerHTML = item.Name; // Changed from textContent to innerHTML
            
            const modelElement = document.createElement("div");
            modelElement.classList.add("mid_text_result");
            let modelId = item.Info.Overview["Model Identifier"];
            modelId = modelId.replace(/_/g, " ");
            modelElement.innerHTML = modelId; // Changed from textContent to innerHTML

            featuredBox.appendChild(nameElement);
            featuredBox.appendChild(modelElement);
            featuredContainer.appendChild(featuredBox);

            // Add click event
            featuredBox.addEventListener("click", function () {
                location.href = `detailed.html?modelNumber=${item.Info.Overview["Model Number"]}&type=${item.Type}`;
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        const featuredContainer = document.getElementById('featuredContainer');
        featuredContainer.innerHTML = '<p>Error loading featured items. Please try again later.</p>';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure main.js variables are loaded
    setTimeout(() => {
        updateFooter();
        fetchData();
    }, 100);
});

// If main.js is loaded after this script, we can also call updateFooter after a short delay
setTimeout(updateFooter, 100);
