var clientsApp = {
	ls: false,
	clients: false,
	$selectList: false,
	$deleteButton: false,
	$textarea: false,
	selected: false,
	init: function(){
		ls = localStorage;
		$selectList = $('#list');
		$deleteButton = $('input[value*=Ubrat]');
		$textarea = $('textarea');
		clients = [];
		if (ls.getItem('clients')) {
			clients = this.getObject('clients');
			this.setClientList();
			this.getnSetUserDetails();
		}
		$deleteButton.click(function () {
			clientsApp.deleteClient();
		});
		$('form').submit(function(e){
			e.preventDefault();
			clientsApp[$(this).attr('id')]($(this));
		});
		$selectList.change(function(){
			clientsApp.getnSetUserDetails();    
		});
		$textarea.keyup(function(){
			clientsApp.note($(this));
		});
	},
	note: function($this) {
		clients[selected].note = $this.val();
		this.clientsDataUpdate();
	},
	deleteClient: function () {
		clients.splice(selected,1);
		this.clientsDataUpdate();
		this.setClientList();
		this.getnSetUserDetails();
	},
	getnSetUserDetails: function(){
		selected = $('option:selected',$selectList).attr('value'),
			$table = $('table');
		$('th', $table).text(clients[selected].fName + ' ' + clients[selected].lName + ' - ' + clients[selected].phone);
		var actionsOfClient = $('table tr:nth-child(n+2)').remove(),
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
		!!clients[selected].note ? $('textarea').val(clients[selected].note) : $('textarea').val(''); 
	},
	clientSetAction: function ($this){
		var action = {};
		var act = $('option:selected',$this).attr('value');
		action[act] =  $('input[type=number]',$this).val().length > 0 ? 
								$('input[type=number]',$this).val() : 0;
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
		$('#newClient input:not([type=submit])').val('');
		client.actions = [];
		clients.push(client);
		this.clientsDataUpdate(clients);
		this.setClientList();
		this.getnSetUserDetails();
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
	clientsDataUpdate: function(){
		this.setObject('clients',clients);
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