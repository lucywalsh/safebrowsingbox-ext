//get current URL
//console.log(document.location.href);

/*
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});
*/

var privacy_urls = [
  '/privacy-policy',
  '/privacy-notice',
  '/legal/privacy',
  '/legal/privacy-policy',
  '/pages/privacy',
  '/help/privacy-policy',
  '/help/privacy-notice',
  '/privacy'
]

// temp - likely to change with results of user research
var alerts = [
  'user-profiling',
  'targeted-advertising',
  'thirdparty-tracking',
  'sensitive',
  'financial',
  'advertisers',
  'researchers',
  'law-enforcement',
  'unencrypted-comms',
  'access-to-comms',
  'data-sharing',
  'data-retention',
  'expected-use',
  'location',
  'browser-fingerprinting'
]

var analyse_policy = function(currentHost,content){
  console.log(content);
  console.log("Analysing policy...");
  //NLP analysis of policy_text

  //check if scraped text is valid policy or not; if not, get user to manually navigate to policy + analyse

  //generate alerts
  current_alerts = [];
  // **** dummy code **** //
  for(i=0;i<4;i++){
    var rand_index = Math.floor(Math.random() * alerts.length);
    var rand_alert = alerts[rand_index];
    current_alerts.push(rand_alert);
  }

  //store alerts in local storage
  var temp = {};
  var key = currentHost;
  temp[key] = current_alerts;
  console.log(temp);
  browser.storage.local.set(temp);
  return current_alerts;

}

var fetch_policy = function(policy_url, currentHost){
  console.log("Trying url: "+policy_url);
  fetch(policy_url).then((response) => {
    if(response.status==200){
      console.log("Valid URL.")
      var new_tab = browser.tabs.create({
        active:false,
        "url": policy_url
      });
      new_tab.then(function(tab){
        console.log('Created tab containing policy, tab id = '+tab.id);
        browser.tabs.executeScript(tab.id,{
          code:"var html_body = document.body.innerHTML; var span = document.createElement('span'); span.innerHTML = html_body; browser.runtime.sendMessage({command: 'policyscraped', policytext:span.textContent}); policy_text=span.textContent; "
        });
        browser.runtime.onMessage.addListener((message) => {
          if (message.command === "policyscraped") {
            console.log("Privacy policy successfully scraped from "+policy_url);
            var alerts = analyse_policy(currentHost,message.policytext);
            console.log("Closing tab");
            browser.tabs.remove(tab.id);
            this_host_alerts = alerts;
            return alerts;
          }
        });
      });
    }
  });
  return null;
}

var prev_host = '';

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "analysebutton") {
    console.log("hi");
  }
}

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tabInfo){
  if(tabInfo.status == 'complete'){
    browser.tabs.query({currentWindow: true, active: true})
        .then((tabs) => {
          var currentURL = new URL(tabs[0].url);
          var currentHost = currentURL.hostname;
          /*
          browser.storage.local.get().then(function(item){
            console.log("everything");
            console.log(item);
          });
          */
          //check if website already analysed
          if(currentHost != prev_host && currentHost != ''){
            browser.storage.local.get(currentHost).then(function(item){
              var this_host_alerts = [];
              /*
              console.log("currentHost query");
              console.log(item);
              */
              if(Object.keys(item).length == 0){
                //if alerts not stored, analyse policy to get alerts
                  var i = 0;
                  //loop through possible URLs until policy found or list exhaused
                  while(i<privacy_urls.length){
                    policy_url = 'http://'+currentHost+privacy_urls[i];
                    this_host_alerts = fetch_policy(policy_url, currentHost);
                    if(this_host_alerts == null){
                      i++;
                    }
                    else{
                      i = privacy_urls.length;
                    }
                  }
                  //if policy not found:
                  if(this_host_alerts == null){
                    console.log("no policy found");
                  }
              }
            });
          }
          prev_host = currentHost;
        });
    }
});
