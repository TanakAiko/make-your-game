//var remainingSeconds = undefined
export class TimeManager {
    constructor(duration) {
        this.duration = duration
        this.id = null
        this.paused = false
        this.remainingSeconds
    }

    /*The function `updateCountdown` updatesthea countdown timer */
    updateCountdown(f) {
        const countdownElement = document.getElementById('timeValue');
        const startTime = performance.now();
        const countdown = () => {
            if (!this.paused) {
                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;
                const remainingTime = Math.max(this.duration - elapsedTime, 0);
                this.remainingSeconds = Math.floor(remainingTime / 1000);

                countdownElement.textContent = this.remainingSeconds;

                if (remainingTime > 0) {
                    // Scheduling the next countdown update.
                    this.id = requestAnimationFrame(countdown);
                } else {
                    // The countdown is over
                    countdownElement.textContent = 'Over';
                    f()
                }
            }
        }
        this.id = requestAnimationFrame(countdown)
    }
    // stoping the countdown
    stopCountdown() {
        cancelAnimationFrame(this.id);
        //return this.remainingSeconds;
    }
    // pausing the countdown
    pauseCountdown() {
        this.paused = true;
    }
    // resuming the countdown
    resumeCountdown(f) {
        this.duration = (this.remainingSeconds * 1000)
        this.paused = false;
        this.updateCountdown(f); 
    }
}