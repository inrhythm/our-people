

export default function serve (api, storage, collection, port, done) {

  const app = api(storage, collection);

  return app.listen(port, done);

}