window.onload = async function () {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        return await response.json();
    };

    const processSearch = async () => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");

        if (!search) {
            console.error("No search query provided.");
            return;
        }

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
        ];

        const models = [
            {
                keywords: [
                    "Mac Mini", "MacMini", "Mac", "Mini"
                ],
                device: "MacMini"
            }, {
                keywords: [
                    "Mac Pro", "MacPro"
                ],
                device: "Mac Pro"
            }, {
                keywords: [
                    "iMac", "iMacPro"
                ],
                device: "iMac"
            }, {
                keywords: [
                    "Mac Studio", "MacStudio", "Mac"
                ],
                device: "Mac Studio"
            }, {
                keywords: [
                    "iOS", "iPhoneOS"
                ],
                device: "iOS"
            }, {
                keywords: ["iPhone"],
                device: "iPhone"
            }, {
                keywords: ["iPad"],
                device: "iPad"
            }, {
                keywords: ["iPod"],
                device: "iPod"
            }, {
                keywords: [
                    "MacBook", "MB", "Mac", "Book"
                ],
                device: "MacBook"
            }, {
                keywords: [
                    "MacBook", "Pro", "MacBook Pro", "MBP", "MacBookPro"
                ],
                device: "MacBook Pro"
            }, {
                keywords: [
                    "MacBook", "Air", "MacBook Air", "MBA", "MacBookAir"
                ],
                device: "MacBook Air"
            }, {
                keywords: [
                    "Apple", "TV", "Apple TV", "AppleTV"
                ],
                device: "AppleTV"
            }, {
                keywords: [
                    "Apple", "Watch", "AppleWatch", "AW"
                ],
                device: "Watch"
            }, {
                keywords: [
                    "Pencil", "Apple Pencil"
                ],
                device: "Pencil"
            }
        ];

        let filteredData = [];

        for (const model of models) {
            if (model.keywords.some(keyword => search.includes(keyword))) {
                const devices = await fetchData(`Models/${model.device}.json`);
                filteredData.push(...devices);
            }
        }

        if (filteredData.length === 0) {
            // If no specific models match, fetch all data
            const allDevices = await Promise.all(
                deviceFiles.map(file => fetchData(`Models/${file}`))
            );
            filteredData = allDevices.flat();
        }

        return filteredData.filter(item => {
            const name = item.Name.toLowerCase();
            const modelIdentifier = item.Info.Overview["Model Identifier"].toLowerCase();
            const searchTerm = search.toLowerCase();
            return name.includes(searchTerm) || modelIdentifier.includes(searchTerm);
        });
        
    };

    const renderResults = async () => {
        try {
            const searchResults = await processSearch();
            const searchResultsContainer = document.getElementById("search-results");
            if (searchResults.length === 0) {
                const notFoundMessage = document.createElement("p");
                notFoundMessage.innerHTML = "Not Found :(";
                notFoundMessage.style.textAlign = "center";
                notFoundMessage.style.fontWeight = "bold";
                notFoundMessage.style.fontSize = "2rem";
                searchResultsContainer.appendChild(notFoundMessage);
            } else {
                for (const item of searchResults) {
                    const result = document.createElement("div");
                    result
                        .classList
                        .add("result");

                    const image = document.createElement("img");
                    image.src = `img/${item.image}`;
                    image
                        .classList
                        .add("result_img");
                    result.appendChild(image);

                    const text = document.createElement("div");
                    text
                        .classList
                        .add("result__text");
                    text.innerHTML = `<p class="mid_text_result">${item.Name}</p>`;
                    result.appendChild(text);

                    searchResultsContainer.appendChild(result);
                }
            }
        } catch (error) {
            console.error("Error processing search:", error);
        }
    };

    // Call the renderResults function to initiate search processing and rendering
    renderResults();
};
