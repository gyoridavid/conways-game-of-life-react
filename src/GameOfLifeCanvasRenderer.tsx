import React, { useRef, useEffect } from 'react'
import GameOfLife from './GameOfLife'

interface GameOfLifeCanvasRendererProps {
    game: GameOfLife
}

const GameOfLifeCanvasRenderer = ({ game }: GameOfLifeCanvasRendererProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasSize = 500;

    useEffect(() => {
        const drawGrid = () => {
            if (!canvasRef || !canvasRef.current) {
                return;
            }
            const cellSize = canvasSize / game.gridSize;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return;
            }

            // clear BG
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvasSize, canvasSize);
            // draw individual living cells
            game.grid.forEach((row, x) => {
                row.forEach((cell, y) => {
                    if (cell === 1) {
                        ctx.fillStyle = '#000'
                        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    }
                })
            })
        }

        const drawInterval = setInterval(() => {
            drawGrid();
            game.nextStage();
        }, 50)

        return () => {
            clearInterval(drawInterval);
        }
    }, [game])

    return (
        <canvas width={canvasSize} height={canvasSize} ref={canvasRef} />
    )
}

export default GameOfLifeCanvasRenderer;
