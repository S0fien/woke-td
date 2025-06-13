import { Color } from 'excalibur';

const GAME_CONFIG = {
  width: 1280,
  height: 960,
  backgroundColor: Color.Black,
  gridSize: 80, // Size of each grid cell
  pathPoints: [
    { x: 160, y: 0 },
    { x: 160, y: 425 },
    { x: window.innerWidth + 100, y: 425 },
  ],
  pathBuffer: 30,
  maxWaves: 3,
  initialMoney: 100,
  initialLives: 3,
  baseEnemyCount: 5,
  baseEnemyHp: 30,
  enemyHpScaling: 10,
  enemyCountScaling: 2,
  waveDelay: 1000,
  updateInterval: 100,
  projectileSpeed: 300,
  enemySpeed: 100,
};

export default GAME_CONFIG;
