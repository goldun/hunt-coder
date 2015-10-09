/**
 * Created by serhii.holdun on 10/6/15.
 */

var es = require('elasticsearch');
var client = new es.Client({
    host: 'localhost:9201'
});

client.index({
    index: 'employees',
    type: 'employee',
    id: 1,
    body: {
        name: {
            first: "Serhii",
            last: "Holdun"
        },
        programmingLanguages: ["Java", "JavaScript", "Bash", "PHP"],
        updateDate: '2015-12-17'
    }
}, function (err, resp) {
    console.log(resp);
    console.log(err);
});
