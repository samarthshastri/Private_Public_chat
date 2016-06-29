/**
 * Created by Samarth_Shastri on 6/27/16.
 */
(function () {


    var alert = prompt("Enter your name");
    document.getElementById("title").innerHTML = "hi " + alert;
    var socket = io();
    var server = io.connect('http://localhost:8080');

    var getNode = function (s) {
        return document.querySelector(s);
    };

    var user = getNode('#user');
    var message = getNode('#message');
    var mp = getNode('#myP');
    var mp1 = getNode('#myP1');
    submit = getNode('#submit_button');
    peep = getNode('#peeps');
    var gmsg = getNode('#message1');
    submit2 = getNode('#submit_button2');

    submit.addEventListener('click', function (event) {

        var userName = user.value;
        var msg = message.value;


        server.emit('msg', {
            name1:alert,
            name: userName,
            m: msg
        });

    });
    
    submit2.addEventListener('click',function (event) {
        var mess = gmsg.value;
        server.emit('msg1',{
            name1:alert,
            m:mess
        });
        
    });

    server.emit('name', alert);
   // document.getElementById("myP").innerHTML = "hi " + alert;

    server.on('output', function (msg) {
        //document.getElementById("p").innerHTML = "hi";
        peep.innerHTML=" ";
        for (var i = 0; i < msg.length; i++) {
         peep.innerHTML+="</br>"+msg[i].user_name;
        }

    });

    server.on('sent', function (msg) {
        mp.innerHTML+="</br>"+msg.name1+" says "+msg.m;
    });

    server.on('sent1', function (msg) {
        mp1.innerHTML+="</br>"+msg.name1+" says "+msg.m;
    });
})();



