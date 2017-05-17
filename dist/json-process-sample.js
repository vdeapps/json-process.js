// Require jsonProcess.js

/**
 * Controlleur pour la gestion des JSON de retour AJAX
 * 
 * 
 * Pour ajouter son propre traitement: $.extend(true, jsonProcess.priority,
 * {"monTraitement":null}); jsonProcess.func_monTraitement =
 * function(dataObject){ $.console.info('monTraitement'); }
 * 
 * Appel: jsonProcess.process(jsonData);
 * 
 */

if (vdeapps.get('json-process') == undefined) {
	alert('json-process non chargé !')
} else {
	
  jsonProcess = vdeapps.get('json-process');
  
	jsonProcess.options.notify = notification;

	/*
	 * Mise a jour des donnees
	 */
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

	/*
	 * Rechargement des dossiers
	 */
	$.extend(true, jsonProcess.priority, {
		"reloaddossier" : null
	});
	jsonProcess.func_reloaddossier = function(dataArr) {
		tw.reloadDossierCanvas(dataArr);
	}

	/**
	 * Execution apres un appel AJAX
	 */
	$(document).ajaxComplete(function(event, request, settings) {
		// $.console.info("ajaxComplete called")
		jsonProcess.process(request.responseText);
	});

}
