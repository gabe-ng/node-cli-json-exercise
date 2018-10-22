const createEntityHashMap = (hashMap, file) => {
    // Handle invalid inputs
    if (!hashMap) throw "Missing entity hash map";
    if (!file) throw "Missing file";

    // Loop through file entities array and create keys in the hash map 
    // corresponding to the entity ID and the value equal to the whole entity
    file.entities.forEach(entity => {
        hashMap[entity.entity_id] = entity;
    })

    return hashMap;
}

const findEntity = (entitiesHash, id) => {
    // Handle invalid inputs
    if (!entitiesHash) throw "Missing entity list";
    if (!id) throw "Missing ID";

    // Find entity via entity hash map
    let foundEntity = entitiesHash[id];

    return foundEntity;
};

const createEntityClone = entity => {
    //  Hanlde invalid entity
    if (!entity) throw "Missing entity";

    // Create a clone of the initial entity
    let entityClone = { ...entity };

    // Increase clone's Id by 10000
    entityClone.entity_id += 10000;

    return entityClone;
};

const addEntityToFile = (file, clone) => {
    // Hanlde invalid inputs
    if (!file) throw "Missing file";
    if (!clone) throw "Missing clone";

    // Add entity clone to entities array
    file.entities.push(clone);

    return file;
};

const cloneEntity = (file, entitiesHash, id) => {
    // Handle invalid inputs
    if (!file) throw "Missing file";
    if (!entitiesHash) throw "Missing entity hash map";
    if (!id) throw "Missing ID";

    addEntityToFile(file, createEntityClone(findEntity(entitiesHash, id)));

    return file;
}

const convertToJson = (file) => {
    // Handle missing file
    if (!file) throw "Missing file";

    // Convert file from JS Object back to JSON
    let JSONFile = JSON.stringify(file, null, 2);

    // console.log(JSON.stringify(file, null, 2));
    return JSONFile;
}


module.exports = {
    createEntityHashMap: createEntityHashMap,
    findEntity: findEntity,
    createEntityClone: createEntityClone,
    addEntityToFile: addEntityToFile,
    cloneEntity: cloneEntity,
    convertToJson: convertToJson,
}