describe("show_dashboard.js", function(){

describe("Create Alert Div", function(){
  it("Should return correct div element", function(){
    let expected_div = document.createElement("div");
    expected_div.innerHTML = "<a href='advice_pages/personal.html' style='display:block;'>This site collects personal information</a>";
    expected_div.className = "alert-div personal";
    expected_div.style = "background-color:#ff0000";
    let result = createAlertDiv("personal","#ff0000");
    expect(result).to.eql(expected_div);
  });
});

describe("Create Analyse Button", function(){
  it("Should return correct button", function(){
    let expected_element = document.createElement("button");
    expected_element.innerHTML = "Analyse Policy";
    expected_element.id = "analyse_button";
    expected_element.className = "styled-button";
    let result = createAnalyseButton();
    expect(result).to.eql(expected_element);
  });
});

describe("Get Random Colours", function(){
  it("Should return the right amount of colours", function(){
    let random_colours = get_random_colours(5);
    expect(random_colours.length).to.eql(5);
  });

  it("Order of colours should be shuffled", function(){
    let original_order = ["#f54242", "#fc8e44", "#FFCC33", "#52de52", "#1ee3b2", "#4db8ff", "#b342f5", "#ff638a", "#ff66c4","#0099FF"];
    let result = get_random_colours(10);
    expect(result).to.not.eql(original_order);
  });
});

describe("Create Alerts List", function(){
  it("Should return element containing correct alerts", function(){
    let alerts = ['personal','financial','health'];
    let random_colours = get_random_colours(3);
    let expected_div1 = document.createElement("div");
    expected_div1.innerHTML = "<a href='advice_pages/personal.html' style='display:block;'>This site collects personal information</a>";
    expected_div1.className = "alert-div personal";
    expected_div1.style = `background-color:${random_colours[0]}`;
    let expected_div2 = document.createElement("div");
    expected_div2.innerHTML = "<a href='advice_pages/financial.html' style='display:block'>This site is collecting your financial information</a>";
    expected_div2.className = "alert-div financial";
    expected_div2.style = `background-color:${random_colours[1]}`;
    let expected_div3 = document.createElement("div");
    expected_div3.innerHTML = "<a href='advice_pages/health.html' style='display:block'>This site collects your health information</a>";
    expected_div3.className = "alert-div health";
    expected_div3.style = `background-color:${random_colours[2]}`;
    let alerts_list = document.createDocumentFragment();
    alerts_list.appendChild(expected_div1);
    alerts_list.appendChild(expected_div2);
    alerts_list.appendChild(expected_div3);
    let result = createAlertDiv("personal","#ff0000");
    expect(result).to.eql(alerts_list);
  });
});

});

describe("customise_settings.js", function(){

  describe("Create Customise Selector", function(){
    it("Should return correct customise selector", function(){
      let expected = document.createElement("input");
      expected.type = "color";
      expected.value = "00ff00";
      expected.id = `financial_customisedropdown`;
      expected.style = "border:none;background-color:white";
      let result = createCustomiseSelect("LED", "00ff00", "financial");
      expect(result).to.eql(expected);
    });
  });

  describe("Create Alert Table", function(){
    it("Should return array of rows containing correct alerts and customisation options", function(){
      let set_alerts = ["personal"];
      let hardware_settings = {personal:"LED"};
      let customise_settings = {personal:"#ff00ff"};
      let expected = [];
      let row = document.createElement("tr");
      row.style = "padding:10px";
      let alert = document.createElement("td");
      alert.innerHTML = "Personal";
      alert.style = "padding-bottom:10px";
      let mode_cell = document.createElement("td");
      mode_cell.id = `personal_modetext`;
      mode_cell.innerHTML = "LED";
      let customise_cell = document.createElement("td");
      customise_cell.id = `personal_customise`;
      let select_customise = document.createElement("input");
      select_customise.type = "color";
      select_customise.value = "ff00ff";
      select_customise.id = `personal_customisedropdown`;
      select_customise.style = "border:none;background-color:white";
      customise_cell.appendChild(select_customise);
      row.appendChild(alert);
      row.appendChild(mode_cell);
      row.appendChild(customise_cell);
      expected.push(row);
      let result = create_alert_table(set_alerts,hardware_settings,customise_settings);
      expect(result).to.eql(expected);
    });
  });
});

describe("hardware_settings.js", function(){

  describe("Create Mode Selector", function(){
    it("Should return correct mode selector", function(){
      let expected = document.createElement("select");
      let led_option = document.createElement("option");
      led_option.value = "LED";
      led_option.innerHTML = "LED";
      expected.appendChild(led_option);
      let sound_option = document.createElement("option");
      sound_option.value = "Sound";
      sound_option.innerHTML = "Sound";
      expected.appendChild(sound_option);
      let movement_option = document.createElement("option");
      movement_option.value = "Movement";
      movement_option.innerHTML = "Movement";
      expected.appendChild(movement_option);
      expected.value = "LED";
      expected.id = `financial_modedropdown`;
      expected.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
      let result = createModeSelect("LED", "financial");
      expect(result).to.eql(expected);
    });
  });

  describe("Create Table Rows", function(){
    it("Should return array of rows containing correct alerts and options", function(){
      let set_alerts = ["personal"];
      let hardware_settings = {personal:"LED"};
      let expected = [];
      // create HTML elements to hold content
      let row = document.createElement("tr");
      row.style = "padding:10px";
      let alert = document.createElement("td");
      alert.style = "padding-bottom:10px";
      alert.innerHTML = "Personal";
      let mode_cell = document.createElement("td");
      mode_cell.id = `personal_mode`;
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
      select_mode.value = "LED";
      select_mode.id = `personal_modedropdown`;
      select_mode.style = "color:#60666d;font-size:12px;text-align:center;height:25px";
      mode_cell.appendChild(select_mode);
      // add elements to table
      row.appendChild(alert);
      row.appendChild(mode_cell);
      expected.push(row);
      let result = create_rows(set_alerts,hardware_settings);
      expect(result).to.eql(expected);
    });
  });
});
