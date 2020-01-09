//get current URL
//console.log(document.location.href);
browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      var currentURL = tabs[0].url;
      var alerts = document.getElementById('alerts');
      var text = document.createTextNode("Current URL: "+currentURL);
      alerts.appendChild(text);
    });
