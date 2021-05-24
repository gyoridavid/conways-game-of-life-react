import Random from 'random'

export default class GameOfLife {

    public grid: Array<Array<number>>;
    public gridSize: number;

    constructor(gridSize: number) {
        this.gridSize = gridSize;
        this.grid = [];
        for( let i = 0 ; i < gridSize; ++i ) {
            let tempArr: Array<number> = [];
            for( let j = 0 ; j < gridSize; ++j ) {
                tempArr.push(Random.int(0, 1));
            }
            this.grid.push(tempArr);
        }

    }

    numberOfLivingNeighborsForCell(x: number, y: number): number {
        let counter:number = 0;
        for( let i = Math.max( x - 1, 0 ) ; i <= Math.min( x + 1, this.grid.length-1) ; i++ ) {
            for (  let j = Math.max( y - 1, 0 ) ; j <= Math.min( y + 1, this.grid[i].length-1) ; j++ ) {
                if( !( i === x && j === y ) ) {
                    counter += this.grid[i][j];
                }
            }
        }
        return counter;
    }

    shouldLive(x: number, y: number): boolean {
        const cell = this.grid[x][y];
        const neighbors = this.numberOfLivingNeighborsForCell(x, y);
        if (cell === 1 && neighbors > 1 && neighbors < 4) {
            return true
        }
        return cell === 0 && neighbors === 3;
    }

    nextStage(): void {
        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                this.grid[x][y] = this.shouldLive(x,y) ? 1 : 0;
            });
        });
    }

}
