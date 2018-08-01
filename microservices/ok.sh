#!/bin/bash
nohup node ./api.js 2>/dev/null &

#this is needed or the Docker container will terminate
/bin/bash
