edgeipc = require('node-ipc');

edgeIpcServer = function (options, cb) {

        global.csharpCallback = options.callback;

        global.edgeipc.config.id = 'wpf-app';
        global.edgeipc.config.retry = 1500;

        global.edgeipc.serve(
            function () {
                global.edgeipc.server.on(
                    'wpf-app',
                    function (data, socket) {
                        options.callback(data);
                    }
                );
            }
        );
        global.edgeipc.server.start();
    cb();
};

return edgeIpcServer;