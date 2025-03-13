// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);

const paramIndex = params.get("index");
const type = params.get("type");

let modelNumberExisting = false; 

try {
    let modelNumber = null;

    if (paramIndex !== null) {
        // Handle the case with index and type
        console.error("Invalid usage: 'index' parameter should not be used for a single device.");
    } else {
        // Handle the case with only modelNumber and type
        modelNumber = params.get("modelNumber");

        if (modelNumber !== null) {
            // Now you can use the modelNumber as needed
            console.log("Model Number:", modelNumber);
            modelNumberExisting = true;
        } else {
            console.error("Model Number not found.");
        }
    }
} catch (error) {
    console.error(error);
}

let imgDetail = document.querySelector(".img-detail");

const searchFormNav = document.getElementById("search-form-nav");
const searchInputNav = document.getElementById("search-input-nav"); // search input
let linkTagNav = document.getElementById("a-bt"); // link



fetch(`Models/${type}.json`)
    .then(response => response.json())
    .then(data => {
        console.log("Data: ", data[0]);
        // Get index from ModelNumber:
        let mnrIndex = ""
        if (modelNumberExisting) {
            let modelNumberToFind = params.get("modelNumber");
            for (let i = 0; i < data.length; i++) {
                if (data[i].Info.Overview["Model Number"] == modelNumberToFind) {
                    mnrIndex = i;
                }
            }

            console.log("Index: ", mnrIndex);
        }

        // Use the data to populate the detailed view container
        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");

        if (modelNumberExisting) {
            detailed_heading.innerHTML = data[mnrIndex].Name; // Use the index to get the correct data item
        } else {
            detailed_heading.innerHTML = data[paramIndex].Name;
        }

        detailed_heading.classList.add("detailed_heading");
        document.body.insertBefore(detailed_heading, detailedViewContainer);

        // Create image element
        let image = document.createElement("img");

        if (modelNumberExisting) {
            image.src = `..\\img\\${data[mnrIndex].image}`; // Use the index to get the correct image URL
            image.id = `detailed-image-${data[mnrIndex].Info.Overview["Model Number"].replace(",", "")}`;
        } else { 
            image.src = `..\\img\\${data[paramIndex].image}`; // Use the index to get the correct image URL
            image.id = `detailed-image-${data[paramIndex].Info.Overview["Model Number"].replace(",", "")}`;
        }
        
        image.classList.add("img-detail");
        document.body.insertBefore(image, detailedViewContainer);


        if (modelNumberExisting) {
            for (let key in data[mnrIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up")
                item_container.classList.add("item-container");
                item_container.innerHTML += `<h2 class="item_heading">${key}</h2>`;
    
                for (let detail in data[mnrIndex].Info[key]) {
                    let infoKey = String(data[mnrIndex].Info[key][detail]);
                    infoKey = infoKey.replace(/_/g, " ") 
                    item_container.innerHTML += `<p>
                        <strong class="detail-class">${detail}:</strong> ${infoKey}
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





    
    