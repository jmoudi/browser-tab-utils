

/* 
  "user_scripts": {
    "api_script": "apiscript.js",
  }

Instructs the browser to load the user script named in the "api_script" property.

The "api_script" property names the user script that will be associated with this extension.

Once loaded, the script will be called after 
the event handler assigned to the userScripts.onBeforeScript property has executed. This allows the handler to export
 a set of custom API methods which will be made available to the content scripts represented by contentScripts. */