'use strict';

var inherits = require('inherits');
var _ = require('lodash');
var $ = require('jquery');
var validUrl = require('valid-url');

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var extUtils = require('../ExtUtils')

function ExtendedPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate, propertiesProvider) {
  PropertiesActivator.call(this, eventBus);

  this.getTabs = function (element) {
    let tabs = propertiesProvider.getTabs(element);
    if (is(element.businessObject, 'bpmn:FlowNode') || is(element.businessObject, 'bpmn:Participant')) {
      let generalTab = _.find(tabs, {id : 'general'});
      let documentationGroup = _.find(generalTab.groups, {id: 'documentation'});
      let docField = _.find(documentationGroup.entries, {id: 'documentation'});

      let folder = extUtils.getProcessParam('folderUrl');

      let checkBoxEntry = entryFactory.checkbox({
        id: 'is-uri-relative-path',
        description: 'Is URI relative path',
        modelProperty: 'is-uri-relative-path'
        // get: function (element) {
        //   var res = {};
        //   res['is-uri-relative-path'] = validUrl.isUri(folder + encodeURI(docField.text));
        //   return res;
        // },
        // set: function (element, values) {
        //
        // }
      });
      documentationGroup.entries.push(checkBoxEntry);
    }
    return tabs;
  }
  propertiesProvider = this;
}


inherits(ExtendedPropertiesProvider, PropertiesActivator);

ExtendedPropertiesProvider.$inject = ['eventBus', 'bpmnFactory', 'elementRegistry', 'elementTemplates', 'translate', 'propertiesProvider'];

module.exports = {
  __init__: [ 'extendedPropertiesProvider' ],
  extendedPropertiesProvider: [ 'type', ExtendedPropertiesProvider ]
};
