export default function (server) {
  server.createList("collection", 2);
  const collections = server.schema.collections.all();
  server.createList("item", 10, {
    collection:
      collections.models[Math.floor(Math.random() * collections.models.length)],
  });
}
