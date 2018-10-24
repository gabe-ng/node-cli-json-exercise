const createEntityHashMap = (hashMap, file) => {
    // Handle missing inputs
    if (!hashMap) throw "Create hashmap error: Missing entity hash map";
    if (!file) throw "Create hashmap error: Missing file";

    // Loop through file entities array and create keys in the hash map 
    // corresponding to the entity ID and the value equal to the whole entity
    file.entities.forEach(entity => {
        hashMap[entity.entity_id] = entity;
    })

    return hashMap;
}

const findEntity = (entitiesHash, id) => {
    // Handle missing inputs
    if (!entitiesHash) throw "Find entity error: Missing entity list";
    if (!id) throw "Find entity error: Missing ID";

    // Find entity via entity hash map
    let foundEntity = entitiesHash[id];

    if (foundEntity) {
        return foundEntity;
    } else {
        throw "Entity ID is invalid";
    }
};

const createEntityClone = entity => {
    //  Hanlde missing entity
    if (!entity) throw "Create clone error: Missing entity";

    // Create a clone of the initial entity
    let entityClone = { ...entity };

    // Increase clone's Id by 10000
    entityClone.entity_id += 10000;

    return entityClone;
};

const addEntityToFile = (file, clone) => {
    // Hanlde missing inputs
    if (!file) throw "Append entity error: Missing file";
    if (!clone) throw "Append entity error: Missing clone";

    // Add entity clone to entities array
    file.entities.push(clone);

    return file;
};

const cloneEntity = (file, entitiesHash, id) => {
    // Handle missing inputs
    if (!file) throw "Clone entity error: Missing file";
    if (!entitiesHash) throw "Clone entity error: Missing entity hash map";
    if (!id) throw "Clone entity error: Missing ID";

    // Find the entity in the hash set by ID, create a clone of it, and add it to the given file
    addEntityToFile(file, createEntityClone(findEntity(entitiesHash, id)));

    return file;
}

const cloneLinkedEntities = (hashSet, entitiesHash, file) => {
    // Handle missing inputs
    if (!file) throw "Clone linked entities error: Missing file";
    if (!entitiesHash) throw "Clone linked entities error: Missing entity hash map";
    if (!hashSet) throw "Clone linked entities error: Missing hash set";

    // Iterate over the hash set containing linked entity IDs and clone each entity
    hashSet.forEach(id => {
        cloneEntity(file, entitiesHash, id);
    });

    return file;
};

const convertToJSON = (file) => {
    // Handle missing file
    if (!file) throw "Convert to JSON error: Missing file";

    // Convert file from JS Object back to JSON with proper spacing
    let JSONFile = JSON.stringify(file, null, 2);

    return JSONFile;
}


module.exports = {
    createEntityHashMap: createEntityHashMap,
    findEntity: findEntity,
    createEntityClone: createEntityClone,
    addEntityToFile: addEntityToFile,
    cloneEntity: cloneEntity,
    cloneLinkedEntities: cloneLinkedEntities,
    convertToJSON: convertToJSON,
}