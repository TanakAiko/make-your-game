export class ScoreManager {
    constructor(score, lineCompleted) {
        this.score = score
        this.lineCompleted = lineCompleted
    }
    // adding score after a completed line
    addScore(nbLineCleared) {
        switch (nbLineCleared) {
            case 1:
                this.score += 100
                break;

            case 2:
                this.score += 300
                break;

            case 3:
                this.score += 500
                break;

            case 4:
                this.score += 1000
                break;

            default:
                break;
        }
        // return this.score;
    }

    /*
     The `updateDisplay` function updates the score value displayed on the webpage.
     */
    updateDisplay() {
        let scoreD = document.getElementById('scoreValue')
        scoreD.textContent = this.score
    }
}