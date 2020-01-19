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

var analyse_policy = function(content){
  console.log(content);
  console.log("Analysing policy...");
  //NLP analysis of policy_text

  //check if scraped text is valid policy or not; if not, get user to manually navigate to policy + analyse

  //generate alerts

  // **** dummy code **** //

  //store alerts in local storage

}

var fetch_policy = function(i, currentHost){
  policy_url = 'http://'+currentHost+privacy_urls[i];
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
            analyse_policy(message.policytext);
            console.log("Closing tab");
            browser.tabs.remove(tab.id);
          }
        });
      });
      return privacy_urls.length;
    }
  });
  return i+1;
}

var prev_host = '';

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tabInfo){
  if(tabInfo.status == 'complete'){
    browser.tabs.query({currentWindow: true, active: true})
        .then((tabs) => {
          var currentURL = new URL(tabs[0].url);
          var currentHost = currentURL.hostname;
          if(currentHost != prev_host){
            var i = 0;
            while(i<privacy_urls.length){
              i = fetch_policy(i, currentHost);
            }
          }
          prev_host = currentHost;
        });

  }

});
