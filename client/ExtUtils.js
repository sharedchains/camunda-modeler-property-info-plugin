var _ = require('lodash');

var ModelUtil = require('bpmn-js/lib/util/ModelUtil'),
        is = ModelUtil.is;

var paramKeys = require('./ParamKeyProps').paramKeys;
var paramMap = {};

module.exports = {
  /**
   * Get first camunda:Properties object for a specific bpmn:ExtensionElements
   * business object.
   *
   * @param {ModdleElement} extensionElements
   *
   * @return {ModdleElement} a camunda:Properties object
   */
  getCamundaProperties: function (extensionElements) {
    return _.find(extensionElements.values, function (elem) {
        return is(elem, 'camunda:Properties');
    });
  },
  /**
   * Loads parameters from Process camunda:properties
   */
  loadProcessParams: function (processElement) {
    let extensionElements = processElement.businessObject.extensionElements;
    if (extensionElements) {
      _.find(this.getCamundaProperties(extensionElements).values, function (elem) {
        // Se l'elemento fa parte delle properties salvarlo in una mappa
        if (_.indexOf(paramKeys, elem.name) !== -1){
          paramMap[elem.name] = elem.value;
        }
      });
    }
  },
  getProcessParam: function(paramName) {
    return paramMap[paramName];
  }

}
