// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);

const paramIndex = params.get("index");
const type = params.get("type");

let modelIdentifierExisting = false; 

try {
    let modelIdentifier = null;

    if (paramIndex !== null) {
        // Handle the case with index and type
        console.error("Invalid usage: 'index' parameter should not be used for a single device.");
    } else {
        // Handle the case with only modelIdentifier and type
        modelIdentifier = params.get("modelIdentifier");

        if (modelIdentifier !== null) {
            // Now you can use the modelIdentifier as needed
            console.log("Model Identifier:", modelIdentifier);
            modelIdentifierExisting = true;
        } else {
            console.error("Model Identifier not found.");
        }
    }
} catch (error) {
    console.error(error);
}

let imgDetail = document.querySelector(".img-detail");

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



fetch(`Models/${type}.json`)
    .then(response => response.json())
    .then(data => {
        console.log("Data: ", data[0]);
        // Get index from ModelIdentifier:
        let midIndex = ""
        if (modelIdentifierExisting) {
            let modelIdentifierToFind = params.get("modelIdentifier");
            for (let i = 0; i < data.length; i++) {
                if (data[i].Info.Overview["Model Identifier"] == modelIdentifierToFind) {
                    midIndex = i;
                }
            }

            console.log("Index: ", midIndex);
        }
        // console.log("Data: ", data);
        // console.log("Data: " + data[index].Name);

        // Use the data to populate the detailed view container
        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");

        if (modelIdentifierExisting) {
            detailed_heading.innerHTML = data[midIndex].Name; // Use the index to get the correct data item
        } else {
            detailed_heading.innerHTML = data[paramIndex].Name;
        }

        detailed_heading.classList.add("detailed_heading");
        document.body.insertBefore(detailed_heading, detailedViewContainer);

        // Create image element
        let image = document.createElement("img");

        if (modelIdentifierExisting) {
            image.src = `..\\img\\${data[midIndex].image}`; // Use the index to get the correct image URL
            image.id = `detailed-image-${data[midIndex].Info.Overview["Model Identifier"].replace(",", "")}`;
        } else {
            image.src = `..\\img\\${data[paramIndex].image}`; // Use the index to get the correct image URL
            image.id = `detailed-image-${data[paramIndex].Info.Overview["Model Identifier"].replace(",", "")}`;
        }
        
        image.classList.add("img-detail");
        document.body.insertBefore(image, detailedViewContainer);


        if (modelIdentifierExisting) {
            for (let key in data[midIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up")
                item_container.classList.add("item-container");
                item_container.innerHTML += `<h2 class="item_heading">${key}</h2>`;
    
                for (let detail in data[midIndex].Info[key]) {
                    let infoKey = String(data[midIndex].Info[key][detail]);
                    infoKey = infoKey.replace(/_/g, " ") 
                    item_container.innerHTML += `<p>
                        <strong>${detail}:</strong> ${infoKey}
                    </p>`;
                }
                detailedView.appendChild(item_container);
            }
        } else {
            for (let key in data[paramIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up")
                item_container.classList.add("item-container");
                item_container.innerHTML += `<h2 class="item_heading">${key}</h2>`;
    
                for (let detail in data[paramIndex].Info[key]) {
                    let infoKey = String(data[paramIndex].Info[key][detail]);
                    infoKey = infoKey.replace(/_/g, " ");
                    item_container.innerHTML += `<p>
                    <strong>${detail}:</strong> ${infoKey}
                    </p>`;
                }
                detailedView.appendChild(item_container);
            }
        }

        let footer_detailed = document.createElement("footer");
        footer_detailed.setAttribute("class", "footer");
        footer_detailed.innerText = returnString;

        document.body.appendChild(footer_detailed);
        
        detailedViewContainer.appendChild(detailedView);
    });





    window.onscroll = function () {
        scrollFunction2();
    };
    
    // Make Navbar sticky
    
    let navbar = document.getElementById("bt-nav");
    let sticky = navbar.offsetHeight;
    
    function scrollFunction2() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }
    