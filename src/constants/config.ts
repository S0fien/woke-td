import { Color } from 'excalibur';

const GAME_CONFIG = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Color.Blue,
  gridSize: 80, // Size of each grid cell
  pathPoints: [
    { x: 160, y: 0 },
    { x: 160, y: 425 },
    { x: 1300, y: 425 },
  ],
  pathBuffer: 30,
  maxWaves: 3,
  initialMoney: 500,
  initialLives: 10,
  baseEnemyCount: 3,
  baseEnemyHp: 20,
  enemyHpScaling: 10,
  enemyCountScaling: 2,
  waveDelay: 3000,
  updateInterval: 100,
  projectileSpeed: 300,
  enemySpeed: 100,
};

export default GAME_CONFIG;
