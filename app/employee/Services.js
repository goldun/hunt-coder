/**
 * Created by serhii.holdun on 10/6/15.
 */

var employeeServices = angular.module('huntCoder.employeeServices', ['elasticsearch']);

employeeServices.factory('employeesService',
    ['$q', 'esFactory', function($q, esFactory){
            var client = esFactory({
            host: 'localhost:9201'
        });

        /**
         * Given a term and an offset, load another round of 10 employees.
         *
         * Returns a promise.
         */
        var search = function(term, offset){
            var deferred = $q.defer();
            var query = {
                "match": {
                    "_all": term
                }
            };
            console.log(term);
            client.search({
                "index": 'employees',
                "type": 'employee',
                "body": {
                    "size": 10,
                    "from": (offset || 0) * 10,
                    "query": query
                }
            }).then(function(result) {
                console.log(result.hits);
                var ii = 0, hits_in, hits_out = [];
                hits_in = (result.hits || {}).hits || [];
                for(;ii < hits_in.length; ii++){
                    hits_out.push(hits_in[ii]._source);
                }
                deferred.resolve(hits_out);
            }, deferred.reject);

            return deferred.promise;
        };


        return {
            "search": search
        };
    }]
);