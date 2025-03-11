import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

const Game = () => {
  const gameRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState(""); // "win" or "gameover"

  useEffect(() => {
    let gameInstance = null;

    if (gameStarted) {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game-container",
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 900 }, debug: false },
        },
        scene: { preload, create, update },
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
      };

      // eslint-disable-next-line no-unused-vars
      let player, cursors, platforms, canJump, winZone, finishText;

      function preload() {
        // No images needed since we are using blocks
      }

      function create() {
        this.cameras.main.setBackgroundColor("#87CEEB"); // Light blue sky

        // Ground (Green Grass)
        platforms = this.physics.add.staticGroup();
        const ground = this.add.rectangle(window.innerWidth / 2, window.innerHeight - 30, window.innerWidth, 60, 0x228b22);
        this.physics.add.existing(ground, true);
        platforms.add(ground);

        // Platforms (Black)
        const levelPlatforms = [
          { x: 200, y: 550, width: 200 },
          { x: 500, y: 480, width: 250 },
          { x: 800, y: 400, width: 200 },
          { x: 1100, y: 320, width: 250 },
          { x: 1400, y: 250, width: 200 },
          { x: 1700, y: 180, width: 250 },
          { x: 2000, y: 120, width: 200 }, // Final platform
        ];

        levelPlatforms.forEach(({ x, y, width }) => {
          const platform = this.add.rectangle(x, y, width, 20, 0x000000);
          this.physics.add.existing(platform, true);
          platforms.add(platform);
        });

        // Player (Mario block)
        player = this.add.rectangle(100, window.innerHeight - 100, 40, 40, 0xff0000);
        this.physics.add.existing(player);
        player.body.setBounce(0.2);
        player.body.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms, () => (canJump = true));

        // Win Zone (Last Platform with FINISH Text)
        winZone = this.add.rectangle(2000, 80, 200, 40, 0x000000);
        this.physics.add.existing(winZone, true);
        this.physics.add.overlap(player, winZone, () => {
          setGameStatus("win");
          setGameStarted(false);
          gameInstance.destroy(true);
          gameRef.current = null;
        });

        // "FINISH" text on the last platform
        finishText = this.add.text(1940, 60, "FINISH", {
          font: "30px Arial",
          fill: "#ffffff",
          fontWeight: "bold",
        });

        // Enable world bounds movement
        this.cameras.main.setBounds(0, 0, 2200, window.innerHeight);
        this.physics.world.setBounds(0, 0, 2200, window.innerHeight);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        // Keyboard controls
        cursors = this.input.keyboard.createCursorKeys();

        // Exit Button
        const exitButton = this.add
          .text(window.innerWidth - 100, 20, "Exit", {
            font: "24px Arial",
            fill: "#fff",
            backgroundColor: "#e63946",
            padding: { x: 12, y: 6 },
          })
          .setInteractive()
          .on("pointerdown", () => {
            setGameStarted(false);
            gameInstance.destroy(true);
            gameRef.current = null;
          });

        exitButton.setScrollFactor(0); // Keep button in place when moving
      }

      function update() {
        if (cursors.left.isDown) {
          player.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
          player.body.setVelocityX(200);
        } else {
          player.body.setVelocityX(0);
        }

        if ((cursors.up.isDown || cursors.space.isDown) && canJump) {
          player.body.setVelocityY(-550); // **Higher Jump**
          canJump = false;
        }

        // Game Over if player falls below ground level
        if (player.y > window.innerHeight) {
          setGameStatus("gameover");
          setGameStarted(false);
          gameInstance.destroy(true);
          gameRef.current = null;
        }
      }

      gameInstance = new Phaser.Game(config);
      gameRef.current = gameInstance;

      return () => {
        gameInstance.destroy(true);
        gameRef.current = null;
      };
    }
  }, [gameStarted]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      {gameStatus === "gameover" && (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-red-500">Game Over!</h1>
          <button
            className="px-6 py-3 bg-red-600 text-white text-xl font-semibold rounded-lg hover:bg-red-500 transition"
            onClick={() => {
              setGameStatus("");
              setGameStarted(true);
            }}
          >
            Restart Game
          </button>
        </div>
      )}

      {gameStatus === "win" && (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-green-500">You Won! 🎉</h1>
          <button
            className="px-6 py-3 bg-green-600 text-white text-xl font-semibold rounded-lg hover:bg-green-500 transition"
            onClick={() => {
              setGameStatus("");
              setGameStarted(true);
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {!gameStarted && gameStatus === "" && (
        <>
          <h1 className="text-5xl font-bold mb-6">Block Mario Game</h1>
          <p className="text-lg text-gray-400 mb-6">Click below to play in fullscreen mode!</p>
          <button
            className="px-6 py-3 bg-red-600 text-white text-xl font-semibold rounded-lg hover:bg-red-500 transition"
            onClick={() => setGameStarted(true)}
          >
            Play Now
          </button>
        </>
      )}

      {gameStarted && <div id="game-container" className="fixed inset-0 bg-black z-50"></div>}
    </div>
  );
};

export default Game;
