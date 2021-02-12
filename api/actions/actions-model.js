const db = require('../../data/dbConfig.js');
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

  // - `[GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
  //  - `[GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
function get(id) {
  let query = db('actions');
  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

// - `[POST] /api/actions` returns the newly created action as the body of the _response_.
function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}

// - `[PUT] /api/actions/:id` returns the updated action as the body of the _response_.
function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

//  - `[DELETE] /api/actions/:id` returns no _response_ body.
function remove(id) {
  return db('actions').where('id', id).del();
}
