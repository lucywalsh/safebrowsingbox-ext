settings = ["firstparty-tracking","thirdparty-collection","targeted-ads","tersonalisation","thirdparty-tracking","tocation","tinancial","tersonal","donottrack","health"];

/*
let createCustomiseSelect = function(current_mode_setting,current_customise_setting){
  let select_customise = document.createElement('select');
  var options = [];
  if(current_mode_setting == 'LED'){
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    options = ['Red','Blue','Green'];
    option1.value = 'Red';
    option1.innerHTML = 'Red';
    option2.value = 'Blue';
    option2.innerHTML = 'Blue';
    option3.value = 'Green';
    option3.innerHTML = 'Green';
    select_customise.appendChild(option1);
    select_customise.appendChild(option2);
    select_customise.appendChild(option3);
  }
  else if(current_mode_setting=='Sound'){
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    options = ['Long Buzz','Alarm'];
    option1.value = 'Long Buzz';
    option1.innerHTML = 'Long Buzz';
    option2.value = 'Alarm';
    option2.innerHTML = 'Alarm';
    select_customise.appendChild(option1);
    select_customise.appendChild(option2);
  }
  else if(current_mode_setting == 'Movement'){
    let option1 = document.createElement("option");
    options = ['Spin'];
    option1.value = 'Spin';
    option1.innerHTML = 'Spin';
    select_customise.appendChild(option1);
  }
  //set current value to previous setting
  //console.log(current_customise_setting);
  //console.log(options);
  if(current_customise_setting!="" && options.includes(current_customise_setting)){
    select_customise.value = current_customise_setting;
  }
  else{
    select_customise.value = options[0];
  }
  //set id
  select_customise.id = alert_id+"_customisedropdown";
  return select_customise;
}
*/
let createCustomiseSelect = function(current_mode_setting,current_customise_setting){
  if(current_mode_setting == 'LED'){
    let color_selector = document.createElement('input');
    color_selector.type = "color";
    color_selector.value = current_customise_setting;
    color_selector.id = alert_id+"_customisedropdown";
    color_selector.style="border:none;background-color:white";
    return color_selector;
  }
  if(current_mode_setting == 'Sound'){
    let sound_selector = document.createElement('select');
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    let option4 = document.createElement("option");
    let option5 = document.createElement("option");
    option1.value = "a5";
    option1.innerHTML = "Play an A note";
    option2.value = "b5";
    option2.innerHTML = "Play a B note";
    option3.value = "c4";
    option3.innerHTML = "Play a C note";
    option4.value = "d5";
    option4.innerHTML = "Play a D note";
    option5.value = "e4";
    option5.innerHTML = "Play an E note";
    sound_selector.appendChild(option1);
    sound_selector.appendChild(option2);
    sound_selector.appendChild(option3);
    sound_selector.appendChild(option4);
    sound_selector.appendChild(option5);
    sound_selector.value = current_customise_setting;
    sound_selector.id = alert_id+"_customisedropdown";
    sound_selector.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
    return sound_selector;
  }
  if(current_mode_setting == 'Movement'){
    let movement_selector = document.createElement('select');
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.value = "left";
    option1.innerHTML = "Spin Left";
    option2.value = "right";
    option2.innerHTML = "Spin Right";
    movement_selector.appendChild(option1);
    movement_selector.appendChild(option2);
    movement_selector.value = current_customise_setting;
    movement_selector.id = alert_id+"_customisedropdown";
    movement_selector.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
    return movement_selector;
  }
}


var alert_dict = {
  "firstparty-tracking":"First-party Tracking",
  "thirdparty-collection":"Third-party Collection",
  "targeted-ads":"Targeted Advertising",
  "personalisation":"Site Personalisation",
  "thirdparty-tracking":"Third-party Tracking",
  "location":"Location Information",
  "financial":"Financial Information",
  "personal":"Personal Information",
  "donottrack":"Do Not Track Headers Ignored",
  "health":"Health Information"
}

table = document.getElementById("customise-settings");

/*
function onclickfunction(clicked_id){
  console.log(clicked_id);

  method = document.getElementById(clicked_id+"_modetext").innerHTML;
  test_val = document.getElementById(clicked_id+"_customisedropdown").value;
  var sending = browser.runtime.sendMessage({
    method:method,
    test_val: test_val
  });
};
*/
browser.storage.local.get().then(function(item){
  set_alerts = item['alertSettings'];
  hardware_settings = item['hardwareSettings']
  customise_settings = item['customiseSettings'];

  //insert row into table for each alert
  for (i=0;i<set_alerts.length;i++){
    alert_id = set_alerts[i];
    //look-up alert id
    alert_name = alert_dict[alert_id];

    if(alert_name!=undefined){

      //find current settings for that alert
      current_mode_setting = "";
      current_customise_setting = "";

      current_mode_setting = hardware_settings[alert_id];
      current_customise_setting = customise_settings[alert_id];
/*
      for(j=0;j<customise_settings.length;j++){
        if(Object.keys(customise_settings[j])==alert_id){
          current_customise_setting = Object.values(customise_settings[j])[0];
        }
      };
      for(k=0;k<hardware_settings.length;k++){
        if(Object.keys(hardware_settings[k])==alert_id){
          current_mode_setting = Object.values(hardware_settings[k])[0];
        }
      };
*/
      //create elements
      row = document.createElement("tr");
      row.style = "padding:10px";
      alert = document.createElement("td");
      alert.innerHTML = alert_name;
      alert.style="padding-bottom:10px";
      mode_cell = document.createElement("td");
      mode_cell.id = alert_id+"_modetext";
      mode_cell.innerHTML = current_mode_setting;
      customise_cell = document.createElement("td");
      customise_cell.id = alert_id+"_customise";
      //test_cell = document.createElement("td");
      //test_cell.id = alert_id+"_test";

      //create element to choose customisation
      select_customise = createCustomiseSelect(current_mode_setting,current_customise_setting);
      //add customise drop down to customise cell
      customise_cell.appendChild(select_customise);
      //add button to test cell
      /*
      test_button = document.createElement("Button");
      test_button.id = alert_id;
      test_button.onclick = onclickfunction(test_button.id);
      test_button.innerHTML = "Test"
      test_cell.appendChild(test_button);
      */
      //add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      row.appendChild(customise_cell);
      //row.appendChild(test_cell);
      table.appendChild(row);

    }
  }
});
