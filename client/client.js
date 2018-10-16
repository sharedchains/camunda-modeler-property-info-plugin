var registerBpmnJSPlugin = require('camunda-modeler-plugin-helpers').registerBpmnJSPlugin;
var plugin = require('./PropertyInfoPlugin');
var propertiesProvider = require('./PropertiesProvider/ExtendedPropertiesProvider');

registerBpmnJSPlugin(propertiesProvider);
registerBpmnJSPlugin(plugin);
