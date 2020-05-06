
//set previously saved settings as checked
/*
window.addEventListener('load',(event) => {
  browser.storage.local.get('hardwareSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    //change this code to update previous settings
    for(i=0;i<settings.length;i++){
      console.log(settings[i]);
      var checkbox = document.getElementById(settings[i]+"_modedropdown");
      var prev_value = prev_settings[settings[i]];
      if(prev_value != undefined){
        box.value = prev_value;
      }
    }
  })
});
*/

var alert_dict = {
  "Firstparty-tracking":"First-party Tracking",
  "Thirdparty-collection":"Third-party Collection",
  "Targeted-ads":"Targeted Advertising",
  "Personalisation":"Site Personalisation",
  "Thirdparty-tracking":"Third-party Tracking",
  "Location":"Location Information",
  "Financial":"Financial Information",
  "Personal":"Personal Information",
  "DoNotTrack":"Do Not Track Headers Ignored",
  "Health":"Health Information"
}

document.getElementById("save_hardware").onclick = function save_hardware_data(){
  var hardware_settings = {};

  var userprofiling_mode = document.getElementById("firstparty-tracking_modedropdown");
  if(userprofiling_mode != null){
    hardware_settings['firstparty-tracking'] = userprofiling_mode.value;
  }

  var targetedadvertising_mode = document.getElementById("targeted-ads_modedropdown");
  if(targetedadvertising_mode != null){
    hardware_settings['targeted-ads'] = targetedadvertising_mode.value;
  }

  var datasharing_mode = document.getElementById("thirdparty-tracking_modedropdown");
  if(datasharing_mode != null){
    hardware_settings['thirdparty-tracking'] = datasharing_mode.value;
  }

  var datacollection_mode = document.getElementById("personalisation_modedropdown");
  if(datacollection_mode != null){
    hardware_settings['personlisation'] = datacollection_mode.value;
  }

  var unencryptedcomms_mode = document.getElementById("thirdparty-tracking_modedropdown");
  if(unencryptedcomms_mode != null){
    hardware_settings['thirdparty-tracking'] = unencryptedcomms_mode.value;
  }

  var accesstocomms_mode = document.getElementById("financial_modedropdown");
  if(accesstocomms_mode != null){
    hardware_settings['financial'] = accesstocomms_mode.value;
  }

  var expecteduse_mode = document.getElementById("donottrack_modedropdown");
  if(expecteduse_mode != null){
    hardware_settings['donottrack'] = expecteduse_mode.value;
  }

  var location_mode = document.getElementById("location_modedropdown");
  if(location_mode != null){
    hardware_settings['location'] = location_mode.value;
  }

  var browserfingerprinting_mode = document.getElementById("health_modedropdown");
  if(browserfingerprinting_mode != null){
    hardware_settings['health'] = browserfingerprinting_mode.value;
  }

  var browserfingerprinting_mode = document.getElementById("personal_modedropdown");
  if(browserfingerprinting_mode != null){
    hardware_settings['personal'] = browserfingerprinting_mode.value;
  }

  var temp = {};
  temp['hardwareSettings'] = hardware_settings;
  browser.storage.local.set(temp).then(function(){
    //navigate to customise settings
    browser.tabs.update({url: "customise_settings.html"});

    //document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });

}
