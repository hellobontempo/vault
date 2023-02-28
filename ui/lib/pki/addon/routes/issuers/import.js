import PkiIssuersIndexRoute from '.';
import { inject as service } from '@ember/service';
import { withConfirmLeave } from 'core/decorators/confirm-leave';

@withConfirmLeave()
export default class PkiIssuersImportRoute extends PkiIssuersIndexRoute {
  @service store;

  model() {
    return this.store.createRecord('pki/issuer');
  }

  setupController(controller, resolvedModel) {
    super.setupController(controller, resolvedModel);
    controller.breadcrumbs.push({ label: 'import' });
  }
}
