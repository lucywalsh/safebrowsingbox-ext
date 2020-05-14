/* Code to get user's customisation choices and save in local storage */
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
    hardware_settings['personalisation'] = datacollection_mode.value;
  }

  var unencryptedcomms_mode = document.getElementById("thirdparty-collection_modedropdown");
  if(unencryptedcomms_mode != null){
    hardware_settings['thirdparty-collection'] = unencryptedcomms_mode.value;
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
  //save in local storage
  var temp = {};
  temp['hardwareSettings'] = hardware_settings;
  browser.storage.local.set(temp).then(function(){
    //navigate to the next settings page
    browser.tabs.update({url: "customise_settings.html"});
  });

}
