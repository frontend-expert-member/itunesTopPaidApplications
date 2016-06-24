app.controller("iListController", ['$scope', '_', '$http', '$filter', function($scope, _, $http, $filter) {
    
    var url = "https://itunes.apple.com/us/rss/toppaidapplications/limit=10/json";
    
    $scope.iData = [];
    
    $http.get(url).then(function(res) {
        angular.forEach(res.data.feed.entry, function(v,k) {
            $scope.iData[k] = {
                appName : v['im:name'].label,
                appCategory : v.category.attributes.label,
                appImage : v['im:image'][0].label,
                appPrice : v['im:price'].label,
                appCost : v['im:price'].attributes.amount,
				appDate : v['im:releaseDate'].label
            }
        });
        console.log($scope.iData);
        
        $scope.chart = new CanvasJS.Chart("chartContainer", {
            theme: 'theme1',
            title:{
                text: "Apps By Cost"              
            },
            axisY: {
                title: "Number of Apps",
                labelFontSize: 16,
            },
            axisX: {
                labelFontSize: 16,
            },
            data: [              
                {
                    type: "pie",
                    dataPoints: []
                }
            ]
        });
        
        $scope.$watch('fData', function() {
            var appsBycost = [];
            
            var groupBycost = _.groupBy($scope.fData, 'appCost');
            
            angular.forEach(groupBycost, function(v,k) {
                appsBycost.push({
                    label:$filter('currency')(k),
                    y:v.length
                });
            });
            console.log(appsBycost);
            $scope.chart.options.data[0].dataPoints = appsBycost;

            $scope.chart.render();
        }, true);
    });
}]);