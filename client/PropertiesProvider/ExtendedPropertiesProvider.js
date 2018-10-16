'use strict';

var inherits = require('inherits');
var _ = require('lodash');
var $ = require('jquery');
var validUrl = require('valid-url');

var ModelUtil = require('bpmn-js/lib/util/ModelUtil'),
        is = ModelUtil.is;

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var extUtils = require('../ExtUtils')

function ExtendedPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate, propertiesProvider) {
  PropertiesActivator.call(this, eventBus);

  let camundaGetTabs = propertiesProvider.getTabs;

  propertiesProvider.getTabs = function (element) {
    let tabs = camundaGetTabs(element);
    if (is(element.businessObject, 'bpmn:FlowNode') || is(element.businessObject, 'bpmn:Participant')) {
      let generalTab = _.find(tabs, {id : 'general'});
      let documentationGroup = _.find(generalTab.groups, {id: 'documentation'});
      let docField = _.find(documentationGroup.entries, {id: 'documentation'});
      docField.validate = function(element, values, node) {
          return !docField.get().documentation && element.businessObject.$attrs.isUriRelativePath ? {documentation: 'Must provide a documentation value as relative path to folderUrl property'} : {};
      }

      let folder = extUtils.getProcessParam('folderUrl');

      let checkBoxEntry = entryFactory.checkbox({
        id: 'is-uri-relative-path',
        label: 'Is URI relative path',
        description: 'Documentation field is a relative path URI',
        modelProperty: 'isUriRelativePath',
        validate: function(element, values, node) {
          return !docField.get().documentation && values.isUriRelativePath ? {isUriRelativePath: 'Must provide a documentation value as relative path to folderUrl property'} : {};
        }
      });
      documentationGroup.entries.push(checkBoxEntry);
    }
    return tabs;
  }
}


inherits(ExtendedPropertiesProvider, PropertiesActivator);

ExtendedPropertiesProvider.$inject = ['eventBus', 'bpmnFactory', 'elementRegistry', 'elementTemplates', 'translate', 'propertiesProvider'];

module.exports = {
  __init__: [ 'uriRelativePropertiesProvider' ],
  uriRelativePropertiesProvider: [ 'type', ExtendedPropertiesProvider ]
};
