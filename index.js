// Access Node File System
const fs = require('fs');

// Import Entity Methods
const Entities = require('./entityMethods');

// Import Link Methods
const Links = require('./linkMethods');

// Access and store JSON file through arguments array
const file = process.argv.slice(2,3)[0];

// Access and store entity ID parameter through arguments array
const entityIdToSearch = process.argv.slice(3)[0];

// Store parsed file globally
let parsedFile = null;

// Object storing every entity in file, indexed at each entity's unique ID.
// Creating this hash to allow constant time lookup when searching for entities.
let storedEntities = {};

// Hash Set to store IDs of entities linked to initial entity
let linkedEntityIds = new Set();

const main = file => {
    console.time("test");
    fs.readFile(file, 'utf-8', (error, data) => {
        if (error) throw error;
        
        // Store read file in global variable
        parsedFile = JSON.parse(data);

        // Copy all entities into a hash map for futute lookup
        Entities.createEntityHashMap(storedEntities, parsedFile);

        // Find all entities linked to the initial given Id and store in a hash set to prevent duplicates
        Links.findLinkedEntities(parsedFile, entityIdToSearch, linkedEntityIds);

        // Clone all linked entities whose Ids exist in the hash set and add to file entities array
        Links.cloneLinkedEntities(linkedEntityIds, storedEntities, parsedFile);

        // Create the new links and add to file links array
        Links.createLinks(entityIdToSearch, parsedFile, linkedEntityIds);

        // console.log("Parsed File", parsedFile);

        // Return file parsed back into JSON format
        Entities.convertToJson(parsedFile);
        console.timeEnd("test");
    })
    // console.timeEnd("test");
}
    
main(file);