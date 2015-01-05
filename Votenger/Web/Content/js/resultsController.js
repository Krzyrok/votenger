﻿(function () {
    'use strict';

    app.controller('resultsController', resultsController);

    resultsController.$inject = ['votingSessionService', 'DTOptionsBuilder'];

    function resultsController(votingSessionService, DTOptionsBuilder) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder
            .newOptions()
            .withOption('order', [2, 'desc'])
            .withBootstrap();

        activate();

        function activate() {
            vm.votingSessionId = getPathnameParameter();

            votingSessionService.getVoteResults(vm.votingSessionId).then(function (results) {
                vm.results = results.data.gamesSummary;
            });
        }
        
        function getPathnameParameter() {
            var pathname = window.location.pathname;
            var pathnameParameterPattern = /\d+$/;
            var pathnameParameter = pathnameParameterPattern.exec(pathname);

            return pathnameParameter[0];
        }
    }
})();