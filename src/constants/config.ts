import { Color } from 'excalibur';

const GAME_CONFIG = {
  width: 1368,
  height: 780,
  backgroundColor: Color.Black,
  gridSize: 80,
  pathBuffer: 40,
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
  containerId: 'ui-container',
  rootContainerId: 'game-root',
};

export default GAME_CONFIG;
