# json-process.js
Traitement automatique d'un retour AJAX au format JSON

## Structure

	
	{
	    "caller":{
	        "ret":0,
	        "msg":"Retour ajax ok",
	        "result":{
	            "data1": 1,
	            "data2": 2,
	            "data3": 3
	        }
	    },
	    "update":[
	        {
	            "element":"#date_reelle_debut_travaux",
	            "value":"12/10/2015",
	            "source":"document"
	        },
	        {
	            "element":".date_reelle_fin_travaux",
	            "value":"13/10/2015"
	        }
	    ],
	    "prepend":[
	        {
	            "element":"#date_reelle_debut_travaux",
	            "value":"12/10/2015",
	            "source":"document"
	        },
	        {
	            "element":".date_reelle_fin_travaux",
	            "value":"13/10/2015"
	        }
	    ],
	    "append":[
	        {
	            "element":"#date_reelle_debut_travaux",
	            "value":"12/10/2015",
	            "source":"document"
	        },
	        {
	            "element":".date_reelle_fin_travaux",
	            "value":"13/10/2015"
	        }
	    ],
	    "script":[
	    	{
	    	 	"functioname":"reloadpage",
	    	    "args": false    	    ]
	    	},
	    	{
	    	    "functioname":"mafonction",
	    	    "args": [
	    	        ["id","test2",12],
	    	        "Hello"
	    	    ]
	    	}
	    ],
	    "notify":{
	        "info":[
	            {
	                "message":"notif info 1"
	            },
	            {
	                "message":"notif info 2"
	            }
	            
	        ],
	        "error":[
	            {
	                "message":"notif error 1"
	            },
	            {
	                "message":"notif error 2"
	            }
	            
	        ],
	        "success":[
	            {
	                "message":"notif success 1"
	            },
	            {
	                "message":"notif success 2"
	            }
	            
	        ],
	        "warning":[
	            {
	                "message":"notif warning 1"
	            },
	            {
	                "message":"notif warning 2"
	            }
	            
	        ]
	    },
	    "reloaddossier":["RDP","APS"]
	}

## Les clés
### caller
Retour d'appel JSON après un ajax. Contient les données de retour pour un traitement spécifique
### update
Mise à jour du contenu d'un élément
### prepend
Ajout de contenu au début d'un élément
### update
Ajout de contenu à la fin d'un élément
### notify
Affichage d'une dialog de notification avec les sous-types: info, error, success, warning

## Déclenchement personnalisable
Dans un nouveau fichier (voir exemple dans 'jsonProcessApp.js'), ajouter le code suivant:

	if (window.jsonProcess == undefined) {
		alert('jsonProcess non chargé !')
	} else {
		
		// Définition de la fonction de notificiation
		jsonProcess.options.notify = notification;
		
		$.extend(true, jsonProcess.priority, {
			"refreshdata" : null
		});
		
		jsonProcess.func_refreshdata = function(dataObject) {
			var value = null;
			for ( var key in dataObject) {
				value = dataObject[key];
				$('[data-refresh-value="' + key + '"]').html(value)
			}
		}
	}

## Personnaliser les notifications
Dans un nouveau fichier (voir exemple dans 'jsonProcessApp.js')
La fonction d'appelle doit prendre en paramètre le message et un paramétrage au format JSON.

	jsonProcess.options.notify = function(message, {}){ /*... Appel de ma fonction de notification */};	

## Déclenchement après chaque appel AJAX
	$(document).ajaxComplete(function(event, request, settings) {
		// $.console.info("ajaxComplete called")
		jsonProcess.process(request.responseText);
	});

