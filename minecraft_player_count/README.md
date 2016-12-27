# Minecraft player count
Get the number of users currently connected to the minecraft server and post that to influxdb. In the file `run.sh` you can see an example of how i structed the data.

## Run
Build and run it directly by executing `run.sh` or run it as a Docker container.

Build it: 

```bash
$ docker build -t minecraft_player_count .
```

Run it: 
```bash
$ docker run -d minecraft_player_count
```
