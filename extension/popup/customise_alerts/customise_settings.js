/* Function to create select box for user to choose their customisation option */
function createCustomiseSelect(current_mode_setting, current_customise_setting, alert_id) {
  // if mode of alert is LED, create a color selector
  if (current_mode_setting === "LED") {
    let color_selector = document.createElement("input");
    color_selector.type = "color";
    // set the color shown to the previous colour the user had chosen
    color_selector.value = current_customise_setting;
    color_selector.id = `${alert_id}_customisedropdown`;
    color_selector.style = "border:none;background-color:white";
    return color_selector;
  }
  // if mode of alert is Sound, create drop down box containing different notes to choose from
  if (current_mode_setting === "Sound") {
    let sound_selector = document.createElement("select");
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    let option4 = document.createElement("option");
    let option5 = document.createElement("option");
    // the values of the options are the frequency to tell the Arduino to play a note at on the Piezo speaker
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
    // set the option shown to be the previous option the user had chosen
    sound_selector.value = current_customise_setting;
    sound_selector.id = `${alert_id}_customisedropdown`;
    sound_selector.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
    return sound_selector;
  }
  // if the mode of alert is Movement, create a drop down to let the user choose whether to spin left or right
  if (current_mode_setting === "Movement") {
    let movement_selector = document.createElement("select");
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.value = "left";
    option1.innerHTML = "Spin Left";
    option2.value = "right";
    option2.innerHTML = "Spin Right";
    movement_selector.appendChild(option1);
    movement_selector.appendChild(option2);
    // set the option shown to the previous option the user had chosen
    movement_selector.value = current_customise_setting;
    movement_selector.id = `${alert_id}_customisedropdown`;
    movement_selector.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
    return movement_selector;
  }
  return null;
}

function create_alert_table(set_alerts, hardware_settings, customise_settings) {
  // dictionary to map alert IDs to formatted text to display in the UI
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
  let rows = [];
  // create row for each alert
  for (let i = 0; i < set_alerts.length; i++) {
    let alert_id = set_alerts[i];
    // look-up alert id in dictionary to get formatted text
    let alert_name = alert_dict[alert_id];

    if (alert_name !== undefined) {
      // get user's current settings for that alert
      let current_mode_setting = "";
      let current_customise_setting = "";
      current_mode_setting = hardware_settings[alert_id];
      current_customise_setting = customise_settings[alert_id];

      // create HTML table elements to hold contents
      let row = document.createElement("tr");
      row.style = "padding:10px";
      let alert = document.createElement("td");
      alert.innerHTML = alert_name;
      alert.style = "padding-bottom:10px";
      let mode_cell = document.createElement("td");
      mode_cell.id = `${alert_id}_modetext`;
      mode_cell.innerHTML = current_mode_setting;
      let customise_cell = document.createElement("td");
      customise_cell.id = `${alert_id}_customise`;

      // create drop down element to choose customisation
      let select_customise = createCustomiseSelect(current_mode_setting, current_customise_setting, alert_id);
      // add the drop down element to the right cell in the table
      customise_cell.appendChild(select_customise);

      // add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      row.appendChild(customise_cell);
      rows.push(row);
    }
  }
  return rows;
}

browser.storage.local.get().then(item => {
  // retrieve the user's current alert settings from local storage
  let set_alerts = item.alertSettings;
  let hardware_settings = item.hardwareSettings;
  let customise_settings = item.customiseSettings;
  // get HTML table to hold the page content
  let table = document.getElementById("customise-settings");
  // create row for each alert
  let rows = create_alert_table(set_alerts, hardware_settings, customise_settings);
  // add rows to table
  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
});
