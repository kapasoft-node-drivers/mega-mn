#!/bin/sh

#echo export CONTROLLER_URL=/
#echo export CONTROLLER_HOST=min-controller.cloudfoundry.com
#echo export CONTROLLER_PORT=80

#cf set-env mega-mn-driver CONTROLLER_PORT=80
#cf set-env mega-mn-driver CONTROLLER_URL=/api/
#cf set-env mega-mn-driver CONTROLLER_HOST=mega-mn-controller.cfapps.io

echo export CONTROLLER_URL=/mega-mn/api/
echo export CONTROLLER_HOST=localhost
echo export CONTROLLER_PORT=8080
