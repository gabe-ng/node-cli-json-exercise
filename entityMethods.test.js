const Entities = require("./entityMethods");

let hashMap = {};
let hashSet = new Set();
let testId = 2;
let exampleFile = {
    "entities": [
        { "entity_id": 1, "name": "EntityA" },
        { "entity_id": 2, "name": "EntityB" },
        { "entity_id": 3, "name": "EntityC", }],
    "links": [
        { "from": 1, "to": 2 },
        { "from": 1, "to": 3 }]
}

describe("createEntityHashMap function", () => {

    test("should return an object", () => {
        expect(Entities.createEntityHashMap(hashMap, exampleFile)).toBeInstanceOf(Object);
    })

    test("should create an instance for every entity", () => {
        let keysArray = Object.keys(Entities.createEntityHashMap(hashMap, exampleFile));
        expect(keysArray).toHaveLength(3)
    })

    test("should have the original entity mapped to its entity_id", () => {
        let entity = { entity_id: 2, name: "EntityB" };
        expect(Entities.createEntityHashMap(hashMap, exampleFile)[testId]).toMatchObject(entity);
    })
})