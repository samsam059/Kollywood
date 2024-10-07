document.addEventListener("DOMContentLoaded", () => {
    const displayWordElement = document.getElementById("display-word");
    const instructionsElement = document.getElementById("instructions");
    const inputField = document.getElementById("input-field");
    const submitButton = document.getElementById("submit-button");
    const gameLog = document.getElementById("game-log");
    const settingsButton = document.getElementById("settings-button");
    const modal = document.getElementById("settings-modal");
    const closeButton = document.querySelector(".close");
    const saveSettingsButton = document.getElementById("save-settings");
    const gameContainer = document.getElementById("game-container");
    const gameOverMessage = document.createElement("h1");

    let currentWord = "KOLLYWOOD";
    let wrongAttempts = 0;

    let questions = {
        Hero: " ",
        Heroine: " ",
        Movie: " ",
        Song: " "
    };

    const questionKeys = ["Hero", "Heroine", "Movie", "Song"];
    let currentQuestionIndex = 0;

    // Update hints based on current questions
    function updateHints() {
        document.getElementById("hero-hint").textContent = `Hero: '${questions.Hero.charAt(0)}'`;
        document.getElementById("heroine-hint").textContent = `Heroine: '${questions.Heroine.charAt(0)}'`;
        document.getElementById("movie-hint").textContent =  `Movie: '${questions.Movie.charAt(0)}'`;
        document.getElementById("song-hint").textContent =  `Song: '${questions.Song.charAt(0)}'`;
    }

    // Show only the game over message
    function showGameOverMessage(message) {
        gameContainer.innerHTML = ""; // Hide all other elements
        gameOverMessage.innerHTML = message;
        gameOverMessage.classList.add("game-over");
        gameContainer.appendChild(gameOverMessage); // Append the message to the game container
    }

    // Handle the submit button click
    function handleSubmit() {
        const answer = inputField.value.trim();
        inputField.value = "";

       if (answer === "") {
            gameLog.innerHTML = "<p>Please enter your answer.</p>";
            return;
        }

        const correctAnswer = questions[questionKeys[currentQuestionIndex]];

        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
            currentQuestionIndex++;

            if (currentQuestionIndex >= questionKeys.length) {
               
                showGameOverMessage("CONGRATULATIONS YOU WON!");
                submitButton.disabled = true;
            } else {
                instructionsElement.textContent = `Guess the ${questionKeys[currentQuestionIndex]} name:`;
            }
        } else {
            wrongAttempts++;
            gameLog.innerHTML = "<p>Wrong answer! Try again.</p>";
            if (wrongAttempts <= 9) {
                currentWord = currentWord.substring(1);
                displayWordElement.textContent = currentWord;
            }

            if (currentWord.length === 0) {
                showGameOverMessage("Game Over! You lost.");
                submitButton.disabled = true;
            }
        }
    }

    // Handle the enter key press in the input field
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent form submission or any default action
            handleSubmit();  // Call the submit function when Enter is pressed
        }
    });

    // Submit button event listener
    submitButton.addEventListener("click", handleSubmit);

    // Show settings modal
    settingsButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close settings modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Save settings and update hints
    saveSettingsButton.addEventListener("click", () => {
        questions.Hero = document.getElementById("hero-name").value.trim();
        questions.Heroine = document.getElementById("heroine-name").value.trim();
        questions.Movie = document.getElementById("movie-name").value.trim();
        questions.Song = document.getElementById("song-name").value.trim();

     updateHints();
       modal.style.display = "none"; // Close the modal after saving
    });

    // Hide the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Initialize hints
   updateHints();
});
