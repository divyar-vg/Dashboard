(function (window) {

    var app = angular.module("adf.widget.gauge", ['ng.epoch']);

    app.config(["dashboardProvider", function (dashboardProvider) {
        dashboardProvider
          .widget('gauge', {
              title: 'Gauge',
              description: 'Gauge Widget',
              templateUrl: '{widgetsPath}/gauge/src/view.html',
              controller: 'gaugeCtrl',
              reload: true,
              config: {
                  MetricId: 0
              },
		edit: {
		  templateUrl: '{widgetsPath}/gauge/src/edit.html'
		}              
          });                                                                                                                                                                           																																																					
    }]);

    app.controller('gaugeCtrl', ["$scope", "$rootScope", "config", "MetricService", function ($scope, $rootScope, config, MetricService)
	{	
	
	var gaugeMetric = function () {
                  $scope.metricData = MetricService.GetMetric(config.MetricId);
				  console.log("Metric ID");
                  console.log($scope.metricData);				  
              };			  
    MetricService.registerObserver($scope, gaugeMetric, true);
	
	
 var GaugeData = function() {};
  GaugeData.prototype.next = function() {
     $scope.datas = Math.random();
    return $scope.datas;	
  }; 
  window.GaugeData = GaugeData;
   var liveGaugeData = new GaugeData();   
   var charts = angular.extend(this, {
	});
	charts.gauge = liveGaugeData.next();
    charts.gaugeFeed = liveGaugeData.next();	
           charts.getNextGauge = setInterval(function() {
           charts.gaugeFeed = liveGaugeData.next();
             },3000);	
   setInterval(charts.gaugeFeed, 3000);	  
}]);

   angular.module("adf.widget.gauge").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/gauge/src/view.html", "<div class=\"panel panel-dashboard\"><div class=\"panel-heading\"><div class=\"row\"><div class=\"col-xs-12 text-center\"><div class=\"controls left\"><i class=\"ion ion-more\"></i></div><div class=\"controls right\"><a class=\"remove\"><i class=\"ion ion-minus-round\"></i></a></div><div class=\"center\">{{Metric.value}}</div></div></div></div><div class=\"panel-body\">   <div class=epoch-theme-dark> <epoch-gauge  gauge-value=datas gauge-stream=datas chart-margin=\"20\" chart-height=\"90\" chart-width=\"142\" style=\"display:inline-block;\"></epoch-gauge></div> <a href=\"#\"><span>View Details</span></a><div class=\"clearfix\"></div></div></div>"); 
    $templateCache.put("{widgetsPath}/gauge/src/edit.html","<form role=form><div class=form-group><label for=location>Metric </label> <input type=location class=form-control id=location ng-model=config.MetricId placeholder=\"Enter Metric Id\"></div></form>"); }]);	
}(window));
