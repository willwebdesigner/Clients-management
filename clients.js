$(document).ready(function() {
    var clientsApp = {
        ls: false,
        clients: false,
        $selectList: false,
        init: function(){
            ls = localStorage;
            $selectList = $('#list');
            clients = [];
            if (ls.getItem('clients')) {
                clients = this.getObject('clients');
                this.setClientList();
                this.getnSetUserDetails();
            }
            $('#newClient').submit(function(e) {
                e.preventDefault();
                clientsApp.saveNewClient($(this));
            });
            $('#creditDebit').submit(function(e) {
                e.preventDefault();
                clientsApp.clientSetAction($(this));
            });
            $selectList.change(function(){
                clientsApp.getnSetUserDetails();    
            });
        },
        getnSetUserDetails: function(){
            var selected = $('option:selected',$selectList).attr('value'),
                $table = $('table');
            $('th', $table).text(clients[selected].fName + ' ' + 
                                 clients[selected].lName + ' - ' + 
                                 clients[selected].phone);
            var actionsOfClient = $('table tr:nth-child(n+2)').empty(),
                total = 0;
            for(i in clients[selected].actions){
                object = clients[selected].actions[i];
                $('<tr></tr>').appendTo('table');
                for(var name in object){
                    total += name == "credit" ? parseInt(object[name]) :
                            (name == "debit" ?  parseInt(-object[name]) :
                                                parseInt("0"));
                    $('<td>'+name+ '</td>').appendTo('table tr:last-child'); 
                    $('<td>'+object[name]+'</td>').appendTo('table tr:last-child');
                }
            }
            $('<tr><td>Total:</td><td>'+total+'</td></tr>').appendTo('table');
        },
        clientSetAction: function ($this){
            var action = {};
            var act = $('option:selected',$this).attr('value');
            action[act] =  $('input[type=number]',$this).val();
            action.date = new Date().toDateString();
            var selected = $('option:selected',$selectList).attr('value');
            clients[selected].actions.push(action); 
            this.clientsDataUpdate(clients);
            this.getnSetUserDetails();
        },
        saveNewClient: function($this){
            var client = {};
            client.fName = $('input[name=fName]', $this).val();
            client.lName = $('input[name=lName]', $this).val();
            client.phone = $('input[name=phone]', $this).val();
            client.actions = [];
            clients.push(client);
            this.clientsDataUpdate(clients);
            this.setClientList();
        },
        setClientList: function(){
            $selectList.empty();
            for(i in clients){
                $('<option value="'+i+'">'+  clients[i].fName + ' ' + 
                                             clients[i].lName +
                  '</option>')
                    .appendTo($selectList);    
            };
        },
        clientsDataUpdate: function(clientsJSON){
            this.setObject('clients',clientsJSON);
            clients = this.getObject('clients');
        },
        setObject : function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getObject : function(key) {
            return localStorage.getItem(key) &&
            JSON.parse(localStorage.getItem(key));
        }


    };
    clientsApp.init();
});​