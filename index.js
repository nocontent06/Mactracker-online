
const searchForm = document.querySelector("#search-form");
const searchWrapper = document.querySelector(".form-group"); // div -> search form
const searchInput = document.getElementById("search-input"); // search input
const suggBox = document.querySelector(".autocom-box"); // suggestion box
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

        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
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

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = searchInput.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

searchInput.setAttribute("required", true)

