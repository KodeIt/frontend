export const getPointsToNextLevel = (currentLevel: number, points: number) => {
    let start = 10;
    for (let a = 0; a < currentLevel; a++) {
        start += start * 2;
    }
    return start;
}