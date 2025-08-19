// RoboQuiz Adventure - Main Game Logic

class RoboQuizGame {
    constructor() {
        this.currentMode = null;
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.timer = null;
        this.timeRemaining = 0;
        this.gameStartTime = 0;
        this.questionStartTime = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.hintsUsed = 0;
        this.fastAnswers = 0; // For speed demon achievement
        
        // Player progress
        this.playerData = {
            totalPoints: 0,
            currentLevel: 1,
            totalXP: 0,
            streak: 0,
            gamesPlayed: { capitals: 0, cars: 0 },
            achievements: [],
            flagsIdentified: 0,
            carsMatched: 0
        };
        
        this.loadPlayerData();
        this.initializeEventListeners();
        this.updateUI();
        this.showScreen('mainMenu');
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                this.startGame(mode);
            });
        });

        // Navigation buttons
        document.getElementById('backBtn').addEventListener('click', () => {
            this.endGame();
            this.showScreen('mainMenu');
        });

        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.startGame(this.currentMode);
        });

        document.getElementById('homeBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Popup buttons
        document.getElementById('achievementOkBtn').addEventListener('click', () => {
            this.hidePopup('achievementPopup');
        });

        document.getElementById('levelUpOkBtn').addEventListener('click', () => {
            this.hidePopup('levelUpPopup');
        });

        // Hint button
        document.getElementById('hintBtn').addEventListener('click', () => {
            this.useHint();
        });

        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
    }

    // Show specific screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Show popup
    showPopup(popupId) {
        document.getElementById(popupId).classList.remove('hidden');
    }

    // Hide popup
    hidePopup(popupId) {
        document.getElementById(popupId).classList.add('hidden');
    }

    // Handle keyboard input
    handleKeyPress(event) {
        // Only handle keyboard input during active quiz
        if (!document.getElementById('gameScreen').classList.contains('active')) {
            return;
        }

        // Check if we're currently showing a question (not during feedback)
        const answerButtons = document.querySelectorAll('.answer-btn:not([disabled])');
        if (answerButtons.length === 0) {
            return;
        }

        const key = event.key.toLowerCase();
        let selectedIndex = -1;

        // Map keys to answer indices
        switch (key) {
            case 'a':
                selectedIndex = 0;
                break;
            case 'b':
                selectedIndex = 1;
                break;
            case 'c':
                selectedIndex = 2;
                break;
            case 'd':
                selectedIndex = 3;
                break;
            case 'h':
                // H key for hint
                this.useHint();
                return;
            default:
                return; // Ignore other keys
        }

        // Select the answer if valid index
        if (selectedIndex >= 0 && selectedIndex < answerButtons.length) {
            event.preventDefault();
            const answerTextElement = answerButtons[selectedIndex].querySelector('.answer-text');
            const selectedAnswer = answerTextElement ? answerTextElement.textContent.trim() : '';
            
            // Add visual feedback for keyboard selection
            answerButtons[selectedIndex].classList.add('keyboard-selected');
            setTimeout(() => {
                answerButtons[selectedIndex].classList.remove('keyboard-selected');
            }, 200);
            
            this.selectAnswer(selectedAnswer);
        }
    }

    // Load player data from localStorage
    loadPlayerData() {
        const saved = localStorage.getItem('roboQuizPlayerData');
        if (saved) {
            this.playerData = { ...this.playerData, ...JSON.parse(saved) };
        }
    }

    // Save player data to localStorage
    savePlayerData() {
        localStorage.setItem('roboQuizPlayerData', JSON.stringify(this.playerData));
    }

    // Start a new game
    startGame(mode) {
        this.currentMode = mode;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.streak = 0;
        this.hintsUsed = 0;
        this.fastAnswers = 0;
        this.gameStartTime = Date.now();

        // Get difficulty based on player level
        const difficulty = window.gameData.getCurrentDifficulty(this.playerData.currentLevel);
        const settings = window.gameData.difficultySettings[difficulty];

        // Generate quiz questions
        this.generateQuiz(mode, settings.questionsPerQuiz);

        // Update UI
        document.getElementById('modeTitle').textContent = 
            mode === 'capitals' ? 'Countries & Capitals' : 'Cars & Makers';
        document.getElementById('totalQuestions').textContent = this.currentQuiz.length;

        this.showScreen('gameScreen');
        this.showQuestion();
    }

    // Generate quiz questions
    generateQuiz(mode, questionCount) {
        const data = mode === 'capitals' ? window.gameData.countriesData : window.gameData.carsData;
        
        // Ensure we don't request more questions than available data
        const actualQuestionCount = Math.min(questionCount, data.length);
        const selectedItems = window.gameData.shuffleArray(data).slice(0, actualQuestionCount);
        
        this.currentQuiz = selectedItems.map(item => {
            // Get 3 wrong answers from remaining items
            const otherItems = data.filter(d => d !== item);
            const wrongAnswers = window.gameData.getRandomItems(otherItems, 3);
            
            // Create answer choices array with correct answer + 3 wrong answers
            const allChoices = [item, ...wrongAnswers];
            const answers = window.gameData.shuffleArray(allChoices);
            
            if (mode === 'capitals') {
                return {
                    type: 'capitals',
                    question: `What is the capital of ${item.country}?`,
                    flag: item.flag,
                    correctAnswer: item.capital,
                    answers: answers.map(a => a.capital).filter(capital => capital), // Filter out any undefined
                    hint: `This capital is in ${item.country}`,
                    data: item
                };
            } else {
                return {
                    type: 'cars',
                    question: `Which company makes the ${item.model}?`,
                    correctAnswer: item.maker,
                    answers: answers.map(a => a.maker).filter(maker => maker), // Filter out any undefined
                    hint: `This model is known for its distinctive design`,
                    data: item
                };
            }
        });
    }

    // Show current question
    showQuestion() {
        if (this.currentQuestionIndex >= this.currentQuiz.length) {
            this.endGame();
            return;
        }

        const question = this.currentQuiz[this.currentQuestionIndex];
        if (!question) {
            return;
        }
        
        const difficulty = window.gameData.getCurrentDifficulty(this.playerData.currentLevel);
        const settings = window.gameData.difficultySettings[difficulty];

        // Update question UI
        document.getElementById('questionNum').textContent = this.currentQuestionIndex + 1;
        document.getElementById('questionText').textContent = question.question;

        // Show flag if it's a capitals question
        const flagContainer = document.getElementById('flagContainer');
        if (question.type === 'capitals') {
            document.getElementById('flagEmoji').textContent = question.flag;
            flagContainer.classList.remove('hidden');
        } else {
            flagContainer.classList.add('hidden');
        }

        // Create answer buttons
        const answersGrid = document.getElementById('answersGrid');
        answersGrid.innerHTML = '';

        const keyLabels = ['A', 'B', 'C', 'D'];

        // Ensure we have valid answers
        if (!question.answers || question.answers.length === 0) {
            return;
        }
        
        question.answers.forEach((answer, index) => {
            if (!answer || answer.trim() === '') {
                return;
            }
            
            const button = document.createElement('button');
            button.className = 'answer-btn';
            
            // Create a simple text structure
            button.innerHTML = `
                <span class="key-label">${keyLabels[index]}. </span>
                <span class="answer-text">${answer}</span>
            `;
            
            button.addEventListener('click', () => this.selectAnswer(answer));
            answersGrid.appendChild(button);
        });

        // Reset hint button
        const hintBtn = document.getElementById('hintBtn');
        hintBtn.disabled = false;
        hintBtn.style.opacity = '1';

        // Start timer
        this.timeRemaining = settings.timeLimit;
        this.questionStartTime = Date.now();
        this.startTimer();
    }

    // Start countdown timer
    startTimer() {
        const timerText = document.getElementById('timerText');
        const timerFill = document.getElementById('timerFill');
        
        const difficulty = window.gameData.getCurrentDifficulty(this.playerData.currentLevel);
        const totalTime = window.gameData.difficultySettings[difficulty].timeLimit;

        this.timer = setInterval(() => {
            this.timeRemaining--;
            timerText.textContent = this.timeRemaining;
            
            const percentage = (this.timeRemaining / totalTime) * 360;
            timerFill.style.background = `conic-gradient(var(--primary-orange) ${percentage}deg, transparent ${percentage}deg)`;
            
            if (this.timeRemaining <= 0) {
                this.selectAnswer(null); // Time up
            }
        }, 1000);
    }

    // Handle answer selection
    selectAnswer(selectedAnswer) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        const question = this.currentQuiz[this.currentQuestionIndex];
        const answerTime = Date.now() - this.questionStartTime;
        const isCorrect = selectedAnswer === question.correctAnswer;

        // Update answer buttons visual feedback
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            const answerTextElement = btn.querySelector('.answer-text');
            const answerText = answerTextElement ? answerTextElement.textContent.trim() : '';
            
            if (answerText === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (answerText === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Calculate points and update stats
        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            
            const difficulty = window.gameData.getCurrentDifficulty(this.playerData.currentLevel);
            let points = window.gameData.difficultySettings[difficulty].pointsPerCorrect;
            
            // Bonus points for fast answers
            if (answerTime < 5000) { // Under 5 seconds
                points += 10;
                this.fastAnswers++;
            }
            
            // Streak bonus
            if (this.streak >= 3) {
                points += Math.floor(this.streak / 3) * 5;
            }
            
            this.score += points;
            
            // Track specific achievements
            if (question.type === 'capitals') {
                this.playerData.flagsIdentified++;
            } else {
                this.playerData.carsMatched++;
            }
            
            // Play success sound effect (visual feedback)
            this.showFeedback('correct', `+${points} points!`);
        } else {
            this.streak = 0;
            this.showFeedback('incorrect', 'Try again next time!');
        }

        // Continue to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showQuestion();
        }, 2000);
    }

    // Show visual feedback
    showFeedback(type, message) {
        // This could be enhanced with more visual effects
        console.log(`${type}: ${message}`);
    }

    // Use hint
    useHint() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const difficulty = window.gameData.getCurrentDifficulty(this.playerData.currentLevel);
        const hintCost = window.gameData.difficultySettings[difficulty].hintCost;
        
        if (this.score >= hintCost) {
            this.score -= hintCost;
            this.hintsUsed++;
            
            // Show hint (could be enhanced with better UI)
            alert(`Hint: ${question.hint}`);
            
            const hintBtn = document.getElementById('hintBtn');
            hintBtn.disabled = true;
            hintBtn.style.opacity = '0.5';
        } else {
            alert(`You need ${hintCost} points to use a hint!`);
        }
    }

    // End current game and show results
    endGame() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Update player data
        this.playerData.totalPoints += this.score;
        this.playerData.totalXP += this.score;
        this.playerData.gamesPlayed[this.currentMode]++;
        this.playerData.streak = this.maxStreak > this.playerData.streak ? this.maxStreak : this.playerData.streak;

        // Check for level up
        const newLevel = window.gameData.getLevelFromXP(this.playerData.totalXP);
        const leveledUp = newLevel > this.playerData.currentLevel;
        this.playerData.currentLevel = newLevel;

        // Check achievements
        this.checkAchievements();

        // Save progress
        this.savePlayerData();
        this.updateUI();

        // Show results
        this.showResults(leveledUp);
    }

    // Show results screen
    showResults(leveledUp) {
        const accuracy = this.currentQuiz.length > 0 ? Math.round((this.correctAnswers / this.currentQuiz.length) * 100) : 0;
        
        // Update results display
        document.getElementById('correctAnswers').textContent = this.correctAnswers;
        document.getElementById('pointsEarned').textContent = `+${this.score}`;
        document.getElementById('accuracy').textContent = `${accuracy}%`;

        // Update results title based on performance
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');
        
        if (accuracy === 100) {
            resultsTitle.textContent = 'Perfect Score!';
            resultsSubtitle.textContent = 'You\'re absolutely amazing!';
        } else if (accuracy >= 80) {
            resultsTitle.textContent = 'Excellent Work!';
            resultsSubtitle.textContent = 'You\'re becoming an expert!';
        } else if (accuracy >= 60) {
            resultsTitle.textContent = 'Good Job!';
            resultsSubtitle.textContent = 'Keep practicing to improve!';
        } else {
            resultsTitle.textContent = 'Keep Learning!';
            resultsSubtitle.textContent = 'Practice makes perfect!';
        }

        // Show rewards section
        this.showRewards();

        this.showScreen('resultsScreen');

        // Show level up popup if applicable
        if (leveledUp) {
            setTimeout(() => {
                document.getElementById('newLevel').textContent = this.playerData.currentLevel;
                this.showPopup('levelUpPopup');
            }, 1000);
        }
    }

    // Show rewards earned
    showRewards() {
        const rewardsSection = document.getElementById('rewardsSection');
        rewardsSection.innerHTML = '<h3>Rewards Earned</h3>';

        const rewardsList = document.createElement('div');
        rewardsList.className = 'rewards-list';

        // Add XP reward
        const xpReward = document.createElement('div');
        xpReward.className = 'reward-item';
        xpReward.innerHTML = `
            <i class="fas fa-star"></i>
            <span>+${this.score} XP</span>
        `;
        rewardsList.appendChild(xpReward);

        // Add streak reward if applicable
        if (this.maxStreak >= 5) {
            const streakReward = document.createElement('div');
            streakReward.className = 'reward-item';
            streakReward.innerHTML = `
                <i class="fas fa-fire"></i>
                <span>Streak Bonus: ${this.maxStreak} questions!</span>
            `;
            rewardsList.appendChild(streakReward);
        }

        rewardsSection.appendChild(rewardsList);
    }

    // Check and unlock achievements
    checkAchievements() {
        const newAchievements = [];

        // First quiz
        if (!this.playerData.achievements.includes('first_quiz') && this.playerData.gamesPlayed.capitals + this.playerData.gamesPlayed.cars >= 1) {
            newAchievements.push('first_quiz');
        }

        // Perfect score
        if (!this.playerData.achievements.includes('perfect_score') && this.correctAnswers === this.currentQuiz.length && this.currentQuiz.length > 0) {
            newAchievements.push('perfect_score');
        }

        // Speed demon
        if (!this.playerData.achievements.includes('speed_demon') && this.fastAnswers >= 5) {
            newAchievements.push('speed_demon');
        }

        // Geography master
        if (!this.playerData.achievements.includes('geography_master') && this.playerData.gamesPlayed.capitals >= 3) {
            newAchievements.push('geography_master');
        }

        // Car expert
        if (!this.playerData.achievements.includes('car_expert') && this.playerData.gamesPlayed.cars >= 3) {
            newAchievements.push('car_expert');
        }

        // Streak master
        if (!this.playerData.achievements.includes('streak_master') && this.maxStreak >= 25) {
            newAchievements.push('streak_master');
        }

        // Level achievements
        if (!this.playerData.achievements.includes('level_5') && this.playerData.currentLevel >= 5) {
            newAchievements.push('level_5');
        }

        if (!this.playerData.achievements.includes('level_10') && this.playerData.currentLevel >= 10) {
            newAchievements.push('level_10');
        }

        // Point collector
        if (!this.playerData.achievements.includes('thousand_points') && this.playerData.totalPoints >= 1000) {
            newAchievements.push('thousand_points');
        }

        // Flag master
        if (!this.playerData.achievements.includes('flag_master') && this.playerData.flagsIdentified >= 50) {
            newAchievements.push('flag_master');
        }

        // World explorer - complete full geography quiz
        if (!this.playerData.achievements.includes('world_explorer') && 
            this.currentMode === 'capitals' && this.currentQuiz.length === 100 && 
            this.currentQuestionIndex >= this.currentQuiz.length) {
            newAchievements.push('world_explorer');
        }

        // Auto enthusiast - complete full car quiz
        if (!this.playerData.achievements.includes('auto_enthusiast') && 
            this.currentMode === 'cars' && this.currentQuiz.length === 100 && 
            this.currentQuestionIndex >= this.currentQuiz.length) {
            newAchievements.push('auto_enthusiast');
        }

        // Perfect century - 100% on full quiz
        if (!this.playerData.achievements.includes('perfect_century') && 
            this.correctAnswers === this.currentQuiz.length && this.currentQuiz.length === 100) {
            newAchievements.push('perfect_century');
        }

        // Endurance champion - complete 5 full quizzes
        const totalFullQuizzes = this.playerData.gamesPlayed.capitals + this.playerData.gamesPlayed.cars;
        if (!this.playerData.achievements.includes('endurance_champion') && totalFullQuizzes >= 5) {
            newAchievements.push('endurance_champion');
        }

        // Add new achievements and show popup
        newAchievements.forEach(achievementId => {
            this.playerData.achievements.push(achievementId);
            const achievement = window.gameData.achievements.find(a => a.id === achievementId);
            if (achievement) {
                this.playerData.totalPoints += achievement.points;
                this.showAchievementPopup(achievement);
            }
        });
    }

    // Show achievement popup
    showAchievementPopup(achievement) {
        document.getElementById('achievementText').textContent = achievement.name;
        setTimeout(() => {
            this.showPopup('achievementPopup');
        }, 2000);
    }

    // Update UI elements
    updateUI() {
        // Update header stats
        document.getElementById('totalPoints').textContent = this.playerData.totalPoints;
        document.getElementById('currentLevel').textContent = this.playerData.currentLevel;
        document.getElementById('streak').textContent = this.playerData.streak;

        // Update game level and XP bar
        document.getElementById('gameLevel').textContent = this.playerData.currentLevel;
        
        const currentLevelXP = this.playerData.currentLevel > 1 ? 
            window.gameData.getXPForLevel(this.playerData.currentLevel - 1) : 0;
        const nextLevelXP = window.gameData.getXPForLevel(this.playerData.currentLevel);
        const progressXP = this.playerData.totalXP - currentLevelXP;
        const neededXP = nextLevelXP - currentLevelXP;
        
        const xpPercentage = (progressXP / neededXP) * 100;
        document.getElementById('xpFill').style.width = `${Math.min(xpPercentage, 100)}%`;
        document.getElementById('xpText').textContent = `${progressXP}/${neededXP} XP`;

        // Update progress bars on main menu
        const capitalsProgress = Math.min((this.playerData.gamesPlayed.capitals / 5) * 100, 100);
        const carsProgress = Math.min((this.playerData.gamesPlayed.cars / 5) * 100, 100);

        document.querySelector('[data-mode="capitals"] .progress').style.width = `${capitalsProgress}%`;
        document.querySelector('[data-mode="cars"] .progress').style.width = `${carsProgress}%`;

        document.querySelector('[data-mode="capitals"] .progress-text').textContent = 
            `${this.playerData.flagsIdentified}/100 Learned`;
        document.querySelector('[data-mode="cars"] .progress-text').textContent = 
            `${this.playerData.carsMatched}/100 Learned`;

        // Update achievements list
        this.updateAchievementsList();
    }

    // Update achievements display
    updateAchievementsList() {
        const achievementList = document.getElementById('achievementList');
        achievementList.innerHTML = '';

        // Show latest unlocked achievements
        const unlockedAchievements = window.gameData.achievements.filter(a => 
            this.playerData.achievements.includes(a.id)
        ).slice(-3);

        if (unlockedAchievements.length === 0) {
            const lockedAchievement = document.createElement('div');
            lockedAchievement.className = 'achievement locked';
            lockedAchievement.innerHTML = `
                <i class="fas fa-lock"></i>
                <span>Complete your first quiz!</span>
            `;
            achievementList.appendChild(lockedAchievement);
        } else {
            unlockedAchievements.forEach(achievement => {
                const achievementEl = document.createElement('div');
                achievementEl.className = 'achievement';
                achievementEl.innerHTML = `
                    <i class="${achievement.icon}"></i>
                    <span>${achievement.name}</span>
                `;
                achievementList.appendChild(achievementEl);
            });
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.roboQuizGame = new RoboQuizGame();
});