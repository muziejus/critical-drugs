export default function(server) {
  server.loadFixtures();
  server.createList("collection", 2);
  const collections = server.schema.collections.all();
  server.createList("tag", 20);
  const tags = server.schema.tags.all();
  server.createList("item", 10, {
    collection:
      collections.models[Math.floor(Math.random() * collections.models.length)],
    tags() {
      const shuffledTags = tags.models.sort(() => 0.5 - Math.random());
      return shuffledTags.slice(0, Math.floor(Math.random() * 6));
    },
  });

  const items = server.schema.items.all();
  console.log("items from scenario", items.models);
}
