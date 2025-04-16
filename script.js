// set up canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const width = 500;
const height = 500;
const gridSize = 10;
const cellSize = width / gridSize;

// load images
const deityImages = {
  "pomba gira": "assets/pombagira.png",
  "erzuli freda": "assets/erzulifreda.png",
  "erzuli danto": "assets/erzulidanto.png",
  "oshun": "assets/oshun.png",
  "kyra": "assets/me.jpg",
};

// load cowry shell image
const cowryShellImg = new Image();
cowryShellImg.src = "assets/cowry_shell.png";

// acceptd deities list
const acceptedDeities = Object.keys(deityImages);

// game state variables
let chosenDeity = null;
let questionAsked = false;
let positions = [];

// show initial greeting message
function greeting() {
  alert("Click OK to view the pantheon!);
}

// draws a 10x10 grid on the canvas
function drawGrid() {
  ctx.strokeStyle = "black";
  for (let x = 0; x <= width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
}

// generates 16 random unique random positions onthe grid
function generateRandomPosition() {
  const pos = new Set();
  while (pos.size < 16) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    pos.add(`${x},${y}`);
  }
  return Array.from(pos).map(p => p.spit(',').map(Number));
}

// draws cowry shells at specified grid positions
function drawShells(positions) {
  for (let [x, y] of positions {
    ctx.drawImage(cowryShellImg, x * cellSize + 2, y * cellSize + 2, cellSize -5, cellSize -5);
  }
}

// draws deity icons on the canvas in a grid layout
function drawPantheon() {
  let i = 0;
  for (let deity in deityImages) {
    const img = new Image();
    img.src = deityImages[deity];
    const x = (i % 2) * 400;
    const y = Math.floor(i / 2) * 200;
    img.onload = () => ctx.drawImage(img, x, y, 100, 100);
    i++;
  }
}

// main game interaction triggered by user clicking canvas
canvas.addEventListener("click", () => {
  if (!questionAsked) {
    greeting();
    ctx.clearRect(0, 0, width, height); // clear canvas
    drawPantheon(); // show deities

    // prompt user to choose a deity
    chosenDeity = prompt("Which deity would you like to convene with through divination?").toLowerCase();
    if (!acceptedDeities.includes(chosenDeity)) {
      alert("Invalid choice. Try again.");
      return;
    }

    // proceed to divination
    alert("Click OK to divine.");
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    positions = generateRandomPositions();
    drawShells(positions);

    // prompt user for an offering
    const offering = prompt(`Congratulations! ${chosenDeity.toUpperCase()} would like to speak with you. What will you offer them?`).toLowerCase();

    // define accepted offerings for each deity
    const offerings = {
      "pomba gira": ["red candles", "roses", "perfume", "cosmetics", "champagne"],
      "erzuli freda": ["fine items", "makeup", "perfume", "sweets", "fans"],
      "erzuli danto": ["hot fruits", "fried pork", "red wine", "reve d'or perfume", "chodye"],
      "oshun": ["honey", "pumpkin", "peacock", "vulture", "sunflower"],
      "kyra": ["fresh fruits", "flowers", "good luck charms", "perfume", "champagne"]
    };

    // check if offering is accepted
    if (offerings[chosenDeity].includes(offering)) {
      alert(`Congratulations! ${chosenDeity.toUpperCase()} accepted your offering. Game complete.`);
    } else {
      alert(`Hmmm... ${chosenDeity.toUpperCase()} is not pleased with that offering. Try again next time.`);
    }

    questionAsked = true;
  }
});
