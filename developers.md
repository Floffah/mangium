# Developers
I write the code in a way and using tools that is "modern" and I see a lot of developers using. Here's what i do

Please keep in mind that Mangium was made to be free to use, just work, and no more than that. If you want to add a big feature that could quite easily be a plugin, make it a plugin instead.

# Web panel
The web panel is built using Webpack (with react), and sass for css. Oh, also I use the [open-color](https://yeun.github.io/open-color/) colour theme

Page urls use the format `http(s)://some.url/#/path`

This is so if the user moves to a different page on the site, the page isn't reloaded but the content is changed. 

One big reason this is done is because the web panel doesn't send get or post requests to the api, it goes through socket.io to send events to the tcp api so if the page reloaded, the tcp connection would keep disconnecting and reconnecting which is just bad imo and why make a rest and tcp api when you can have one and bridge from the browser to it.

Socket.io communicates to the server with the event as the event name and the data as the event data which is then pieced together before sending it to the tcp server.

When I say it connects to the tcp server, it doesn't really. The api handles socket.io events and tcp packets in the same place using the exact same code so it is kind of just two ways to connect to the one api.

Please stick to the [open-color](https://yeun.github.io/open-color/) color scheme and the [Ant Design](https://ant.design/) design library.
Mangium no longer uses bootstrap.

# Backend code
I tried to write it in a class-based format as much as I could because why not.

# API
The api is a TCP server running on port 56 that communicates using packets full of JSON that follows the format
```JSON
{
  "event": "event or action",
  "data": {
    "some": "data",
    "that": "is",
    "event": "specific"
  }
}
```

# Services
You may notice the installer downloads "services". These are executables that run independantly-ish that take some of the load off of the main process and handle stuff on the side.
