
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
        searchInput.classList.remove("active"); //hide autocomplete box
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
    <a href="https://github.com/nocontent06" target="_blank" style="color: gray">\
    <i class="fa-brands fa-github" style="font-size: 3vh"></i>\
    </a>\
    \
    <a href="https://discord.gg/hyTP8ynDAz" target="_blank" style="color: gray">\
    <i class="fa-brands fa-discord" style="font-size: 3vh"></i>\
    </a><br>\
    <p style="color: gray">Data provided by \
    <li>Me, myself and I with all my Macs</li>\
    <li><a href="https://apple.com" target="_blank" style="color: gray">Apple Inc.</a></li>\
    <li><a href="https://everymac.com" target="_blank" style="color: gray">EveryMac.com</a></li>'

searchForm.appendChild(footer_index);