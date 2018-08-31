'use strict';

var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name').val();
    if(!countryName.length) countryName = 'Poland';

    $.ajax({
        url: url + countryName,
        method: "GET",
        success: showCountriesList
    }); 
}


function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function(item) {
        var flag = $('<img>').attr('src', item.flag);
        
        $('<li>').addClass('flag').append(flag).appendTo(countriesList);

        $('<li>').html('<b>' + item.name +'</b>').addClass('name').appendTo(countriesList);
        $('<li>').html('<b>Native name: </b>' + item.nativeName).appendTo(countriesList);
        $('<li>').html('<b>Capital city: </b>' + item.capital).appendTo(countriesList);
        $('<li>').html('<b>Subregion: </b>' + item.subregion).appendTo(countriesList);
        
        var lang = $(item.languages).map(function(){
            return this.name;
        }).get().join(", ");
          
        $('<li>').html('<b>Language: </b>' + lang).appendTo(countriesList);
          
        var curr = $(item.currencies).map(function(){
            return this.name;
        }).get().join(", ");
          
        $('<li>').html('<b>Currency: </b>' + curr).appendTo(countriesList);
        $('<li>').html('<b>Area: </b>' + item.area + ' km<sup>2</sup>').appendTo(countriesList);
        $('<li>').html('<b>Population: </b>' + item.population).appendTo(countriesList);
    });
}
