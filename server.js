var liveServer = require("live-server");

var port = 8181; // Set the server port. Defaults to 8080.
var dir = "./dist"; // Set root of directory that's being server. Defaults to cwd.
var suppressBrowserLaunch = false; // When true, it won't load your browser by default.
liveServer.start(port, dir, suppressBrowserLaunch);
