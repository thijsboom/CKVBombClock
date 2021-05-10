const clock = [];

clock.time = 300000 // Countdown time in milliseconds

clock.place = clock.time

// Start countdown
clock.start = start => {

    if (!start) {
        try {
            clearInterval(clock.interval)
        } catch (error) {
            
        }
    }

    clock.interval = setInterval(_ => {

        const distance = clock.place
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = distance % (1000 * 60) - seconds * 1000;

        const time = `${clock.fixString(minutes)}:${clock.fixString(seconds)}:${clock.fixString(milliseconds, true)}`
        document.getElementById('clock').innerText = time;

        clock.place -= 10

        if (clock.place === 0) {
            clearInterval(clock.interval);
            document.getElementById('clock').innerText = '00:00:000';
        };

    }, 10)
}

clock.fixString = (int, ms) => {

    let str = String(int)

    if (ms) {
        str = str.slice(0, -1);
        const random = Math.floor(Math.random() * 10)
        str += random
    }

    if (str.length <= 1) {
        str = '0' + str;
    }

    if (str.length <= 2 && ms) {
        str = '0' + str;
    }

    return str
}

document.addEventListener('visibilitychange', _ => {
    if (document.visibilityState === 'visible') {
        clock.place = clock.time
        clock.start();
    };
    if (document.visibilityState === 'hidden') {
        clock.place = clock.time
        clock.start(false);
    };
});

window.addEventListener('load', _ => {
    if (document.visibilityState === 'visible') {
        clock.place = clock.time
        clock.start();
    };
})