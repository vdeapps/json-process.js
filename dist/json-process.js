/**
 * Controlleur pour la gestion des JSON de retour AJAX
 * 
 * 
 * Pour ajouter son propre traitement:
 * $.extend(true, jsonProcess.priority, {"monTraitement":null});
jsonProcess.func_monTraitement = function(dataObject){
	$.console.info('monTraitement');
}
 *
 * Appel: jsonProcess.process(jsonData);
 *
 */
if (vdeapps == undefined) {
	throw new Error("vdeapps/vdeapps.js not loaded");
}

vdeapps.load('json-process',{
		
	options:{
		// Enable/Disable jsonProcess
		"enable": true,
		
		// Fonction d'affichage de la notificaiton
		// jParam: JSON
		"notify": function(message, jParam ){}
	},
	
	priority: {
		"caller": null,	/* retour ajax */
		"update": null, /* elements a mettre à jour */
		"prepend": null, /* element à insérer en haut */
		"append": null, /* element à insérer en bas */
		"remove": null, /* element à supprimer */
		"script": null, /* scripts à executer */
		"notify": { /* Appel des notifications */
			"error":{
				"type": "error",
				"title": "Erreur",
				"hide": false
			},
			"warning":{
				"type": "warning",
				"title": "Attention",
				"hide": true,
				"timeout": 5000
			},
			"info":{
				"hide": true,
				"title": "Information",
				"timeout": 5000
			},
			"success":{
				"type": "success",
				"title": "Notification",
				"hide": true,
				"timeout": 5000
			},
			"default":{
				"hide": true,
				"timeout": 5000
			}
		}
	}
	
	/*
	 * Traite les éléments clés du json
	 */
	,process: function(jdata){
		$.console.info("jsonProcess called")
		
		if (jsonProcess.options.enable == false){
			return false;
		}
		
		
		try{
			if (typeof(jdata)=='string'){
				this.jdata = JSON.parse(jdata);
			}
			else{
				this.jdata = jdata;
			}
			
			this.dispatch(this.jdata);
		}
		catch (e) {
			
			//Erreur de parsing
			return false;
		}
	}
	
	/**
	 * Dispatch data to functions
	 */
	,dispatch: function(jdata){			
		//Read order keys
		for (var key in jsonProcess.priority){
			if (typeof jdata[key]!='undefined'){
				
				/**
				 * Execute function by dynamic name
				 * executeFunctionByName("My.Namespace.functionName", window, arguments);
				 * executeFunctionByName("Namespace.functionName", My, arguments);
				 * @param functionName
				 * @param context
				 * @param args
				 * @returns result function
				 */
				vdeapps.executeFunctionByName('func_'+key, this, jdata[key]);
			}
		}
		
		/*
		 * Retourne les données de l'ajax
		 */
		return jdata['caller'];
	}
	
	/**
	 * Custom function
	 */
	,func_caller: function(dataObject){
		
	}
	
	/**
	 * Mise à jour HTML d'élément
	 * 
	 */
	,func_update: function(dataArr){
		//Must be an array
		if (typeof dataArr == 'undefined' || dataArr.length==undefined){
			return false;
		}
		
		var data = {};
		var source = null;
		var nbItem=dataArr.length
		for (var i=0; i<nbItem; i++){
			data=dataArr[i]
			
			if (data.source!=""){
				source=data.source
			}
			
			//Mise a jour du parent
			if(data.parent==true){
				parent.$(data.element, eval(source)).html(data.value)
			}
			//Mise a jour du document
			$(data.element, eval(source)).html(data.value);
		}
	}
	
	/**
	 * Mise à jour HTML d'élément
	 * 
	 */
	,func_prepend: function(dataArr){
		//Must be an array
		if (typeof dataArr == 'undefined' || dataArr.length==undefined){
			return false;
		}
		
		var data = {};
		var source = null;
		var nbItem=dataArr.length
		for (var i=0; i<nbItem; i++){
			data=dataArr[i]
			if (data.source!=""){
				source=data.source
			}
			$(data.element, eval(source)).prepend(data.value);
		}
	}
	
	/**
	 * Mise à jour HTML d'élément
	 * 
	 */
	,func_append: function(dataArr){
		//Must be an array
		if (typeof dataArr == 'undefined' || dataArr.length==undefined){
			return false;
		}
		
		var data = {};
		var source = null;
		var nbItem=dataArr.length
		for (var i=0; i<nbItem; i++){
			data=dataArr[i]
			if (data.source!=""){
				source=data.source
			}
			$(data.element, eval(source)).append(data.value);
		}
	}
	
	/**
	 * Mise à jour HTML d'élément
	 * 
	 */
	,func_remove: function(dataArr){
		//Must be an array
		if (typeof dataArr == 'undefined' || dataArr.length==undefined){
			return false;
		}
		
		var data = {};
		var source = null;
		var nbItem=dataArr.length
		for (var i=0; i<nbItem; i++){
			data=dataArr[i]
			if (data.source!=""){
				source=data.source
			}
			$(data.element, eval(source)).remove();
		}
	}
	
	,func_script: function(dataArr){
		//Must be an array
		if (typeof dataArr == 'undefined' || dataArr.length==undefined){
			return false;
		}
		
		var data = {};
		var nbItem=dataArr.length
		for (var i=0; i<nbItem; i++){
			data=dataArr[i]
			if (data.source!=""){
				source=data.source
			}
			$(data.element, eval(source)).html(data.value);
		}
	}
	
	/*
	 * Affichage des notifications
	 */
	,func_notify: function(dataObject){
		//Read order keys
		for(var type in jsonProcess.priority.notify) {
						
			var notif_params=jsonProcess.priority.notify[type];
			/*
			 * Si la notification existe dans l'objet
			 */
			if (typeof dataObject[type]!='undefined'){
				var html='';
				
				// Liste des messages de la notification
				var listeNotif = dataObject[type];

				if (typeof listeNotif == 'undefined' || listeNotif.length == undefined){
					return false;
				}
				
				html+='<ul class="no_li_style">';
				for (var i=0; i<listeNotif.length; i++)
				{
					dataMsg = listeNotif[i];
					
					// Surcharge les paramètres par défaut
					$.extend(true, notif_params, dataMsg)
					
					html+='<li>'+ dataMsg.message +'</li>';
				}
				html+='</ul>';
				
				jsonProcess.options.notify(html,notif_params);
			}
		}
	}
});
} 
catch (e) {
	console.error(e.message())
};

