function CrossTabsCountdown(options) {

    var instance = this;

    //options
    const name = options.name || "welp";
    const debug = options.debug || false;
    const duration = options.duration || 900;
    const sessionLocalStorageName = options.sessionLocalStorageName || "sessionStart";
    const onFinish = options.onFinish || function () { };
    const onStart = options.onStart || function () { };

    var currentDuration = null;
    var timeout = null;

    function startTimeout() {
        if (debug) console.log("starting timeout for " + name);

        timeout = setTimeout(() => {
            if (debug) console.log("executing timeout function for " + name);

            //check if session was extended through other windows
            if (debug) console.log("localStorage + " + name + ".currentDuration > Date.now : " + (parseInt(localStorage.getItem(sessionLocalStorageName)) + (currentDuration * 1000)) + " < " + Date.now());

            if (parseInt(localStorage.getItem(sessionLocalStorageName)) + (currentDuration * 1000) < Date.now()) {

                if (debug) console.log("finishing timeout for " + name);

                onFinish();
            }
            else {

                if (debug) console.log("session extension detected!");

                //calculate remaining seconds
                currentDuration = (parseInt(localStorage.getItem(sessionLocalStorageName)) + (currentDuration * 1000) - Date.now()) / 1000;

                if (debug) console.log("resetting timeout for " + name + ", new currentDuration is " + currentDuration);

                startTimeout();
                return;
            }

        }, currentDuration * 1000);
    }

    function stopTimeout() {
        if (debug) console.log("clearing timeout for " + name);

        clearTimeout();
    };

    return {
        start: function () {
            if (debug) {
                console.log("debug is enabled for " + name);
                console.log("duration: " + duration);
                console.log("sessionLocalStorageName: " + sessionLocalStorageName);
            }

            currentDuration = duration;

            localStorage.setItem(sessionLocalStorageName, Date.now());

            if (debug) console.log("localStorage [" + sessionLocalStorageName + "] is set to " + localStorage.getItem(sessionLocalStorageName));

            startTimeout();
        },
        stop: function () {
            clearTimeout(timeout);
        },
        duration: duration,
    }
};