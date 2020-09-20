/// cokies  //////////////////////////////////////////////////////////////
function usingCookies() {
    const tempInputs = document.querySelectorAll('[data-temp]');

    function getCookiesAsObject() {
        const cookies = document.cookie.split('; ');

        const cookieObj = cookies.reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;

            return acc;
        }, {})

        return cookieObj;
    }
    const selectedTemp = getCookiesAsObject().temp;

    tempInputs.forEach((input) => {
        if(selectedTemp=== input.value) {
            input.checked = true;
            displayValue(input.value);
        }

        input.addEventListener('change', () => {
            document.cookie = `temp=${input.value}`;
        })
    });
}

/// local storage //////////////////////////////////////////////////////////////
function usingLocalStorage() {
    const tempInputs = document.querySelectorAll('[data-temp]');

    const selectedTemp = localStorage.getItem('temp');

    tempInputs.forEach((input) => {       
        if(selectedTemp=== input.value) {
            input.checked = true;
            displayValue(input.value);
        }

        input.addEventListener('change', () => {
            localStorage.setItem('temp', input.value);
            displayValue(input.value);
        })
    });
};

/// tema //////////////////////////////////////////////////////////////////////////////

function displayValue(unit) {
    const root = "https://api.openweathermap.org/data/2.5/weather?q=Brasov,Ro&appid=c7da641777760054e5ca6164eb47580a";
    console.log("unit: " + unit);

    const tempValue = document.querySelector('[temp-value]');

    fetch(root, {
        method: 'GET'
    }).then(function(resp) {
        return resp.json();
    }).then(function(jsn) {
        console.log("jsn.temp: " + jsn.temp);

        if(unit==="C") {
            tempValue.innerHTML=(jsn.main.temp - 273)+"C";
        } else {
            tempValue.innerHTML=jsn.main.temp+"F";
        }
    });
 }

//usingCookies();
usingLocalStorage();
