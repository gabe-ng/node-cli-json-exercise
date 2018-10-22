const Entities = require("./entityMethods");

const findLinkedEntities = (file, id, hashSet) => {
  // Find all links associated with initial Id as "from"
  let foundLinks = file.links.filter(link => link.from == id);

  // Add initial Id as a number into hash set
  hashSet.add(parseInt(id));

  // Store all Ids of entities that are linked to from initial entity
  foundLinks.forEach(link => {
    if (!hashSet.has(link.to)) {
      hashSet.add(link.to);
      findLinkedEntities(file, link.to, hashSet);
    }
  });

  return hashSet;
};

const cloneLinkedEntities = (hashSet, entitiesHash, file) => {
    hashSet.forEach((id) => {
        Entities.cloneEntity(file, entitiesHash, id);
    })
}

const createNewLink = (link, both) => {
    // Both is a boolean stating whether both the "to" and "from" should be incremented

    let newLink = { ...link };
    newLink.to += 10000;
    if (both) newLink.from += 10000;

    return newLink;
}

const createLinks = (id, file, hashSet) => {
   // Store current links array length so it does not dynamically keep increasing
    let length = file.links.length;

    // For loop over a forEach loop so that loop does not keep extending as elements are pushed in
    for (let i=0; i<length; i++) {
        if (file.links[i].to == id && !hashSet.has(file.links[i].from)) {
            file.links.push(createNewLink(file.links[i], false))
        } else if (hashSet.has(file.links[i].from)) {
            file.links.push(createNewLink(file.links[i], true));
        }  
    }
    // console.log("File Links", file.links)
}

module.exports = {
    findLinkedEntities: findLinkedEntities,
    cloneLinkedEntities: cloneLinkedEntities,
    createNewLink: createNewLink,
    createLinks: createLinks,
}