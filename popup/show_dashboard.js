function listenForClicks() {
  document.addEventListener("click", (e) => {

    //add functions to do things on click here

    function reportError(error) {
      console.error(`Could not analyse: ${error}`);
    }

    /**
    if (e.target.classList.contains("something")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(//call function)
        .catch(reportError);
    }
    else if (e.target.classList.contains("something")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(//call function)
        .catch(reportError);
    }
    */
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/analyse_site.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
