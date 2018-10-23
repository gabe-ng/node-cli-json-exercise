const Links = require("./linkMethods");

let hashMap = {};
let hashSet = new Set();
let testId = 1;
let exampleFile = {
    "entities": [
        { "entity_id": 1, "name": "EntityA"},
        { "entity_id": 2, "name": "EntityB" },
        { "entity_id": 3, "name": "EntityC", } ],
    "links": [
        { "from": 1, "to": 2 },
        { "from": 1, "to": 3 } ]
}


test("linked entity Ids are added to the hash set", () => {
    expect(Links.createLinkedEntitiesHashSet(exampleFile, testId, hashSet)).toBeInstanceOf(Object);
});