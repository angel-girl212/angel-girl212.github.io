window.onload = function() {
  // Set up canvas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const width = 500;
  const height = 500;
  const gridSize = 10;
  const cellSize = width / gridSize;

  // Load deity images
  const deityImages = {
    "pomba gira": "assets/pombagira.png",
    "erzuli freda": "assets/erzulifreda.png",
    "erzuli danto": "assets/erzulidanto.png",
    "oshun": "assets/oshun.png",
    "kyra": "assets/me.jpg",
  };

  // Load cowry shell image
  const cowryShellImg = new Image();
  cowryShellImg.src = "assets/cowry_shell.png";

  // Accepted deities list
  const acceptedDeities = Object.keys(deityImages);

  // Game state variables
  let chosenDeity = null;
  let questionAsked = false;
  let positions = [];

  // Show initial greeting message
  function greeting() {
    alert("Click OK to view the pantheon!");
  }

  // Draws a 10x10 grid on the canvas
  function drawGrid() {
    ctx.strokeStyle = "black";
    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Generates 16 unique random positions on the grid
  function generateRandomPositions() {
    const pos = new Set();
    while (pos.size < 16) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      pos.add(`${x},${y}`);
    }
    return Array.from(pos).map(p => p.split(',').map(Number));
  }

  // Draws cowry shells at specified grid positions
  function drawShells(positions) {
    for (let [x, y] of positions) {
      ctx.drawImage(cowryShellImg, x * cellSize + 2, y * cellSize + 2, cellSize - 5, cellSize - 5);
    }
  }

  // Draws deity icons on the canvas
  function drawPantheon() {
    let loadedcount = 0;
    const totalDeities = Object.keys(deityImages).length;
    
    for (let deity in deityImages) {
      const img = new Image();
      img.src = deityImages[deity];
      img.onload = () => {
        const i = Object.keys(deityImages).indexOf(deity);
        const x = (i % 2) * 200;
        const y = Math.floor(i / 2) * 200;
      ctx.drawImage(img, x, y, 100, 100);
      
      loadedCount++;
      };
    }
  }

  // Main game interaction
  canvas.addEventListener("click", () => {
    if (!questionAsked) {
      greeting();
      ctx.clearRect(0, 0, width, height);
      drawPantheon();

      chosenDeity = prompt("Which deity would you like to convene with through divination?")?.toLowerCase();
      if (!acceptedDeities.includes(chosenDeity)) {
        alert("Invalid choice. Try again.");
        return;
      }

      alert("Click OK to divine.");
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      positions = generateRandomPositions();
      drawShells(positions);

      const offering = prompt(`Congratulations! ${chosenDeity.toUpperCase()} would like to speak with you. What will you offer them?`)?.toLowerCase();

      const offerings = {
        "pomba gira": ["red candles", "roses", "perfume", "cosmetics", "champagne"],
        "erzuli freda": ["fine items", "makeup", "perfume", "sweets", "fans"],
        "erzuli danto": ["hot fruits", "fried pork", "red wine", "reve d'or perfume", "chodye"],
        "oshun": ["honey", "pumpkin", "peacock", "vulture", "sunflower"],
        "kyra": ["fresh fruits", "flowers", "good luck charms", "perfume", "champagne"]
      };

      if (offerings[chosenDeity].includes(offering)) {
        alert(`Congratulations! ${chosenDeity.toUpperCase()} accepted your offering. Game complete.`);
      } else {
        alert(`${chosenDeity.toUpperCase()} is not pleased with that offering. Try again next time.`);
      }

      questionAsked = true;
    }
  });
};
