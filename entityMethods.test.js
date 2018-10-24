const Entities = require("./entityMethods");

let hashMap = {};
let testId = 2;
let entity = { entity_id: 2, name: "EntityB" };
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
        expect(Entities.createEntityHashMap(hashMap, exampleFile)[testId]).toMatchObject(entity);
    })
})

describe("findEntity function", () => {

    beforeEach(() => {
        Entities.createEntityHashMap(hashMap, exampleFile);
    });

    test("should return the entity if found", () => {
        expect(Entities.findEntity(hashMap, testId)).toMatchObject(entity);
    })

    test("should throw if entity is not found", () => {
        let id = 5;
        expect(() => { Entities.findEntity(hashMap, id)}).toThrow();
    })
}) 

describe("createEntityClone function", () => {

    test("should return entity with id + 10000", () => {
        let clone = { entity_id: 10002, name: "EntityB" };
        expect(Entities.createEntityClone(entity)).toMatchObject(clone);
    })
})

describe("addEntityToFile function", () => {

    test("should add the clone to the file's entities", () => {
        let clone = { entity_id: 10002, name: "EntityB" };
        expect(Entities.addEntityToFile(exampleFile, clone).entities).toContainEqual(clone);
    })
})

describe("cloneLinkedEntities function", () => {

    beforeEach(() => {
        Entities.createEntityHashMap(hashMap, exampleFile);
    });

    test("should add all linked entities to the file", () => {
        let hashSet = new Set([1]);
        expect(Entities.cloneLinkedEntities(hashSet, hashMap, exampleFile).entities).toHaveLength(5);
    })
})

describe("cloneEntity function", () => {

    beforeEach(() => {
        Entities.createEntityHashMap(hashMap, exampleFile);
    });

    test("should the clone entity and add to the file", () => {
        let clone = { entity_id: 10002, name: "EntityB" };
        expect(Entities.cloneEntity(exampleFile, hashMap, testId).entities).toContainEqual(clone);
    })
})

describe("convertToJson function", () => {
    // Helper function taking a JSON string, parsing it, and checking its prototype
    // for [object Object]
    const isJSON = jsonStr => {
        try {
            const json = JSON.parse(jsonStr);
            if (Object.prototype.toString.call(json).slice(8, -1) !== 'Object') {
                return false
            }
        } catch (e) {
            return false
        }
        return true
    }

    test("should return a JSON file", () => {
        expect(isJSON(Entities.convertToJSON(exampleFile))).toBe(true);
    })
})