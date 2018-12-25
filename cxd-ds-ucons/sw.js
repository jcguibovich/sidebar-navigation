
onmessage = function(event) {
  importScripts('/assets/js/ucon-injector-dev.js');
  var result = self.svgInj.messageBox(event.data);
  postMessage(result.value);
}
