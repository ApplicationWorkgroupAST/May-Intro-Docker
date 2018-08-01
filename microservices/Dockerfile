FROM ubuntu
  
#install needed software on the Docker container
RUN apt-get update && apt-get install vim net-tools curl -y

#create the application gateway directory on the Docker container
RUN mkdir -p /apigateway

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
WORKDIR /apigateway

#copy the application files to the Docker container
#into the WORKDIR
# our webserver code server.js needs to have this name
# so that npm start (below) works
COPY api.js /apigateway
COPY ok.sh /apigateway

#create the project directory support structure
RUN npm init -f

#install node libraries 
RUN npm install yandex-translate
RUN npm install moleculer
RUN npm install moleculer-web

#make sure our code is executable
RUN chmod -R 755 /apigateway

RUN p=`which node`; if [ -z $p ]; then ln -s /usr/bin/nodejs /usr/bin/node; fi
#create a symbolic link so nodejs can be executed as node
RUN chmod 755 /usr/bin/node

#expose the port that our webserver is running on
EXPOSE 8012

#start the server
CMD ["/apigateway/ok.sh"]
