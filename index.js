const searchForm = document.querySelector("#search-form");
const searchWrapper = document.querySelector(".form-group"); // div -> search form
const searchInput = document.getElementById("search-input"); // search input
let inputBox = document.querySelector("input"); // input
let linkTag = document.querySelector("a"); // link

inputBox.onkeyup = (e) => {
    console.log(e.target.value);
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    if (userData) {

        searchForm.addEventListener("submit", function (event) {
            console.log(searchInput.value);
            event.preventDefault();
            let webLink = `results.html?search=${searchInput.value}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        });

    } else {
        searchInput
            .classList
            .remove("active"); //hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    searchInput.value = selectData;
    searchInput
        .classList
        .remove("active");
}

searchInput.setAttribute("required", true)

let footer_index = document.createElement("footer");
footer_index.setAttribute("class", "footer");
footer_index.innerText = returnString;
footer_index.innerHTML += '<br> \
    <a href="https://github.com/nocontent06" target="_blank" style="col' +
        'or: gray">\
    <i class="fa-brands fa-github" style="font-size: 3vh"></i>\
  ' +
        '  </a>\
    \
    <a href="https://discord.gg/hyTP8ynDAz" target="_blank" styl' +
        'e="color: gray">\
    <i class="fa-brands fa-discord" style="font-size: 3vh"><' +
        '/i>\
    </a><br>\
    <p style="color: gray">Data provided by \
    <li class' +
        '="no-style-type">Me, myself and I with all my Macs</li>\
    <li class="no-sty' +
        'le-type"><a href="https://apple.com" target="_blank" style="color: gray">Apple' +
        ' Inc.</a></li>\
    <li class="no-style-type"><a href="https://everymac.com" t' +
        'arget="_blank" style="color: gray">EveryMac.com</a></li>'

searchForm.appendChild(footer_index);

const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return await response.json();
};

async function fetchData() {
    const iPhones = await fetchJSON(`Models/iPhone.json`);
    const MacBooks = await fetchJSON(`Models/MacBook Pro.json`);
    const featuredArray = [iPhones[iPhones.length - 1], iPhones[iPhones.length - 2], iPhones[iPhones.length - 4], MacBooks[MacBooks.length - 3], MacBooks[MacBooks.length - 1]];

    for (let index = 0; index < featuredArray.length; index++) {
        const item = featuredArray[index]; // Corrected variable name
        const featuredContainer = document.getElementById('featuredContainer');
        featuredContainer
            .classList
            .add("resultContainer")

        const featuredBox = document.createElement("div");
        featuredBox
            .classList
            .add("featuredBox", "result");

        let fImage = document.createElement("img");
        fImage.src = `img/${item.image}`;
        fImage
            .classList
            .add("featured_img");

        featuredBox.prepend(fImage);

        const text = document.createElement("div");
        let MId = item
            .Info
            .Overview["Model Identifier"];
        MId = MId.replace(/_/g, " ");
        text
            .classList
            .add("result__text");
        text.innerHTML = `<p class="mid_text_result">${item
            .Name}</p>
            <p id='mid_text_${item
            .Info
            .Overview["Model Identifier"]
            .replace(/,/g, "")
            .replace(/ /g, "")
            .replace("(", "")
            .replace(")", "")}'>${MId} </p>`;
        featuredBox.appendChild(text);

        featuredContainer.appendChild(featuredBox);

        featuredBox.addEventListener("click", function () {
            location.href = `detailed.html?modelIdentifier=${item
                .Info
                .Overview["Model Identifier"]}&type=${item
                .Type}`;
        });
    }
}

fetchData();
