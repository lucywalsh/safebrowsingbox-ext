let settings = ["firstparty-tracking", "thirdparty-collection", "targeted-ads", "tersonalisation", "thirdparty-tracking", "tocation", "tinancial", "tersonal", "donottrack", "health"];

/* Function to create drop down element containing options for how to be alerted */
function createModeSelect(current_mode_setting, alert_id) {
  let select_mode = document.createElement("select");
  let led_option = document.createElement("option");
  led_option.value = "LED";
  led_option.innerHTML = "LED";
  select_mode.appendChild(led_option);
  let sound_option = document.createElement("option");
  sound_option.value = "Sound";
  sound_option.innerHTML = "Sound";
  select_mode.appendChild(sound_option);
  let movement_option = document.createElement("option");
  movement_option.value = "Movement";
  movement_option.innerHTML = "Movement";
  select_mode.appendChild(movement_option);
  // set the shown option to what the user had previously chosen
  select_mode.value = current_mode_setting;
  select_mode.id = `${alert_id}_modedropdown`;
  select_mode.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
  return select_mode;
}

function create_rows(set_alerts, hardware_settings) {
  // dictionary to map alert IDs with formatted text to display in the UI
  let alert_dict = {
    "firstparty-tracking": "First-party Tracking",
    "thirdparty-collection": "Third-party Collection",
    "targeted-ads": "Targeted Advertising",
    "personalisation": "Site Personalisation",
    "thirdparty-tracking": "Third-party Tracking",
    "location": "Location Information",
    "financial": "Financial Information",
    "personal": "Personal Information",
    "donottrack": "Do Not Track Headers Ignored",
    "health": "Health Information"
  };
  let alert_id = "";
  let alert_name = "";
  let rows = [];
  for (let i = 0; i < set_alerts.length; i++) {
    alert_id = set_alerts[i];
    // look-up alert id
    alert_name = alert_dict[alert_id];

    let current_mode_setting = "";
    if (alert_name !== undefined) {
      // find current settings for that alert
      for (let j = 0; j < Object.keys(hardware_settings).length; j++) {
        if (Object.keys(hardware_settings)[j] === alert_id) {
          current_mode_setting = Object.values(hardware_settings)[j];
        }
      }

      // create HTML elements to hold content
      let row = document.createElement("tr");
      row.style = "padding:10px";
      let alert = document.createElement("td");
      alert.style = "padding-bottom:10px";
      alert.innerHTML = alert_name;
      let mode_cell = document.createElement("td");
      mode_cell.id = `${alert_id}_mode`;

      // create drop down for user to choose how they would like to be alerted
      let select_mode = createModeSelect(current_mode_setting, alert_id);

      // add drop down element to correct cell in the table
      mode_cell.appendChild(select_mode);
      // add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      rows.push(row);
    }
  }
  return rows;
}

browser.storage.local.get().then(item => {
  // get the user's chosen alerts they want to be notified of
  let set_alerts = item.alertSettings;
  let hardware_settings = item.hardwareSettings;
  // create HTML table to hold page content
  let table = document.getElementById("hardware-settings");
  let rows = create_rows(set_alerts, hardware_settings);
  // insert row into table for each alert
  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
}).then(() => {
  browser.storage.local.get("hardwareSettings").then(item => {
    // get the user's settings for which alerts they would like to be notified of
    let prev_settings = Object.values(item)[0];
    // if user previously chose to be notified of alert, put a check in the checkbox, else leave it empty
    for (let i = 0; i < settings.length; i++) {
      let checkbox = document.getElementById(`${settings[i]}_modedropdown`);
      let prev_value = prev_settings[settings[i]];
      if (prev_value !== undefined && checkbox !== null) {
        checkbox.value = prev_value;
      }
    }
  });
});
