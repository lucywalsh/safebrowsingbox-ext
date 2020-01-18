//get current URL
//console.log(document.location.href);

/*
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});
*/

var privacy_urls = [
  '/privacy',
  '/privacy-policy',
  '/privacy-notice',
  '/legal/privacy',
  '/legal/privacy-policy',
  '/pages/privacy',
  '/help/privacy-policy',
  '/help/privacy-notice'
]
var fetch_policy = function(i, currentHost){
  policy_url = 'http://'+currentHost+privacy_urls[i];
  fetch(policy_url).then((response) => {
    if(response.status==200){
      browser.tabs.create({
        active:true,
        "url": policy_url
      });
      browser.tabs.onUpdated.addListener(function(tabId, info){
        if(info.status === 'complete'){
          console.log('loaded');
          //scrape info from page
          browser.tabs.executeScript({
            file:'get_policy_body.js'
          });
        }
      });
      /*
      window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
      });
      */
    }
    else{
      return i+1;
    }
  });
}

var get_policy_info = function(){
  var body = document.getElementById('body');
  console.log(body.innerHTML);
}

browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      var currentURL = new URL(tabs[0].url);
      var currentHost = currentURL.hostname;

      found_policy = false
      var i = 0;
      finished_fetching = false;
      i = fetch_policy(i, currentHost);
      if(i<privacy_urls.length){
        fetch_policy();
      }
      //put message in alerts box
    });
