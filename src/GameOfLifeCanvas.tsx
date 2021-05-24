import React from 'react'
import GameOfLife from './GameOfLife'

interface GameOfLifeCanvasRendererProps {
    game: GameOfLife
}

export default class CanvasRenderer extends React.Component<GameOfLifeCanvasRendererProps, {}> {
    private game: GameOfLife
    readonly canvasRef: React.Ref<HTMLCanvasElement>
    // @ts-ignore
    private loop: NodeJS.Timeout
    readonly canvasSize: number

    componentDidMount() {
        this.loop = setInterval(() => {
            this.drawGrid();
            this.game.nextStage();
        }, 50)
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    drawGrid() {
        const cellSize = this.canvasSize / this.game.gridSize;

        // @ts-ignore
        const canvas = this.canvasRef?.current;
        const ctx = canvas.getContext('2d');
        // clear BG
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
        // draw individual living cells
        this.game.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell === 1) {
                    ctx.fillStyle = '#000'
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            })
        })
    }

    constructor(props: GameOfLifeCanvasRendererProps) {
        super(props)
        this.canvasSize = 500;
        this.game = props.game
        this.canvasRef = React.createRef()
    }

    render() {
        return (
            <canvas width={this.canvasSize} height={this.canvasSize} ref={this.canvasRef} />
        )
    }

}
