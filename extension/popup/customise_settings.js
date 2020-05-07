settings = ["firstparty-tracking","thirdparty-collection","targeted-ads","tersonalisation","thirdparty-tracking","tocation","tinancial","tersonal","donottrack","health"];

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
      mode_cell = document.createElement("td");
      mode_cell.id = alert_id+"_modetext";
      mode_cell.innerHTML = current_mode_setting;
      customise_cell = document.createElement("td");
      customise_cell.id = alert_id+"_customise";

      //use current alert settings to make button element
      //create drop down to choose customisation
      select_customise = createCustomiseSelect(current_mode_setting,current_customise_setting);
      //add customise drop down to customise cell
      customise_cell.appendChild(select_customise);
      //add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      row.appendChild(customise_cell);
      table.appendChild(row);

    }
  }
});
