const Links = require("./linkMethods");
const exampleData = require("./testHelper");

let hashmap = exampleData.hashmap;
let hashset = exampleData.hashset;
let fileData = exampleData.file;
let testId = 1;


// describe("Links", () => {
//     test ("")
// })

test("linked entity Ids are added to the hash set", () => {
    expect(Links.createLinkedEntitiesHashSet(fileData, testId, hashset)).toBeInstanceOf(Object);
    expect(Links.createdLinkedEntitiesHashSet(fileData, testId, hashset).length).toBeGreaterThanOrEqual(1);
})