const Links = require("./linkMethods");

let hashSet = new Set();
let testId = 2;
let exampleFile = {
    "entities": [
        { "entity_id": 1, "name": "EntityA"},
        { "entity_id": 2, "name": "EntityB" },
        { "entity_id": 3, "name": "EntityC", } ],
    "links": [
        { "from": 1, "to": 2 },
        { "from": 1, "to": 3 } ]
}

describe("createLinkedEntitiesHashSet function", () => {

    test("should return an object", () => {
        expect(Links.createLinkedEntitiesHashSet(exampleFile, testId, hashSet)).toBeInstanceOf(Object);
    })

    test("should include the initial ID", () => {
        expect(Links.createLinkedEntitiesHashSet(exampleFile, testId, hashSet).has(testId)).toBeTruthy();
    })
})

describe("createNewLink function", () => {

    test("should return an object", () => {
        expect(Links.createNewLink(exampleFile.links[0])).toBeInstanceOf(Object);
    })

    test("should increment to and from if both equals true", () => {
        expect(Links.createNewLink(exampleFile.links[0], true)).toMatchObject({ "from": 10001, "to": 10002 });
    })
})

describe("createLinks", () => {

    test("should add a new link to the file if the id matches a 'to' and is not found in hash set", () => {
        const link = { "from": 1, "to": 10002 };
        expect(Links.createLinks(testId, exampleFile, hashSet).links).toContainEqual(link);
    })

    test("should not add a new link if the 'from' id is not found in the hash set", () => {
        const link = { from: 2, to: 10003 };
        expect(Links.createLinks(testId, exampleFile, hashSet).links).not.toContainEqual(link);
    })
})