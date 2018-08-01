FROM ubuntu:latest

#install needed software on the Docker container
RUN apt-get update && apt-get install nodejs vim net-tools npm -y

#create the web application directory on the Docker container
RUN mkdir -p /mywebapp

WORKDIR /mywebapp

#copy the application files to the Docker container
#into the WORKDIR
# our webserver code server.js needs to have this name
# so that npm start (below) works
COPY server.js /mywebapp

#create the project directory support structure
RUN npm init -f

#install express which is the library that we use to run our webserver
RUN npm install express --save

#make sure our code is executable
RUN chmod -R 755 /mywebapp

#create a symbolic link so nodejs can be executed as node
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN chmod 755 /usr/bin/node

#expose the port that our webserver is running on
EXPOSE 3000

#start the server
CMD ["npm", "start"]
