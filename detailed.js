const params = new URLSearchParams(window.location.search);
const modelIdentifier = params.get("model");
const modelType = params.get("type");

// Add Model Name to the page title
document.title = "Detailed View - " + modelIdentifier;

document.querySelector('meta[property="og:title"]').setAttribute("content", document.title);

fetch(`Models/${modelType}/${modelIdentifier}.json`).then(response => response.json())
    .then(data => {
        // Use the data to populate the detailed view container

        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");
        detailed_heading.innerHTML = data.Name;
        detailed_heading.classList.add("detailed_heading");
        // detailed_heading.style.textAlign = "center";
        // detailed_heading.style.fontSize = "2.5rem";
        // detailed_heading.style.fontWeight = "bold";
        document.body.prepend(detailed_heading);
        
        // Create image element

        let image = document.createElement("img");
        image.src = `..\\img\\${data.image}`;
        image.id = `detailed-image-${data.Info.Overview["Model Identifier"].replace(",", "")}`;
        image.classList.add("img-detail");
        document.body.insertBefore(image, detailedViewContainer);

        for (let key in data.Info) {
            const item_container = document.createElement("div");
            item_container.setAttribute("data-aos", "fade-up")
            item_container.classList.add("item-container");
            item_container.innerHTML += `<h2 class="item_heading">${key}</h2>`;

            for (let detail in data.Info[key]) {
                let infoKey = String(data.Info[key][detail]);
                infoKey = infoKey.replace(/_/g, " ")
                console.log("Info Key: " + infoKey)
                item_container.innerHTML += `<p>
                    <strong>${detail}:</strong> ${infoKey}
                </p>`;
            }
            detailedView.appendChild(item_container);

        }
        let footer_detailed = document.createElement("footer");
        footer_detailed.setAttribute("class", "footer");
        footer_detailed.innerText = returnString;

        document.body.appendChild(footer_detailed);
        
        detailedViewContainer.appendChild(detailedView);
    });
