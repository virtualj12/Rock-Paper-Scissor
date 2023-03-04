            // Define variables
            let playerScore = 0;
            let computerScore = 0;
            let matchHistory = [];
            const hands = ["✊", "🖐", "✌️"];
            const playerOptions = document.querySelectorAll("#player-options button");
            const computerHand = document.querySelector("#hands-flash");
            const playerScoreDisplay = document.querySelector("#player-score-value");
            const computerScoreDisplay = document.querySelector("#computer-score-value");
            const matchHistoryTable = document.querySelector("#match-history");
            const resetButton = document.querySelector("#reset-button");
            let flashInterval;
            
            // Define functions
            function computerPlay() {
              return hands[Math.floor(Math.random() * hands.length)];
            }
            
            function playRound(playerSelection, computerSelection) {
              let roundResult;
              if (playerSelection === computerSelection) {
                roundResult = "draw";
              } else if (
                (playerSelection === "✊" && computerSelection === "✌️") ||
                (playerSelection === "🖐" && computerSelection === "✊") ||
                (playerSelection === "✌️" && computerSelection === "🖐")
              ) {
                playerScore++;
                roundResult = "player";
              } else {
                computerScore++;
                roundResult = "computer";
              }
              // Add result to match history
              matchHistory.push({ playerSelection, computerSelection, result: roundResult });
              // Update match history table
              const row = matchHistoryTable.insertRow(-1);
              const playerCell = row.insertCell(0);
              const computerCell = row.insertCell(1);
              const resultCell = row.insertCell(2);
              playerCell.textContent = playerSelection;
              computerCell.textContent = computerSelection;
              resultCell.textContent = roundResult;
            }
            
            function updateScoreboard() {
              playerScoreDisplay.textContent = playerScore;
              computerScoreDisplay.textContent = computerScore;
            }
            
            function resetGame() {
              playerScore = 0;
              computerScore = 0;
              updateScoreboard();
              computerHand.textContent = "";
              matchHistory = [];
              // Clear match history table
              while (matchHistoryTable.rows.length > 1) {
                matchHistoryTable.deleteRow(-1);
              }
            }
            
            function flashComputerHand() {
              let index = 0;
              return setInterval(() => {
                computerHand.textContent = hands[index];
                index = (index + 1) % hands.length;
              }, 100);
            }
            
            function endGame() {
              const winner = playerScore > computerScore ? "Player" : "Computer";
              alert(`${winner} wins the game!`);
              resetGame();
            }
            
            // Event listeners for player options
            playerOptions.forEach((option) => {
              option.addEventListener("click", () => {
                clearInterval(flashInterval);
                const playerSelection = option.textContent;
                const computerSelection = computerPlay();
                playRound(playerSelection, computerSelection);
                computerHand.textContent = computerSelection;
                updateScoreboard();
                if (playerScore === 5 || computerScore === 5) {
                  endGame();
                }
              });
            });
            
            // Event listener for reset button
            resetButton.addEventListener("click", resetGame);
            
            // Flash computer hand when the page loads
            flashInterval = flashComputerHand();
            