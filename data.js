// RoboQuiz Adventure - Game Data

// Countries and Capitals with Flag Emojis (100 most common countries)
const countriesData = [
    { country: "United States", capital: "Washington D.C.", flag: "🇺🇸" },
    { country: "United Kingdom", capital: "London", flag: "🇬🇧" },
    { country: "France", capital: "Paris", flag: "🇫🇷" },
    { country: "Germany", capital: "Berlin", flag: "🇩🇪" },
    { country: "Italy", capital: "Rome", flag: "🇮🇹" },
    { country: "Spain", capital: "Madrid", flag: "🇪🇸" },
    { country: "Canada", capital: "Ottawa", flag: "🇨🇦" },
    { country: "Australia", capital: "Canberra", flag: "🇦🇺" },
    { country: "Japan", capital: "Tokyo", flag: "🇯🇵" },
    { country: "China", capital: "Beijing", flag: "🇨🇳" },
    { country: "India", capital: "New Delhi", flag: "🇮🇳" },
    { country: "Brazil", capital: "Brasília", flag: "🇧🇷" },
    { country: "Mexico", capital: "Mexico City", flag: "🇲🇽" },
    { country: "Russia", capital: "Moscow", flag: "🇷🇺" },
    { country: "South Korea", capital: "Seoul", flag: "🇰🇷" },
    { country: "Netherlands", capital: "Amsterdam", flag: "🇳🇱" },
    { country: "Belgium", capital: "Brussels", flag: "🇧🇪" },
    { country: "Switzerland", capital: "Bern", flag: "🇨🇭" },
    { country: "Austria", capital: "Vienna", flag: "🇦🇹" },
    { country: "Sweden", capital: "Stockholm", flag: "🇸🇪" },
    { country: "Norway", capital: "Oslo", flag: "🇳🇴" },
    { country: "Denmark", capital: "Copenhagen", flag: "🇩🇰" },
    { country: "Finland", capital: "Helsinki", flag: "🇫🇮" },
    { country: "Poland", capital: "Warsaw", flag: "🇵🇱" },
    { country: "Czech Republic", capital: "Prague", flag: "🇨🇿" },
    { country: "Hungary", capital: "Budapest", flag: "🇭🇺" },
    { country: "Portugal", capital: "Lisbon", flag: "🇵🇹" },
    { country: "Greece", capital: "Athens", flag: "🇬🇷" },
    { country: "Turkey", capital: "Ankara", flag: "🇹🇷" },
    { country: "Israel", capital: "Jerusalem", flag: "🇮🇱" },
    { country: "Egypt", capital: "Cairo", flag: "🇪🇬" },
    { country: "South Africa", capital: "Cape Town", flag: "🇿🇦" },
    { country: "Nigeria", capital: "Abuja", flag: "🇳🇬" },
    { country: "Kenya", capital: "Nairobi", flag: "🇰🇪" },
    { country: "Morocco", capital: "Rabat", flag: "🇲🇦" },
    { country: "Algeria", capital: "Algiers", flag: "🇩🇿" },
    { country: "Tunisia", capital: "Tunis", flag: "🇹🇳" },
    { country: "Libya", capital: "Tripoli", flag: "🇱🇾" },
    { country: "Ethiopia", capital: "Addis Ababa", flag: "🇪🇹" },
    { country: "Ghana", capital: "Accra", flag: "🇬🇭" },
    { country: "Argentina", capital: "Buenos Aires", flag: "🇦🇷" },
    { country: "Chile", capital: "Santiago", flag: "🇨🇱" },
    { country: "Peru", capital: "Lima", flag: "🇵🇪" },
    { country: "Colombia", capital: "Bogotá", flag: "🇨🇴" },
    { country: "Venezuela", capital: "Caracas", flag: "🇻🇪" },
    { country: "Ecuador", capital: "Quito", flag: "🇪🇨" },
    { country: "Bolivia", capital: "Sucre", flag: "🇧🇴" },
    { country: "Uruguay", capital: "Montevideo", flag: "🇺🇾" },
    { country: "Paraguay", capital: "Asunción", flag: "🇵🇾" },
    { country: "Thailand", capital: "Bangkok", flag: "🇹🇭" },
    { country: "Vietnam", capital: "Hanoi", flag: "🇻🇳" },
    { country: "Malaysia", capital: "Kuala Lumpur", flag: "🇲🇾" },
    { country: "Singapore", capital: "Singapore", flag: "🇸🇬" },
    { country: "Indonesia", capital: "Jakarta", flag: "🇮🇩" },
    { country: "Philippines", capital: "Manila", flag: "🇵🇭" },
    { country: "Myanmar", capital: "Naypyidaw", flag: "🇲🇲" },
    { country: "Cambodia", capital: "Phnom Penh", flag: "🇰🇭" },
    { country: "Laos", capital: "Vientiane", flag: "🇱🇦" },
    { country: "Bangladesh", capital: "Dhaka", flag: "🇧🇩" },
    { country: "Pakistan", capital: "Islamabad", flag: "🇵🇰" },
    { country: "Afghanistan", capital: "Kabul", flag: "🇦🇫" },
    { country: "Iran", capital: "Tehran", flag: "🇮🇷" },
    { country: "Iraq", capital: "Baghdad", flag: "🇮🇶" },
    { country: "Saudi Arabia", capital: "Riyadh", flag: "🇸🇦" },
    { country: "United Arab Emirates", capital: "Abu Dhabi", flag: "🇦🇪" },
    { country: "Qatar", capital: "Doha", flag: "🇶🇦" },
    { country: "Kuwait", capital: "Kuwait City", flag: "🇰🇼" },
    { country: "Bahrain", capital: "Manama", flag: "🇧🇭" },
    { country: "Oman", capital: "Muscat", flag: "🇴🇲" },
    { country: "Yemen", capital: "Sana'a", flag: "🇾🇪" },
    { country: "Jordan", capital: "Amman", flag: "🇯🇴" },
    { country: "Lebanon", capital: "Beirut", flag: "🇱🇧" },
    { country: "Syria", capital: "Damascus", flag: "🇸🇾" },
    { country: "Cyprus", capital: "Nicosia", flag: "🇨🇾" },
    { country: "Romania", capital: "Bucharest", flag: "🇷🇴" },
    { country: "Bulgaria", capital: "Sofia", flag: "🇧🇬" },
    { country: "Serbia", capital: "Belgrade", flag: "🇷🇸" },
    { country: "Croatia", capital: "Zagreb", flag: "🇭🇷" },
    { country: "Bosnia and Herzegovina", capital: "Sarajevo", flag: "🇧🇦" },
    { country: "Montenegro", capital: "Podgorica", flag: "🇲🇪" },
    { country: "North Macedonia", capital: "Skopje", flag: "🇲🇰" },
    { country: "Albania", capital: "Tirana", flag: "🇦🇱" },
    { country: "Slovenia", capital: "Ljubljana", flag: "🇸🇮" },
    { country: "Slovakia", capital: "Bratislava", flag: "🇸🇰" },
    { country: "Lithuania", capital: "Vilnius", flag: "🇱🇹" },
    { country: "Latvia", capital: "Riga", flag: "🇱🇻" },
    { country: "Estonia", capital: "Tallinn", flag: "🇪🇪" },
    { country: "Belarus", capital: "Minsk", flag: "🇧🇾" },
    { country: "Ukraine", capital: "Kyiv", flag: "🇺🇦" },
    { country: "Moldova", capital: "Chișinău", flag: "🇲🇩" },
    { country: "Georgia", capital: "Tbilisi", flag: "🇬🇪" },
    { country: "Armenia", capital: "Yerevan", flag: "🇦🇲" },
    { country: "Azerbaijan", capital: "Baku", flag: "🇦🇿" },
    { country: "Kazakhstan", capital: "Nur-Sultan", flag: "🇰🇿" },
    { country: "Uzbekistan", capital: "Tashkent", flag: "🇺🇿" },
    { country: "Kyrgyzstan", capital: "Bishkek", flag: "🇰🇬" },
    { country: "Tajikistan", capital: "Dushanbe", flag: "🇹🇯" },
    { country: "Turkmenistan", capital: "Ashgabat", flag: "🇹🇲" },
    { country: "Mongolia", capital: "Ulaanbaatar", flag: "🇲🇳" },
    { country: "North Korea", capital: "Pyongyang", flag: "🇰🇵" },
    { country: "Sri Lanka", capital: "Colombo", flag: "🇱🇰" },
    { country: "Nepal", capital: "Kathmandu", flag: "🇳🇵" },
    { country: "Bhutan", capital: "Thimphu", flag: "🇧🇹" },
    { country: "Maldives", capital: "Malé", flag: "🇲🇻" },
    { country: "New Zealand", capital: "Wellington", flag: "🇳🇿" }
];

// Car Models and Makers (100 popular car models)
const carsData = [
    { model: "Mustang", maker: "Ford" },
    { model: "Camaro", maker: "Chevrolet" },
    { model: "Corvette", maker: "Chevrolet" },
    { model: "Challenger", maker: "Dodge" },
    { model: "Charger", maker: "Dodge" },
    { model: "Ram 1500", maker: "Ram" },
    { model: "F-150", maker: "Ford" },
    { model: "Silverado", maker: "Chevrolet" },
    { model: "Accord", maker: "Honda" },
    { model: "Civic", maker: "Honda" },
    { model: "CR-V", maker: "Honda" },
    { model: "Pilot", maker: "Honda" },
    { model: "Odyssey", maker: "Honda" },
    { model: "Camry", maker: "Toyota" },
    { model: "Corolla", maker: "Toyota" },
    { model: "RAV4", maker: "Toyota" },
    { model: "Highlander", maker: "Toyota" },
    { model: "Prius", maker: "Toyota" },
    { model: "Sienna", maker: "Toyota" },
    { model: "Altima", maker: "Nissan" },
    { model: "Sentra", maker: "Nissan" },
    { model: "Rogue", maker: "Nissan" },
    { model: "Murano", maker: "Nissan" },
    { model: "Pathfinder", maker: "Nissan" },
    { model: "370Z", maker: "Nissan" },
    { model: "GT-R", maker: "Nissan" },
    { model: "Elantra", maker: "Hyundai" },
    { model: "Sonata", maker: "Hyundai" },
    { model: "Tucson", maker: "Hyundai" },
    { model: "Santa Fe", maker: "Hyundai" },
    { model: "Genesis", maker: "Hyundai" },
    { model: "Optima", maker: "Kia" },
    { model: "Soul", maker: "Kia" },
    { model: "Sorento", maker: "Kia" },
    { model: "Sportage", maker: "Kia" },
    { model: "Stinger", maker: "Kia" },
    { model: "3 Series", maker: "BMW" },
    { model: "5 Series", maker: "BMW" },
    { model: "X3", maker: "BMW" },
    { model: "X5", maker: "BMW" },
    { model: "M3", maker: "BMW" },
    { model: "C-Class", maker: "Mercedes-Benz" },
    { model: "E-Class", maker: "Mercedes-Benz" },
    { model: "S-Class", maker: "Mercedes-Benz" },
    { model: "GLC", maker: "Mercedes-Benz" },
    { model: "GLE", maker: "Mercedes-Benz" },
    { model: "A4", maker: "Audi" },
    { model: "A6", maker: "Audi" },
    { model: "Q5", maker: "Audi" },
    { model: "Q7", maker: "Audi" },
    { model: "TT", maker: "Audi" },
    { model: "911", maker: "Porsche" },
    { model: "Cayenne", maker: "Porsche" },
    { model: "Macan", maker: "Porsche" },
    { model: "Panamera", maker: "Porsche" },
    { model: "Golf", maker: "Volkswagen" },
    { model: "Jetta", maker: "Volkswagen" },
    { model: "Passat", maker: "Volkswagen" },
    { model: "Tiguan", maker: "Volkswagen" },
    { model: "Atlas", maker: "Volkswagen" },
    { model: "Wrangler", maker: "Jeep" },
    { model: "Grand Cherokee", maker: "Jeep" },
    { model: "Compass", maker: "Jeep" },
    { model: "Renegade", maker: "Jeep" },
    { model: "Cherokee", maker: "Jeep" },
    { model: "Escalade", maker: "Cadillac" },
    { model: "XT5", maker: "Cadillac" },
    { model: "CTS", maker: "Cadillac" },
    { model: "ATS", maker: "Cadillac" },
    { model: "Navigator", maker: "Lincoln" },
    { model: "MKZ", maker: "Lincoln" },
    { model: "Continental", maker: "Lincoln" },
    { model: "Enclave", maker: "Buick" },
    { model: "Encore", maker: "Buick" },
    { model: "LaCrosse", maker: "Buick" },
    { model: "Terrain", maker: "GMC" },
    { model: "Acadia", maker: "GMC" },
    { model: "Sierra", maker: "GMC" },
    { model: "Yukon", maker: "GMC" },
    { model: "Impreza", maker: "Subaru" },
    { model: "Outback", maker: "Subaru" },
    { model: "Forester", maker: "Subaru" },
    { model: "Legacy", maker: "Subaru" },
    { model: "WRX", maker: "Subaru" },
    { model: "Lancer", maker: "Mitsubishi" },
    { model: "Outlander", maker: "Mitsubishi" },
    { model: "Eclipse", maker: "Mitsubishi" },
    { model: "Model S", maker: "Tesla" },
    { model: "Model 3", maker: "Tesla" },
    { model: "Model X", maker: "Tesla" },
    { model: "Model Y", maker: "Tesla" },
    { model: "Roadster", maker: "Tesla" },
    { model: "Continental GT", maker: "Bentley" },
    { model: "Bentayga", maker: "Bentley" },
    { model: "Flying Spur", maker: "Bentley" },
    { model: "Ghost", maker: "Rolls-Royce" },
    { model: "Phantom", maker: "Rolls-Royce" },
    { model: "Wraith", maker: "Rolls-Royce" },
    { model: "Cullinan", maker: "Rolls-Royce" },
    { model: "Vantage", maker: "Aston Martin" },
    { model: "DB11", maker: "Aston Martin" },
    { model: "DBS", maker: "Aston Martin" },
    { model: "488 GTB", maker: "Ferrari" },
    { model: "F8 Tributo", maker: "Ferrari" },
    { model: "Roma", maker: "Ferrari" },
    { model: "SF90 Stradale", maker: "Ferrari" },
    { model: "Huracán", maker: "Lamborghini" },
    { model: "Aventador", maker: "Lamborghini" },
    { model: "Urus", maker: "Lamborghini" }
];

// Achievement definitions
const achievements = [
    {
        id: 'first_quiz',
        name: 'Getting Started',
        description: 'Complete your first quiz!',
        icon: 'fas fa-play',
        points: 50,
        unlocked: false
    },
    {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Get 100% on a quiz!',
        icon: 'fas fa-star',
        points: 100,
        unlocked: false
    },
    {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Answer 5 questions in under 10 seconds each!',
        icon: 'fas fa-bolt',
        points: 75,
        unlocked: false
    },
    {
        id: 'geography_master',
        name: 'Geography Master',
        description: 'Complete 3 full geography quizzes!',
        icon: 'fas fa-globe',
        points: 200,
        unlocked: false
    },
    {
        id: 'car_expert',
        name: 'Car Expert',
        description: 'Complete 3 full car quizzes!',
        icon: 'fas fa-car',
        points: 200,
        unlocked: false
    },
    {
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Get a 25-question streak!',
        icon: 'fas fa-fire',
        points: 150,
        unlocked: false
    },
    {
        id: 'level_5',
        name: 'Rising Star',
        description: 'Reach level 5!',
        icon: 'fas fa-arrow-up',
        points: 250,
        unlocked: false
    },
    {
        id: 'level_10',
        name: 'Expert Explorer',
        description: 'Reach level 10!',
        icon: 'fas fa-trophy',
        points: 500,
        unlocked: false
    },
    {
        id: 'thousand_points',
        name: 'Point Collector',
        description: 'Earn 1000 total points!',
        icon: 'fas fa-coins',
        points: 100,
        unlocked: false
    },
    {
        id: 'flag_master',
        name: 'Flag Master',
        description: 'Correctly identify 50 flags!',
        icon: 'fas fa-flag',
        points: 300,
        unlocked: false
    },
    {
        id: 'world_explorer',
        name: 'World Explorer',
        description: 'Complete a full geography quiz (100 questions)!',
        icon: 'fas fa-globe-americas',
        points: 500,
        unlocked: false
    },
    {
        id: 'auto_enthusiast',
        name: 'Auto Enthusiast',
        description: 'Complete a full car quiz (100 questions)!',
        icon: 'fas fa-car-side',
        points: 500,
        unlocked: false
    },
    {
        id: 'perfect_century',
        name: 'Perfect Century',
        description: 'Get 100% on a full 100-question quiz!',
        icon: 'fas fa-medal',
        points: 1000,
        unlocked: false
    },
    {
        id: 'endurance_champion',
        name: 'Endurance Champion',
        description: 'Complete 5 full quizzes!',
        icon: 'fas fa-running',
        points: 750,
        unlocked: false
    }
];

// Level progression data (adjusted for full 100-question quizzes)
const levelData = {
    1: { xpRequired: 500, reward: 'Basic Explorer Badge' },
    2: { xpRequired: 1200, reward: 'Geography Novice Badge' },
    3: { xpRequired: 2100, reward: 'World Traveler Badge' },
    4: { xpRequired: 3200, reward: 'Culture Explorer Badge' },
    5: { xpRequired: 4500, reward: 'Continental Expert Badge' },
    6: { xpRequired: 6000, reward: 'Global Navigator Badge' },
    7: { xpRequired: 7700, reward: 'Master Explorer Badge' },
    8: { xpRequired: 9600, reward: 'World Scholar Badge' },
    9: { xpRequired: 11700, reward: 'Geographic Genius Badge' },
    10: { xpRequired: 14000, reward: 'Ultimate Explorer Badge' }
};

// Difficulty settings for different levels (optimized for deployment)
const difficultySettings = {
    easy: {
        timeLimit: 30,
        questionsPerQuiz: 20, // Reduced for faster deployment
        pointsPerCorrect: 20,
        hintCost: 5
    },
    medium: {
        timeLimit: 25,
        questionsPerQuiz: 30, // Reduced for faster deployment
        pointsPerCorrect: 30,
        hintCost: 10
    },
    hard: {
        timeLimit: 20,
        questionsPerQuiz: 50, // Reduced for faster deployment
        pointsPerCorrect: 50,
        hintCost: 15
    }
};

// Utility functions
function getRandomItems(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getCurrentDifficulty(level) {
    if (level <= 3) return 'easy';
    if (level <= 6) return 'medium';
    return 'hard';
}

function getXPForLevel(level) {
    return levelData[level] ? levelData[level].xpRequired : 14000;
}

function getLevelFromXP(totalXP) {
    for (let level = 1; level <= 10; level++) {
        if (totalXP < getXPForLevel(level)) {
            return level - 1 || 1;
        }
    }
    return 10;
}

// Export data for use in game.js
window.gameData = {
    countriesData,
    carsData,
    achievements,
    levelData,
    difficultySettings,
    getRandomItems,
    shuffleArray,
    getCurrentDifficulty,
    getXPForLevel,
    getLevelFromXP
};