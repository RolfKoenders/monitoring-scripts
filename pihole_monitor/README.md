# PiHole monitor

> Similair to what [@sc01](https://github.com/sco01/piholestatus) does but rewritten in Python and with Docker image. 

Script which makes an HTTP request to the PiHole API to retrieve the data, followed by pushing it to influxdb. You want this data in influxdb in order to make some nice graphs in for example your grafana dashboard.

## Run
You can run the script manually by passing in the envirionment variables directly or by changing them in the `.env` file.

```bash
PIHOLE_HOST=pihole.lab.local INFLUX_HOST=monitoring.lab.local INFLUX_DATABASE=pihole node pihole.js
```

## Docker
There is a `Dockerfile` included to build a Docker image:

Build it:
```bash
$ docker build -t pihole_monitor .
```

Run it: 
```bash
$ docker run -d pihole_monitor
```

### Thanks
- @sc01 for the idea
