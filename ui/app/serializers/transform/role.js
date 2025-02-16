import ApplicationSerializer from '../application';

export default ApplicationSerializer.extend({
  primaryKey: 'name',
  extractLazyPaginatedData(payload) {
    return payload.data.keys.map((key) => {
      const model = {
        id: key,
        name: key,
      };
      if (payload.backend) {
        model.backend = payload.backend;
      }
      return model;
    });
  },
});
