let createCustomiseSelect = function(current_mode_setting,current_customise_setting){
  let select_customise = document.createElement('select');
  let option1 = document.createElement("option");
  let option2 = document.createElement("option");
  let option3 = document.createElement("option");
  var options = [];
  if(current_mode_setting == 'LED'){
    options = ['Red','Blue','Green']
    option1.value = 'Red';
    option1.innerHTML = 'Red';
    option2.value = 'Blue';
    option2.innerHTML = 'Blue';
    option3.value = 'Green';
    option3.innerHTML = 'Green';
  }
  else if(current_mode_setting=='Sound'){
    options = ['sound1','sound2','sound3']
    option1.value = 'sound1';
    option1.innerHTML = 'sound1';
    option2.value = 'sound2';
    option2.innerHTML = 'sound2';
    option3.value = 'sound3';
    option3.innerHTML = 'sound3';
  }
  else if(current_mode_setting == 'Air'){
    options = ['air1','air2','air3']
    option1.value = 'air1';
    option1.innerHTML = 'air1';
    option2.value = 'air2';
    option2.innerHTML = 'air2';
    option3.value = 'air3';
    option3.innerHTML = 'air3';
  }
  select_customise.appendChild(option1);
  select_customise.appendChild(option2);
  select_customise.appendChild(option3);
  //set current value to previous setting
  if(current_customise_setting!="" && options.includes(current_customise_setting)){
    select_customise.value = current_customise_setting;
  }
  //set id
  select_customise.id = alert_id+"_customisedropdown";
  return select_customise;
}

var alert_dict = {
  'user-profiling':'User Profiling',
  'targeted-advertising':'Targeted Advertising',
  'thirdparty-tracking':'Third Party Tracking',
  'data-collection':'Personal Data Collection',
  'data-sharing':'Data Sharing with Third Parties',
  'unencrypted-comms':'Unencrypted Communications',
  'access-to-comms':"Access to Communications",
  'data-retention':'Indefinite Data Retention',
  'expected-use':'Expected Use',
  'location':'Location Information',
  'browser-fingerprinting':'Browser Fingerprinting'
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
