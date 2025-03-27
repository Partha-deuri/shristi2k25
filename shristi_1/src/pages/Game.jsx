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
                scale: {
                    mode: Phaser.Scale.RESIZE,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
            };

            // eslint-disable-next-line no-unused-vars
            let player, cursors, platforms, canJump, winZone, finishText;

            function preload() {
                // Load textures for platforms, player, sky, and ground
                this.load.image("platform", "/images/platform.png");
                this.load.image("player", "/images/mario.png");
                // this.load.image("sky", "/images/sky.png"); // Sky texture
                this.load.image("sky", "/images/Super_Mario_Clouds.gif"); // Sky texture
                this.load.image("ground", "/images/ground.png"); // Ground texture
            }

            function create() {
                // Add textured sky
                this.add
                    .tileSprite(0, 0, 4000, window.innerHeight, "sky")
                    .setOrigin(0, 0)
                    .setDisplaySize(4000, window.innerHeight); // Ensure sky takes up full height

                // Ground (Textured)
                platforms = this.physics.add.staticGroup();
                const ground = this.add.tileSprite(
                    window.innerWidth / 2,
                    window.innerHeight - 30,
                    window.innerWidth * 2, // Extend width to cover the entire game area
                    60,
                    "ground"
                );
                this.physics.add.existing(ground, true);
                platforms.add(ground);
                ground.setScrollFactor(0); // Make the ground sticky

                // Randomly generate platforms
                const platformCount = 12;
                for (let i = 0; i < platformCount; i++) {
                    const x = Phaser.Math.Between(200 + i * 300, 300 + i * 300); // Random x position
                    const y = Phaser.Math.Between(
                        100,
                        window.innerHeight - 200
                    ); // Random y position
                    const width = Phaser.Math.Between(150, 300); // Random width
                    const platform = this.add
                        .image(x, y, "platform")
                        .setDisplaySize(width, 20);
                    this.physics.add.existing(platform, true);
                    platforms.add(platform);
                }

                // Moving Platform
                const movingPlatform = this.add
                    .image(2500, 300, "platform")
                    .setDisplaySize(200, 20);
                this.physics.add.existing(movingPlatform, true);
                platforms.add(movingPlatform);
                this.tweens.add({
                    targets: movingPlatform.body,
                    y: 400,
                    duration: 2000,
                    yoyo: true,
                    repeat: -1,
                    ease: "Sine.easeInOut",
                });

                // Player (Textured)
                player = this.add
                    .image(100, window.innerHeight - 100, "player")
                    .setDisplaySize(40, 40);
                this.physics.add.existing(player);
                player.body.setBounce(0.2);
                player.body.setCollideWorldBounds(true);
                this.physics.add.collider(
                    player,
                    platforms,
                    () => (canJump = true)
                );

                // Win Zone (Last Platform with FINISH Text)
                winZone = this.add.rectangle(3800, 500, 200, 40, 0x000000);
                this.physics.add.existing(winZone, true);
                this.physics.add.overlap(player, winZone, () => {
                    setGameStatus("win");
                    setGameStarted(false);
                    gameInstance.destroy(true);
                    gameRef.current = null;
                });

                // "FINISH" text on the last platform
                finishText = this.add.text(3740, 480, "FINISH", {
                    font: "30px Arial",
                    fill: "#ffffff",
                    fontWeight: "bold",
                });

                // Enable world bounds movement
                this.cameras.main.setBounds(0, 0, 4000, window.innerHeight);
                this.physics.world.setBounds(0, 0, 4000, window.innerHeight);
                this.cameras.main.startFollow(player, true, 0.05, 0.05);

                // Keyboard controls
                cursors = this.input.keyboard.createCursorKeys();

                // Exit Button
                const exitButton = this.add
                    .text(window.innerWidth - 150, 20, "Exit", {
                        font: "24px Arial",
                        fill: "#fff",
                        backgroundColor: "#e63946",
                        padding: { x: 12, y: 6 },
                    })
                    .setInteractive({ useHandCursor: true }) // Set cursor to pointer
                    .on("pointerdown", () => {
                        setGameStarted(false);
                        gameInstance.destroy(true);
                        gameRef.current = null;
                    });

                exitButton.setScrollFactor(0); // Keep button in place when moving
                exitButton.setStyle({
                    backgroundColor:
                        "linear-gradient(to right, #e63946, #ff6b6b)", // Gradient background
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "12px", // Rounded corners
                    cursor: "pointer",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for better appearance
                });
            }

            function update() {
                if (cursors.left.isDown) {
                    player.body.setVelocityX(-200);
                    player.setFlipX(true); // Flip Mario when moving left
                } else if (cursors.right.isDown) {
                    player.body.setVelocityX(200);
                    player.setFlipX(false); // Reset flip when moving right
                } else {
                    player.body.setVelocityX(0);
                }

                if ((cursors.up.isDown || cursors.space.isDown) && canJump) {
                    player.body.setVelocityY(-550); // **Higher Jump**
                    canJump = false;
                }

                // Ensure player can jump only when touching ground or platforms
                if (player.body.touching.down) {
                    canJump = true;
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
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col">
            {/* Prevent Navbar Overlap */}
            <main className="flex-grow pt-16">
                {gameStatus === "gameover" && (
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6 text-red-500">
                            Game Over!
                        </h1>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xl font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
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
                    <div className="flex justify-center items-center h-screen">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-6 text-green-500">
                                You Won! 🎉🎉🎉{" "}
                            </h1>
                            <button
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xl font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
                                onClick={() => {
                                    setGameStatus("");
                                    setGameStarted(true);
                                }}
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {!gameStarted && gameStatus === "" && (
                    <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-game-image.jpg')]">
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
                        <div className="relative z-10 px-6 animate-fade-in">
                            <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                                Block Mario Game
                            </h1>
                            <p className="text-lg text-gray-400 mb-6">
                                Click below to play in fullscreen mode!
                            </p>
                            <button
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
                                onClick={() => setGameStarted(true)}
                            >
                                Play Now
                            </button>
                        </div>
                    </section>
                )}

                {gameStarted && (
                    <div
                        id="game-container"
                        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50"
                    ></div>
                )}
            </main>
        </div>
    );
};

export default Game;
