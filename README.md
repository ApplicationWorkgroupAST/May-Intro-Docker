# dockertutorial
Sample code in support of the presentation by the AST on docker.  This overview demonstrates what Docker is and why it is important.  We look at various docker commands such as the following:
<br/><br/>
docker network <br/>
docker-machine<br/>
docker images<br/>
docker container<br/>
docker-compose<br/>
docker inspect<br/>
<br/><br/>
We create images, start containers, pull images, create and build images from Dockerfiles and look at Docker compose
<br/><br/>
There is a second git branch for this tutorial.  From the command line you would do the following to access it:
<br/><br/>
git checkout origin/microservices
<br/><br/>
This branch contains updates to the webserver/server.js file to add a get HTTP call to /toRussian?inString=<the string to convert>
<br/>
An example to invoke this would be localhost:3000/toRussian?inString=burt
<br/><br/>
This call goes to an API Gateway in the microservices layer.  
<br/>
The API Gateway calls upon (via a REST call) to the yandex translation service.
<br/><br/>
This service is accessed with a key I created via the object (this in the microservices/api.js file):<br/><br/>
var translate = require('yandex-translate')('trnsl.1.1.20180224T101627Z.60834ac718491fb6.1d4eeed31e7a59f39e0bda72271a8026b29dcd8a');
<br/><br/>
This call to Yandex is a good example of a service from a cloud (type) provider which is normally accessed by a key.  The following call:<br/><br/>
translate.translate(myString, { to: 'ru' }, callback);
<br/><br/>
is actually a webservice (HTTP call) hidden in an API call (translate.translate).
<br/><br/>
The action invoked in in the (microservices/api.js file) as the following:<br/><br/>

   translate(ctx) { <br/>
        return new Promise(function(resolve,reject) { <br/>
             process(ctx.params.p, function(err, result) { <br/>
                 resolve('Your string (' + ctx.params.p + ') in Russian is (' + result.text + ')'); <br/>
             }); <br/>
        }); <br/>

<br/><br/>
A promise is a callback and the concept is documented at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
