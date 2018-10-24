// Import File Methods
const readFile = require("./fileMethods");

// Import Entity Methods
const Entities = require("./entityMethods");

// Import Link Methods
const Links = require("./linkMethods");

// Access and store JSON file through arguments array
const file = process.argv.slice(2,3)[0];

// Access and store entity ID parameter through arguments array
const entityIdToSearch = process.argv.slice(3)[0];

// Object storing every entity in file, indexed at each entity's unique ID.
// Creating this hash to allow constant time lookup when searching for entities.
let storedEntities = {};

// Hash Set to store IDs of entities linked to initial entity
let linkedEntityIds = new Set();

const main = file => {
    // Call reaf file function to read and return file parsed into a javascript object
    readFile(file)
      .then(parsedFile => {
        // Copy all entities into a hash map for futute lookup
        Entities.createEntityHashMap(storedEntities, parsedFile);

        // Find all entities linked to the initial given Id and store in a hash set to prevent duplicates
        Links.createLinkedEntitiesHashSet(parsedFile, entityIdToSearch, linkedEntityIds);

        // Clone all linked entities whose Ids exist in the hash set and add to file entities array
        Entities.cloneLinkedEntities(linkedEntityIds, storedEntities, parsedFile);

        // Create the new links and add to file links array
        Links.createLinks(entityIdToSearch, parsedFile, linkedEntityIds);

        // Return file parsed back into JSON format
        // Using console.log to view results in terminal
        console.log(Entities.convertToJSON(parsedFile));
      })
      .catch(error => console.log(error));
}

main(file);