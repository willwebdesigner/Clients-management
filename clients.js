var clientsApp = {
	ls: false,
	clients: false,
	$selectList: false,
	$deleteButton: false,
	$textarea: false,
	selected: false,
	init: function(){
		this.ls = localStorage;
		this.$selectList = $('#list');
		this.$deleteButton = $('input[value*=Ubrat]');
		this.$textarea = $('textarea');
		this.clients = [];$(document).ready(function() {
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
		if (this.ls.getItem('clients')) {
			this.clients = this.getObject('clients');
			this.setClientList();
			this.getnSetUserDetails();
		}
		this.$deleteButton.click(function () {
			clientsApp.deleteClient();
		});
		$('form').submit(function(e){
			e.preventDefault();
			clientsApp[$(this).attr('id')]($(this));
		});
		this.$selectList.change(function(){
			clientsApp.getnSetUserDetails();    
		});
		this.$textarea.keyup(function(){
			clientsApp.note($(this));
		});
	},
	note: function($this) {
		this.clients[selected].note = $this.val();
		this.clientsDataUpdate();
	},
	deleteClient: function () {
		this.clients.splice(selected,1);
		this.clientsDataUpdate();
		this.setClientList();
		this.getnSetUserDetails();
	},
	getnSetUserDetails: function(){
		var selected = $('option:selected',this.$selectList).attr('value'),
			$table = $('table');
		$('th', $table).text(this.clients[selected].fName + ' ' + this.clients[selected].lName + ' - ' + this.clients[selected].phone);
		var actionsOfClient = $('table tr:nth-child(n+2)').remove(),
			total = 0;
		for(i in this.clients[selected].actions){
			var object = this.clients[selected].actions[i];
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
		!!this.clients[selected].note ? $('textarea').val(this.clients[selected].note) : $('textarea').val('');
	},
	clientSetAction: function ($this){
		var action = {};
		var act = $('option:selected',$this).attr('value');
		action[act] =  $('input[type=number]',$this).val().length > 0 ? 
								$('input[type=number]',$this).val() : 0;
		action.date = new Date().toDateString();
		var selected = $('option:selected',$selectList).attr('value');
		this.clients[selected].actions.push(action);
		this.clientsDataUpdate(clients);
		this.getnSetUserDetails();
	},
	saveNewClient: function($this){
		var client = {};
		client.fName = $('input[name=fName]', $this).val();
		client.lName = $('input[name=lName]', $this).val();
		client.phone = $('input[name=phone]', $this).val();
		$('#newClient input:not([type=submit])').val('');
		client.actions = [];
		this.clients.push(client);
		this.clientsDataUpdate(this.clients);
		this.setClientList();
		this.getnSetUserDetails();
	},
	setClientList: function(){
		this.$selectList.empty();
		for(i in this.clients){
			$('<option value="'+i+'">'+  this.clients[i].fName + ' ' +
										 this.clients[i].lName +
			  '</option>')
				.appendTo(this.$selectList);
		};
	},
	clientsDataUpdate: function(){
		this.setObject('clients',this.clients);
		this.clients = this.getObject('clients');
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