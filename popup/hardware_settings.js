settings = ["access-to-comms","browser-fingerprinting","data-collection","data-sharing","expected-use","location","targeted-advertising","thirdparty-tracking","unencrypted-comms","user-profiling"];

let createModeSelect = function(current_mode_setting){
  let select_mode = document.createElement('select');
  let led_option = document.createElement("option");
  led_option.value = 'LED';
  led_option.innerHTML = 'LED';
  select_mode.appendChild(led_option);
  let sound_option = document.createElement("option");
  sound_option.value = 'Sound';
  sound_option.innerHTML = 'Sound';
  select_mode.appendChild(sound_option);
  let movement_option = document.createElement("option");
  movement_option.value = 'Movement';
  movement_option.innerHTML = 'Movement';
  select_mode.appendChild(movement_option);
  //set current value to previous setting
  select_mode.value = current_mode_setting;
  //set id
  select_mode.id = alert_id+"_modedropdown";
  return select_mode;
}

//get which alerts the user wants

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

table = document.getElementById("hardware-settings");

browser.storage.local.get().then(function(item){
  set_alerts = item['alertSettings'];
  hardware_settings = item['hardwareSettings'];

  //insert row into table for each alert
  for (i=0;i<set_alerts.length;i++){
    alert_id = set_alerts[i];
    //look-up alert id
    alert_name = alert_dict[alert_id];

    if(alert_name!=undefined){

      //find current settings for that alert
      current_mode_setting = "";

      for(j=0;j<hardware_settings.length;j++){
        if(Object.keys(hardware_settings[j])==alert_id){
          current_mode_setting = Object.values(hardware_settings[j]);
        }
      };
      //create elements
      row = document.createElement("tr");
      row.style = "padding:10px";
      alert = document.createElement("td");
      alert.innerHTML = alert_name;
      mode_cell = document.createElement("td");
      mode_cell.id = alert_id+"_mode";

      //use current alert settings to make button elements
      //create drop down to choose mode
      select_mode = createModeSelect(current_mode_setting);

      //add mode drop down to mode cell
      mode_cell.appendChild(select_mode);
      //add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      table.appendChild(row);

    }
  }
}).then(function(){
  browser.storage.local.get('hardwareSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    //change this code to update previous settings
    for(i=0;i<settings.length;i++){
      //console.log(settings[i]);
      var checkbox = document.getElementById(settings[i]+"_modedropdown");
      var prev_value = prev_settings[settings[i]];
      if(prev_value != undefined && checkbox!=null){
        checkbox.value = prev_value;
      }
    }
  })
});
