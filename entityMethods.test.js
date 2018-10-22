const Entities = require("./entityMethods");
const exampleData = require("./testHelper");

let hashmap = exampleData.hashmap;
let hashset = exampleData.hashset;
let fileData = exampleData.file;

test("the hash map is created", () => {
    expect(Entities.createEntityHashMap(hashmap, fileData)).toBeInstanceOf(Object);
})