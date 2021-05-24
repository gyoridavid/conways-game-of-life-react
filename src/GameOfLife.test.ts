import GameOfLife from './GameOfLife'
import SeedRandom from 'seed-random'
import Random from 'random'

/**
 * [
 [0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
 [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
 [1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
 [1, 0, 1, 1, 0, 0, 1, 1, 1, 0],
 [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
 [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
 [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
 [1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
 [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]
 ]
 *
 */

test('test GameOfLife initialization', () => {
    const game = new GameOfLife(10);
    expect(game.grid.length).toBe(10);
});

test('test GameOfLife random init item generation', () => {
    // @ts-ignore
    Random.use(SeedRandom('Laci'))
    const game = new GameOfLife(10);
    let countItem = 0;
    game.grid.forEach(function(row) {
        row.forEach(function(item) {
           countItem += item === 1 ? 1 : 0;
        });
    });
    expect(countItem > 0).toBe(true);
    expect(game.grid[0][1]).toBe(1)
});

test('should return the correct number of neighbors for cell', () => {
    // @ts-ignore
    Random.use(SeedRandom('Laci'))
    const game = new GameOfLife(10);
    expect(game.numberOfLivingNeighborsForCell(1, 5)).toBe(2);
    expect(game.numberOfLivingNeighborsForCell(2, 5)).toBe(4);
});

test('cell should be alive after first round', () => {
    // @ts-ignore
    Random.use(SeedRandom('Laci'))
    const game = new GameOfLife(10);
    expect(game.shouldLive(1, 5)).toBe(true);
});

test('cell should be dead after first round', () => {
    // @ts-ignore
    Random.use(SeedRandom('Laci'))
    const game = new GameOfLife(10);
    expect(game.shouldLive(2, 5)).toBe(false);
});

test('cell in next stage should be correct', () => {
    // @ts-ignore
    Random.use(SeedRandom('Laci'))
    const game = new GameOfLife(10);
    game.nextStage()
    expect(game.grid[3][8]).toBe(1)
})
