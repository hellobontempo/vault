import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { apiPath } from 'vault/macros/lazy-capabilities';
import { expandAttributeMeta } from 'vault/utils/field-to-attrs';
import attachCapabilities from 'vault/lib/attach-capabilities';

const ModelExport = Model.extend({
  // used for getting appropriate options for backend
  idPrefix: 'role/',
  // the id prefixed with `role/` so we can use it as the *secret param for the secret show route
  idForNav: computed('id', 'idPrefix', function () {
    const modelId = this.id || '';
    return `${this.idPrefix}${modelId}`;
  }),

  name: attr('string', {
    // TODO: make this required for making a transformation
    label: 'Name',
    readOnly: true,
    subText: 'The name for your role. This cannot be edited later.',
  }),
  transformations: attr('array', {
    editType: 'searchSelect',
    isSectionHeader: true,
    fallbackComponent: 'string-list',
    label: 'Transformations',
    models: ['transform'],
    onlyAllowExisting: true,
    subText: 'Select which transformations this role will have access to. It must already exist.',
  }),

  attrs: computed('transformations', function () {
    const keys = ['name', 'transformations'];
    return expandAttributeMeta(this, keys);
  }),

  backend: attr('string', { readOnly: true }),
});

export default attachCapabilities(ModelExport, {
  updatePath: apiPath`${'backend'}/role/${'id'}`,
});
