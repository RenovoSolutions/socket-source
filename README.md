# socket-source
Data source for simple socket POC. Pushes data into a rabbit queue to be consumed by the socket service.

# Configuration
This application requires a configuration file named rabbit.json next to index.js. This json file should have the following fields:
* host: The hostname or ip address of the rabbit server.
* login: The username to use when connecting to the rabbit server.
* password: The password to use when connecting to the rabbit server.
* exchange: The name of the exchange where messages will be published.

# Usage
Run the app with the following arguments to generate rabbit messages:
* --channel, -c: The socket channel on which the socket messages will be broadcasted
* --message, -m: The message to broadcast on the socket.
 
## Sample usage
From within the app folder:
`node index.js -c test -m "This is a test message"`
