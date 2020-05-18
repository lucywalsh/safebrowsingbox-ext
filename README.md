SAFE BROWSING BOX EXTENSION

This readme explains how to setup and install the Safe Browsing Box extension. There are several folders; the browser extension can be found under "extension", and this connects to 1) a Python application which analyses privacy policies, found in the "app" folder, and 2) a Node.js server that passes messages to the tangible device, found in the "extension-server" folder.

## System Requirements ##

Python 2.7

Node.js

Firefox

## Setup ##

To get this working, there's a little setup to do.

### Mac OS/Linux setup ###

--Python App--

1. Edit the "path" property of "analyse_policy.json" to point to the location of "analyse_policy.py" on your computer. Note that you must use absolute paths.

2. Copy "analyse_policy.json" to the correct location on your computer. See [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find the correct location for your OS.

--Node Server--

Open terminal and navigate to the extension-server folder. Run node app.js to start the local server, and leave this running while you are browsing. 


### Windows setup ###

--Python App--

1. Check you have Python installed, and that your system's PATH environment variable includes the path to Python.  See [Using Python on Windows](https://docs.python.org/2/using/windows.html). You'll need to restart the web browser after making this change, or the browser won't pick up the new environment variable.
2. Edit the "path" property of "analyse_policy.json" to point to the location of "analyse_policy_windows.bat" on your computer. Note that you'll need to escape the Windows directory separator, like this: `"path": "C:\\Users\\MDN\\native-messaging\\app\\analyse_policy_windows.bat"`.
3. Edit "analyse_policy_windows.bat" to refer to the location of "analyse_policy.py" on your computer.
4. Add a registry key containing the path to "analyse_policy.json" on your computer. See [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find details of the registry key to add.

To assist in troubleshooting on Windows, there is a script called `check_config_win.py`. Running this from the command line should give you an idea of any problems.

--Node Server--

Open the command line and navigate to the extension-server folder. Run node app.js to start the local server, and leave this running while you are browsing. 


## Install Extension ##

Open Firefox and go to about:debugging. Click "Load Temporary Add-on" and navigate to the extension folder. Select manifest.json and the extension will be installed.  
