let http = require("http");

function onRequest(request, response) {
  response.writehead(200, { "Content-Type": "text/plain" });
  response.write("Hello World");
  response.end();
}
http.createServer(onRequest).listen(8888);
