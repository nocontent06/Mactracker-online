let suggestions = [];
let data = [];

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
    "Macmini9,1.json"
];
const filesMacPro = [
    "MacPro1,1.json",
    "MacPro2,1.json",
    "MacPro3,1.json",
    "MacPro4,1.json",
    // "MacPro5,1.json",
    "MacPro6,1.json",
    "MacPro7,1.json"
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
    "iMac21,2.json",
];

const filesMacStudio = [
    "Mac13,1.json",
    "Mac13,2.json",
]

const filesiOS = [
    "iPhoneOS.json",
    "iPhoneOS2.json",
    "iPhoneOS3.json"
]

const filesiPhone = [
    "iPhone1,1.json",
    "iPhone1,2.json",
    "iPhone2,1.json",
    "iPhone3,1.json",
    "iPhone3,2.json",
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
    "MacBook10,1.json",
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
    "Mac14,2.json"
]


const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
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
};

async function processData() {

    await Promise.all([
        fetchAllJSON("Models/Mac Mini", filesMacMini),
        fetchAllJSON("Models/Mac Pro", filesMacPro),
        fetchAllJSON("Models/iMac", filesiMac),
        fetchAllJSON("Models/Mac Studio", filesMacStudio),
        fetchAllJSON("Models/iOS", filesiOS),
        fetchAllJSON("Models/iPhone", filesiPhone),
        fetchAllJSON("Models/MacBook", filesMacBook),
        fetchAllJSON("Models/MacBook Air", filesMacBookAir),
    ]);

    function getName(item) {
        return item.Name;
    }
    
    
    for(let i = 0; i < data.length; i++){
        suggestions.push(getName(data[i]));
        // replace every ( with nothing 
        suggestions[i] = suggestions[i]
        .replace("(", "")
        .replace(")", "")
        .replace("Server <br> Mid", "Server")
        .replace("Server <br> Late", "Server")
        .replace(",", "");
    }

    console.log(suggestions[3]);
}


processData().catch((error) => {
    console.error(error);
});




