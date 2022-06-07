(function() {
    searchByLocation();
})();

function searchByLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function error(error){
        $("#loading-message").html('<h2>No se pudo obtener la información del tiempo</h2>');
        $("#weather-container__city").css("visibility", "hidden");
        window.alert("No se pudo obtener la información sobre el tiempo. Comprueba que tienes activada la localización en tu dispositivo \n\n" + "{Error: " + error.message + "}");
    }

    function success(position){
        var key = "220bf77b081743862a50f764cf8773c8"

        
        document.getElementById("weather-container__icon").innerHTML = '';
        document.getElementById("weather-container__temp").innerHTML = '';
        document.getElementById("weather-container__city").innerHTML = '';

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude + "&lon=" + longitude + "&units=metric&appid=" + key;

        gatherInfo(url);
    }
}

function enterSearch(event){
    if(event.keyCode === 13)
    {
        var input = document.getElementById("search-field");
        if(input.value){
            document.getElementById("search-button").click();
        }
    }else{
        document.getElementById("search-field").style.color = '#ffffff';
    }
}

var lastCity = "";

function searchCity(){
    var city = document.getElementById("search-field").value;

    if(city.toLowerCase() != lastCity.toLowerCase()){
        var key = "220bf77b081743862a50f764cf8773c8"

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=" + key;
        gatherInfo(url);
    }
}

function gatherInfo(url){
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var temp = Math.round(data.main.temp);
            var city = data.name;
            var country = data.sys.country;
            var description = data.weather[0].main;

            if(description === "Dust" || description === "Smoke")
                description = "Mist";

            var date = new Date().getUTCHours();

            if(date === 0){
                date = 24;
            }

            var time = (date + (data.timezone / 3600)) % 24;

            document.getElementById("weather-container__temp").innerHTML = temp + "° C";
            document.getElementById("weather-container__city").innerHTML = city + ", " + country;

            var imageDescription = {
                Clouds: 
                '<div class="cloud-icon-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#dddddd" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>'+
                '<div class="cloud-icon-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#aaaaaa" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>',
                Clear:
                '<div class="sun-icon">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffcc00" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>'+
                '</div>',
                ClearNight:
                '<div class="moon-icon">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffbb" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>'+
                '</div>',
                Thunderstorm: 
                '<div class="storm-cloud-icon-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>'+
                '<div class="storm-cloud-icon-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#444444" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>',
                Snow: 
                '<div class="snow-main">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>'+
                '<div class="snow-small-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>'+
                '<div class="snow-small-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>',
                Rain: 
                '<div class="rain-cloud">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>'+
                '<div class="rain-drops">'+
                    '<div class="rain-drop-1">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                    '</div>'+ 
                    '<div class="rain-drop-2">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                    '</div>'+
                    '<div class="rain-drop-3">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                    '</div>'+
                    '<div class="rain-drop-4">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                    '</div>'+
                '</div>',
                Drizzle:
                '<div class="rain-cloud">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>'+   
                '<div class="rain-drops">'+
                    '<div class="drizzle-drop-1">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                    '</div>'+ 
                    '<div class="drizzle-drop-2">'+
                        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                    '</div>'+
                '</div>',
                Mist:
                '<div class="mist-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-2">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-3">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+

                '</div>',
                Dust:
                '<div class="mist-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-2">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-3">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+

                '</div>',
                Smoke:
                '<div class="mist-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-2">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+
                '</div>'+
                    '<div class="mist-3">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffffff" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>'+

                '</div>',
            };

              if (imageDescription[description] !== undefined) {
                if(description === "Clear"){
                    if(time < 6 || time >= 20){
                        description += "Night";
                    }
                }
                document.getElementById("weather-container__icon").innerHTML = imageDescription[description];

              } 
              else {
                $("#weather-container__icon").html('<div class="mx-auto" id="weather-icon-pic"><img class="text-center" src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png" alt="Image of weather"></div>')
              }

            var lowTherm = 
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="var(--therm-color)" class="bi bi-thermometer-low" viewBox="0 0 16 16">'+
                '<path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415z"/>' +
                '<path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>' +
            '</svg>'

            var halfTherm = 
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="var(--therm-color)" class="bi bi-thermometer-half" viewBox="0 0 16 16">'+
                '<path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>' +
                '<path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>' +
            '</svg>'

            var highTherm = 
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="var(--therm-color)" class="bi bi-thermometer-high" viewBox="0 0 16 16">'+
                '<path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415z"/>' +
                '<path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>' +
            '</svg>'

            var color = "";
            var thermometerElem = document.getElementById("thermometer");

            if(temp >= 29){
                color = "#ff0000";
                thermometerElem.innerHTML = highTherm;
            }else if(temp >= 26){
                color = "#ff6000";
                thermometerElem.innerHTML = highTherm;
            }else if(temp >= 23){
                color = "#ffc000";
                thermometerElem.innerHTML = halfTherm;
            }else if(temp >= 20){
                color = "#ffe800";
                thermometerElem.innerHTML = halfTherm;
            }else if(temp >= 17){
                color = "#92d050";
                thermometerElem.innerHTML = halfTherm;
            }else if(temp >= 14){
                color = "#00802e";
                thermometerElem.innerHTML = lowTherm;
            }else{
                color = "#0033aa";
                thermometerElem.innerHTML = lowTherm;
            }

            document.documentElement.style.setProperty('--therm-color', color);
            
            document.getElementById("loading-message").style.display = "none";
            document.getElementById("search-container").style.display = "flex";
            document.getElementById("weather-container").style.display = "flex";

            document.body.className = description.toLowerCase() + "-bg";

            var input = document.getElementById("search-field");

            lastCity = input.value;

            input.setAttribute('readonly', 'readonly');
            input.setAttribute('disabled', 'true');
            setTimeout(function() {
                input.blur();
                input.removeAttribute('readonly');
                input.removeAttribute('disabled');
            }, 100);
        })
        .catch(function(exception){ 
            document.getElementById("search-field").style.color = "#ff0000";
        })
}