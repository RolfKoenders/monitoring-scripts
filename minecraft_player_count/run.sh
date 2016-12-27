#!/bin/bash

# Description: Get number of connected players to the minecraft server and write to InfluxDB.
# Author: Rolf Koenders

# Sleep time (in seconds)
SLEEP_TIME=30;

while :
do
    numberofusers="$(MC_HOST=http://xxx.xxx.x.xx MC_PORT=8080 MC_USER=admin MC_PASS=admin node ./player_count.js)";
    echo "People playing: $numberofusers";

    curl -i -XPOST 'http://xxx.xxx.x.xx:8086/write?db=gameservers' --data-binary "currently_connected,host=thegalaxy players=$numberofusers"

    sleep "$SLEEP_TIME";
done;
