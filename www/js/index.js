/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 //FUNCIONES GLOBALES
 function getElementValue(id)
 {
	return document.getElementById(id).value;
 }
 function getElement(id)
 {
	return document.getElementById(id);
 }
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	findPeople:function()
	{
		// find all contacts with any name field
		var name 	= getElementValue('inpName');
		
		if(name == '')
		{
			alert('Please, You might type a name; ' + name);
			
		}else{
			var options = new ContactFindOptions();
			var fields = ["displayName","name"];
			
			options.filter 		= name;
			options.multiple 	= true;
			navigator.contacts.find(fields, this.onSuccess, this.onError, options);
		}
	},
	
	// onSuccess: Get a snapshot of the current contacts
	onSuccess:function (contacts) 
	{
		var body = getElement('res');
		var input = getElement('inpName');
		var lista = '';
		
		if( contacts.length != 0)
		{
			for (var i = 0; i < contacts.length; i++) 
			{
				lista = lista + '<li>' + contacts[i].displayName + '</li>';
			}
			lista = '<ul>' + lista + '</ul>';
		}else{ lista= '<strong>Non results</strong>';}
		
		input.value = '';
		body.innerHTML = '<br/>' + lista;
	},
	// onError: Failed to get the contacts
	onError:function (code) {
		alert('onError! ' + code);
	}
};
