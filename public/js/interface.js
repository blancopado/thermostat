$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemp();

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',sp&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
      $('#current-temperature').text(data.main.temp + ' ºC')
    });
  });


  $('#power_saving_mode_on').css('background-color', 'green');
  $('#power_saving_mode_off').css('background-color', 'gray').fadeTo("slow", 0.85);

  $( '#temperature_up' ).click( function() {
    thermostat.up();
    updateTemp();
  });

  $( '#temperature_down' ).click( function() {
    thermostat.down();
    updateTemp();
  });

  $( '#power_saving_mode_on' ).click( function() {
    $(this).css('background-color', 'green').fadeTo("slow", 1);
    $('#power_saving_mode_off').css('background-color', 'gray').fadeTo("slow", 0.85);
    thermostat.powerSavingModeOn();
  });

  $( '#power_saving_mode_off' ).click( function() {
    $(this).css('background-color', 'red').fadeTo("slow", 1);
    $('#power_saving_mode_on').css('background-color', 'gray').fadeTo("slow", 0.85);
    thermostat.powerSavingModeOff();
  });

  $( '#reset' ).click( function() {
    thermostat.resetButton();
    updateTemp();
  });

  function updateTemp() {
    $('#temperature').text(thermostat.temperature() + ' ºC');
    $('#temperature').attr('class', thermostat.energyConsumption());
  };

});

$("body").hide().fadeIn(2500);