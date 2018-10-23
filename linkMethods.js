const createLinkedEntitiesHashSet = (file, id, hashSet) => {
    // Handle missing inputs
    if (!id) throw "Create linked hashset error: Missing id";
    if (!file) throw "Create linked hashset error: Missing file";
    if (!hashSet) throw "Create linked hashset error: Missing hashset";

    // Find all links associated with initial ID as "from"
    let foundLinks = file.links.filter(link => link.from == id);

    // Add initial ID as a number into hash set
    hashSet.add(parseInt(id));

    // Store all IDs of entities that are linked to from the initial entity
    foundLinks.forEach(link => {
        if (!hashSet.has(link.to)) {
            // If ID doesn't exist in hash set, add to hash set and recursively call function to
            // traverse list of links
            hashSet.add(link.to);
            createLinkedEntitiesHashSet(file, link.to, hashSet);
        }
    });

    return hashSet;
};

const createNewLink = (link, both) => {
    // Handle missing link
    if (!link) throw "Create new link error: Missing link";

    // Both is a boolean stating whether both the "to" and "from" should be incremented
    let newLink = { ...link };
    newLink.to += 10000;
    if (both) newLink.from += 10000;

    return newLink;
}

const createLinks = (id, file, hashSet) => {
    // Handle missing inputs
    if (!id) throw "Create links error: Missing id";
    if (!file) throw "Create links error: Missing file";
    if (!hashSet) throw "Create links error: Missing hash set";

   // Store current links array length so it does not dynamically keep increasing
    let length = file.links.length;

    // For loop over a forEach loop so that loop does not keep extending as elements are pushed in
    for (let i=0; i<length; i++) {
        // If the file link.to equals the Id and the hash set does not include the file link.from,
        // create a new link only incrementing to "to"
        if (file.links[i].to === id && !hashSet.has(file.links[i].from)) {
            file.links.push(createNewLink(file.links[i], false))

        // Else create a new link incrementing both the "to" and "from"
        } else if (hashSet.has(file.links[i].from)) {
            file.links.push(createNewLink(file.links[i], true));
        }  
    }
   
    return file;
}

module.exports = {
    createLinkedEntitiesHashSet: createLinkedEntitiesHashSet,
    createNewLink: createNewLink,
    createLinks: createLinks,
}