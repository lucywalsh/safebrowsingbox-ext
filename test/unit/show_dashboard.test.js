
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
