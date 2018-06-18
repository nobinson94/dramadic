chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("get");
  if (request.method == "getSelection")
    sendResponse({data: window.getSelection().toString()});
  else
    sendResponse({data: "nothing"}); // snub them.
});