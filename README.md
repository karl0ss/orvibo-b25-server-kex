
# Orvibo B25 Smart Socket Server (Kex)

A server to control the B25 range of wifi Smart Sockets.

This server was largely based on the work done by [Sandy Milne](https://github.com/sandysound).


## Getting Started

To run this server you will need to have Node.js installed. I run v11.

  
You will need to add the Orvibo PK key to decrypt and encrypt the initial packets.

You can find this using helpful bash script from Grayda [getKey.sh](https://gist.github.com/Grayda/eb48093bcfb96bfeec9c58ea301f2668) (you may have to add www to to url to make it work)


Once you have this key you will need to add it the ``OrviboSettings.js`` file or you can pass it into as part of the settings object when you create the orvibo server object.


For each socket on your network you will need to add its MAC address (colons removed and lower cased) to the plugInfo array as a uid and give it a name field for easier identification.


Because these new sockets don't use UDP packets to communicate like the older versions you will also need to redirect all traffic from the host name ``homemate.orvibo.com``

on TCP port 10001 the computer running the server.
  

I used an Ubuntu machine running dnsmasq and set this server as my DNS server in my router but depending on your network you might have to do it differently. Most routers will let you modify your DNS settings under the WAN settings.
  

Make sure to set a static IP address to the computer that will be running the Ubuntu server (In following example, the ip of machine running this server is at 192.168.0.106)
  

```

server=8.8.8.8

address=/homemate.orvibo.com/192.168.0.106

```

To confirm your dnsmasq is working, when visiting ``homemate.orvibo.com:10001`` from your browser the server should return a response.

You will know things are working when you hit the server in your browser (for Example.js this would be ``http://localhost:3000``) and start seeing your sockets in the array.

Just a note: If you try to add a socket after you've redirected the DNS you will be ale to setup WiFi and use it with this library but your phone will probably timeout when trying to add the device

to the official Orvibo server.

### Installing  

From Github


Clone the repo and then run

```
npm install

```

to install the dependencies

### Usage

To start the server run

```
npm start

```

This will start the Orvibo socket server create a basic example HTTP server used for interacting with sockets.

Calling this http server with no parameters will return the uid, state or the switch, modelId and name of the socket.

  

You can then use the uid to toggle the state of the switch like http://localhost:3000?uid=5dcf7ff76e7a

  

One thing to note is the Orvibo uses 1 as off and 0 as on for the socket state.

## Docker

  

I have extened this project to also run in a docker container.

  

PK and PlugArray can be passed in via enviroment variables.

  

 - orviboPK = 'xxxxx'
 - plugArray = 'uid:MACADDRESS,name:PRINTERNAME'

Example run command -

    docker run --env orviboPK='OrviboPKkey' --env plugArray='uid:MACADDRESS,name:PLUGNAME' -p 3000:3000 -p 10001:10001 karl0ss/orvibo-b25-server  

Docker-Compose example -

      orvibo-b25-server:
    container_name: orvibo-b25-server
    environment:
    - PGID=${PGID}
    - PUID=${PUID}
    - TZ=${TZ}
    image: karl0ss/orvibo-b25-server
    ports:
    - "3000:3000"
    - "10001:10001"
    restart: unless-stopped
    environment:
        - orviboPK=OrviboPKkey
        - plugArray=uid:MACADDRESS,name:PLUGNAME
    volumes:
    - /etc/localtime:/etc/localtime:ro
    - /mnt/orvibo-b25-server:/usr/src/app

## Configuration

  

Once you've got a socket connecting to the official app you can add it to the plugInfo array in the OrviboSettings.js or to your settings object you pass in.

This will match to uid to a name so you can easily see which socket is which.

  

## Confirmed Working Models

  

A list of Orvibo devices, confirmed by contributors, that work with this project:

  
  

| Device Name | Product ID | Confirmed By |

| --- | --- | --- |

| Orvibo Smart Socket (EU/AUS) | B25 | @sandysound |

| Orvibo Smart Socket (US/CAD) | S25 | @wichopy |

| Orvibo Smart Socket (UK/GB) | B25UK | @valchonedelchev |
  

## Contributing

  

I'm more than happy for other people to contribute to this library just send a pull request.

  

This project will probably work with other versions of the smart sockets that use the homemate app.

If you manage to get it working let me know so I can add it here as supported.

  

Also if you'd like to contribute to help me buy additional Orvibo products to add to this server or the software has helped you in your own home automation projects and you just want to buy me a beer. You can sponsor it via my paypal account at

[http://paypal.me/sandysounds](http://paypal.me/sandysounds)

  

## Authors

  

*  **Sandy Milne** - [SandySound - Github](https://github.com/sandysound)

  

## License

  

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

  

## Acknowledgments

  

Big thanks to [Grayda](https://github.com/Grayda/) and [insertjokehere](https://github.com/insertjokehere) for all their research and hard work into how these sockets work