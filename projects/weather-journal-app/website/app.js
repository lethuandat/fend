/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?appid=";

// Personal API Key for OpenWeatherMap API
const apiKey = "fca81b4e6ef4b52296dc224458937b97&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.toDateString();

const generateData = async () => {
    const zip = document.getElementById("zip").value;
    const feel = document.getElementById("feelings").value;

    if (zip == null || zip === "" || zip === '') {
        document.getElementById("error").innerHTML = "Zip is required!";
        document.getElementById("date").innerHTML = "";
        document.getElementById("temp").innerHTML = "";
        document.getElementById("content").innerHTML = "";
        return;
    }

    try {
        const response = await fetch(baseURL + apiKey + '&zip=' + zip);
        const data = await response.json();
        if (data && data.cod !== 200) {
            document.getElementById("error").innerHTML = data.message;
            document.getElementById("date").innerHTML = "";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("content").innerHTML = "";
        }

        if (data && data.cod === 200) {
            document.getElementById("error").innerHTML = "";
            let temp = data.main && data.main.temp ? data.main.temp : 0;
            const info = {
                date,
                temp: Math.round(temp),
                feel,
            };

            await postData("/add", info);
            await retrieveData();
        }
    } catch (error) {
        console.log("error", error);
    }
};
document.getElementById("generate").addEventListener("click", generateData);

const postData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const retrieveData = async () => {
    const response = await fetch("/all");
    try {
        const allData = await response.json();
        console.log(allData);
        document.getElementById("date").innerHTML = "Date: " + allData.date;
        document.getElementById("temp").innerHTML = "Temp: " + Math.round(allData.temp) + " degrees.";
        document.getElementById("content").innerHTML = "Content: " + allData.feel;
    } catch (error) {
        console.log("error", error);
    }
};
