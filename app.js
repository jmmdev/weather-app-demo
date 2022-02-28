(function() {
    searchByLocation();
})();

function searchByLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
        document.getElementById("weather-container__temp").innerHTML = '<h2 style="color: white; text-align: center">Cargando información...</h2>';
    }

    function error(error){
        $("#weather-container__placeholder").html('<h2 style="color: white; text-align: center; top: 25%; position: absolute">No se pudo obtener la información del tiempo</h2>');
        $("#city-val").css("visibility", "hidden");
        window.alert("No se pudo obtener la información sobre el tiempo. Comprueba que tienes activada la localización en tu dispositivo \n\n" + "{Error: " + error.message + "}");
    }

    function success(position){
        var key = "220bf77b081743862a50f764cf8773c8"

        
        document.getElementById("weather-container__icon").innerHTML = '';
        document.getElementById("weather-container__temp").innerHTML = '';
        document.getElementById("city-val").innerHTML = '';

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude + "&lon=" + longitude + "&units=metric&appid=" + key;

        gatherInfo(url);
    }
}

function locationMode(){
    searchByLocation();
    document.getElementById("weather-info").style.display = "block";
    document.getElementById("location-mode-button").style.opacity = "100%";
    document.getElementById("search-container").style.display = "none";
    document.getElementById("search-mode-button").style.opacity = "50%";
}

function searchMode(){
    document.getElementById("weather-info").style.display = "none";
    document.getElementById("location-mode-button").style.opacity = "50%";

    let cities = ["Ouagadougou", "Bilbao", "Sidney", "Corrientes", "Ontario", "Osaka", "Siria", "Coquimbo"];
    cities.sort();

    var output = '<ul id="cities-list">';

    for(let c of cities){
        output += '<li id="'+ c +'" onclick="searchCity(this.id)">'+ c +'</li>';
    }

    output+='</ul>';

    console.log(output);

    document.getElementById("search-list").innerHTML = output;

    document.getElementById("search-container").style.display = "block";
    document.getElementById("search-mode-button").style.opacity = "100%";
}

function searchCity(city){
    var key = "220bf77b081743862a50f764cf8773c8"

    document.getElementById("weather-container__icon").innerHTML = '';
    document.getElementById("weather-container__temp").innerHTML = '<h2 style="color: white; text-align: center">Cargando información...</h2>';
    document.getElementById("city-val").innerHTML = '';

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=" + key;

    gatherInfo(url);

    document.getElementById("search-container").style.display = "none";
    document.getElementById("weather-info").style.display = "block";
}

function filterCities(){
    var input, filter, ul, li, a, txtValue;
    input = document.getElementById("city-search");
    filter = input.value.toUpperCase();
    console.log(filter);
    ul = document.getElementById("cities-list");
    li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        txtValue = li[i].innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
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

            document.getElementById("weather-container__temp").innerHTML = '<div class="display-1 text-center mt-4" id="temp-val">'+ temp + "° C" + '</div>'
            document.getElementById("city-val").innerHTML = city + ", " + country; 

            var imageDescription = {
                Clouds: 
                '<div id="cloud-icon-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#dddddd" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>'+
                '<div id="cloud-icon-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#aaaaaa" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>',
                Clear: 
                '<div id="sun-icon">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#ffcc00" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>'+
                '</div>',
                Thunderstorm: 
                '<div id="storm-cloud-icon-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>'+
                '<div id="storm-cloud-icon-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#444444" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>' +
                '</div>'+
                '<div id="lightning-icon">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#fffc2e" class="bi bi-lightning-fill" viewBox="0 0 16 16"><path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/></svg>'+
                '</div>',
                Snow: 
                '<div id="snow-main">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>'+
                '<div id="snow-small-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>'+
                '<div id="snow-small-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/></svg>'+
                '</div>',
                Rain: 
                '<div id="rain-cloud">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>'+   
                '<div id="rain-drop-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                '</div>'+ 
                '<div id="rain-drop-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                '</div>'+
                '<div id="rain-drop-3">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                '</div>'+
                '<div id="rain-drop-4">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                '</div>',
                Drizzle:
                '<div id="rain-cloud">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#666666" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/></svg>'+
                '</div>'+   
                '<div id="drizzle-drop-1">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash" viewBox="0 0 16 16"><path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'+
                '</div>'+ 
                '<div id="drizzle-drop-2">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-slash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/></svg>'+
                '</div>',
                Dust:
                '<div id="dust">'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#b9ac8b" class="bi bi-wind" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/></svg>'+
                '</div>',
            };

              if (imageDescription[description] !== undefined) {
                document.getElementById("weather-container__icon").innerHTML = imageDescription[description];
              } else {
                $("#weather-container__icon").html('<div class="mx-auto" id="weather-icon-pic"><img class="text-center" src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png" alt="Image of weather"></div>')
              }


            var color = "";

            if(temp >= 29){
                color = "#c00000";
            }else if(temp >= 26){
                color = "#ff0000";
            }else if(temp >= 23){
                color = "#ffc000";
            }else if(temp >= 20){
                color = "#ffff00";
            }else if(temp >= 17){
                color = "#92d050";
            }else if(temp >= 14){
                color = "#00b04e";
            }else{
                color = "#00b0f0";
            }

            $("#temp-val").css("color", color);
        })
}