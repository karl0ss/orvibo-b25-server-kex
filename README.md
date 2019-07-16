
  

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

Just a note: If you try to add a socket after you've redirected the DNS you will be ale to setup WiFi and use it with this library but your phone will probably timeout when trying to add the device to the official Orvibo server.


### Installing

From Github

Clone the repo and then run
```
npm install
```
to install the dependencies


### Usage
## Docker

Easiest way to use this is to run it in a docker container.

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
      

## Configuration

## Confirmed Working Models
A list of Orvibo devices, confirmed by contributors, that work with this project:
| Device Name | Product ID | Confirmed By |
| --- | --- | --- |
| Orvibo Smart Socket (EU/AUS) | B25 | @sandysound |
| Orvibo Smart Socket (US/CAD) | S25 | @wichopy |
| Orvibo Smart Socket (UK/GB) | B25UK | @valchonedelchev |

  

## Contributing
## Authors

  

  

*  **Karl Hudgell** - [Karl0ss](https://github.com/karl0ss/)

  

  

## License

  

  

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

  

  

## Acknowledgments

  

  

Big thanks to [Grayda](https://github.com/Grayda/) and [insertjokehere](https://github.com/insertjokehere) and [Sandy Milne](https://github.com/sandysound)


