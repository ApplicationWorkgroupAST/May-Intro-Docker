let { ServiceBroker } = require('moleculer');
let ApiService = require('moleculer-web');

var translate = require('yandex-translate')('trnsl.1.1.20180224T101627Z.60834ac718491fb6.1d4eeed31e7a59f39e0bda72271a8026b29dcd8a');

let broker = new ServiceBroker({logger:console});

function process(myString, callback) {
   translate.translate(myString, { to: 'ru' }, callback);
}

//TEST CODE process('burt', function(e,r) { console.log(r.text); });

broker.createService({
   name: "stringFun",

   //this exposes our service on port 8012 of the ApiGateway
   //the ApiGateway is a gatekeeper to our api
   mixins: [ApiService],
   settings: { port: 8012 },
   actions: {

      translate(ctx) {
        return new Promise(function(resolve,reject) {
             process(ctx.params.p, function(err, result) {
                 resolve('Your string (' + ctx.params.p + ') in Russian is (' + result.text + ')');
             });
        });  
      }
   }
});

//start the server
broker.start();
