//set previously saved settings as checked
window.addEventListener('load',(event) => {
  browser.storage.local.get('hardwareSettings').then(function(item){
    prev_settings = Object.values(item)[0];
    //change this code to update previous settings
    /*
    for(i=0;i<prev_settings.length;i++){
      document.getElementById(prev_settings[i]).checked=true;
    }
    */
  })
});

document.getElementById("save_hardware").onclick = function save_hardware_data(){
  var temp = []

  var userprofiling_mode = document.getElementById("user-profiling_mode");
  temp.push({'user-profiling_mode':userprofiling_mode.value});

  var userprofiling_customise = document.getElementById("user-profiling_customise");
  temp.push({'user-profiling_customise':userprofiling_customise.value});

  var targetedadvertising_mode = document.getElementById("targeted-advertising_mode");
  temp.push({'targeted-advertising_mode':targetedadvertising_mode.value});

  var targetedadvertising_customise = document.getElementById("targeted-advertising_customise");
  temp.push({'targeted-advertising_customise':targetedadvertising_customise.value});

  var datasharing_mode = document.getElementById("data-sharing_mode");
  temp.push({'data-sharing_mode':datasharing_mode.value});

  var datasharing_customise = document.getElementById("data-sharing_customise");
  temp.push({'data-sharing_customise':datasharing_customise.value});

  var datacollection_mode = document.getElementById("data-collection_mode");
  temp.push({'data-collection_mode':datacollection_mode.value});

  var datacollection_customise = document.getElementById("data-collection_customise");
  temp.push({'data-collection_customise':datacollection_customise.value});

  var temp2 = {};
  temp2['hardwareSettings'] = temp;
  browser.storage.local.set(temp2).then(function(){
    //tell user that info is saved
    document.getElementById("saved-message").appendChild(document.createTextNode("Saved! You can now close this tab\n"));
  });

}
