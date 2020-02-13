//get which alerts the user wants


//type = mode (LED, sound, air etc.) || customise (colour, noise, speed etc. )
createSettingsButton = function(alert_id,type,mode,current_setting){
  button = document.createElement("select");
  var options=[];
  if(type == 'mode'){
    options = ['LED','Sound','Air']
  }
  else if(type=='customise'){
    if(mode == "LED"){
      options = ['Red','Green','Blue']
    }
    else if(mode == "Sound"){
      options = ['noise1','noise2']
    }
    else if(mode == "Air"){
      options = ['Fast','Slow']
    }
  }
  for(i=0;i<options.length;i++){
    option = document.createElement("option");
    option.value = options[i];
    option.innerHTML = options[i];
    button.appendChild(option);
  }
  button.id = alert_id+'_'+type;
  button.value = current_setting;
  //button.innerHTML = current_setting;
  return button;
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
  'location-information':'Location Information',
  'browser-fingerprinting':'Browser Fingerprinting'
}


browser.storage.local.get('alertSettings').then(function(item){
  set_alerts = Object.values(item)[0];
  //insert row into table for each alert
  table = document.getElementById("hardware-settings");

  for (i=0;i<set_alerts.length;i++){
    alert_id = set_alerts[i];
    //look-up alert id
    alert_name = alert_dict[alert_id];

    if(alert_name!=undefined){
      //create elements
      row = document.createElement("tr");
      row.style = "padding:10px";
      alert = document.createElement("td");
      alert.innerHTML = alert_name;
      mode_cell = document.createElement("td");
      mode_cell.id = alert_id+"_mode";
      customise_cell = document.createElement("td");
      customise_cell.id = alert_id+"_customise";

/*
      //find current setting for that alert
      browser.storage.local.get('hardwareSettings').then(function(item){
        hardware_settings = Object.values(item)[0];
        current_mode_setting = "";
        current_customise_setting = "";
        for(i=0;i<hardware_settings.length;i++){
          if(Object.keys(hardware_settings[i])==alert_id+"_mode"){
            current_mode_setting = Object.values(hardware_settings[i]);
          }
          if(Object.keys(hardware_settings[i])==alert_id+"_customise"){
            current_customise_setting = Object.values(hardware_settings[i]);
          }
        }

      });
      */

      current_mode_setting = "LED";
      current_customise_setting = "Red";

      //use current alert settings to make button elements
      mode_button = document.createElement("select");

      mode_options = ['LED','Sound','Air'];
      for(i=0;i<mode_options.length;i++){
        temp = document.createElement("option");
        temp.value = mode_options[i];
        temp.innerHTML = mode_options[i];
        mode_button.appendChild(temp);
      }

      //mode_button.id = alert_id+'_'+type;
      //mode_button.value = current_setting;
      //customise_button = createSettingsButton(alert_id,"customise",current_mode_setting,current_customise_setting);

      mode_cell.appendChild(mode_button);
      //customise_cell.appendChild(customise_button);

      //add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      //row.appendChild(customise_cell);
      table.appendChild(row);
      /*
      //get mode
      var answered_mode_button = document.getElementById(alert_id+"_mode");
      answered_mode_button.addEventListener('change',function(){
        selected_mode = answered_mode_button.value;
        //remove old customise button
        old_customise_button = document.getElementById(alert_id+"_customise");
        customise_cell.removeChild(old_customise_button);
        //add new customise button
        new_customise_button = createSettingsButton(alert_id,"customise",selected_mode,current_customise_setting);
        customise_cell.appendChild(new_customise_button);
      });
      */

    }
  }
});
