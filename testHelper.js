let hashMap = {};
let hashSet = new Set();
let examplefile = { "entities": [
    {
        "entity_id": 1,
        "name": "EntityA"
        },
    {
        "entity_id": 2,
        "name": "EntityB"
        },
    {
        "entity_id": 3,
        "name": "EntityC",
        },
    {
        "entity_id": 4,
        "name": "EntityD"
        }
],
"links": [
    {
        "from": 1,
        "to": 2
    },
    {
        "from": 1,
        "to": 3
    },
    {
        "from": 3,
        "to": 4
    },
    {
        "from": 4,
        "to": 5
    }
    ]
}

module.exports = {
    hashmap: hashMap,
    hashset: hashSet,
    file: examplefile,
}