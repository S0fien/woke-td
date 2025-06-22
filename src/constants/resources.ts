import { Cloudinary } from '@cloudinary/url-gen';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Gif, ImageSource, Sound } from 'excalibur';
import { API_KEY, API_SECRET } from './secrets.ts';
const client = new Cloudinary({
  cloud: {
    cloudName: 'djaxek6tl',
    apiKey: API_KEY,
    apiSecret: API_SECRET,
  },
});

const RESOURCES = {
  towers: {
    trumpTower: new ImageSource(client.image('trump-tower').toURL()),
    church: new ImageSource(client.image('church').toURL()),
  },
  maps: {
    nice: new ImageSource(client.image('nice-map').toURL()),
    simple: new ImageSource(client.image('map-bg').toURL()),
    begin: new ImageSource(client.image('map-intro').toURL()),
    tiled: new TiledResource('tile.tmx'),
  },
  backgrounds: {
    test: new ImageSource(client.image('menu-bg').toURL()),
    forest: new ImageSource(client.image('forest').toURL()),
    menu: new ImageSource(client.image('main-menu').toURL()),
    bar: new ImageSource(client.image('bar').toURL()),
    towerContainer: new ImageSource(client.image('tower-container').toURL()),
    circle: new ImageSource(client.image('circle-button').toURL()),
  },
  characters: {
    Dude: new Gif(client.image('dude').toURL()),
  },
  projectiles: {
    projectile1: new ImageSource(client.image('projectile1-1').toURL()),
    projectile2: new ImageSource(client.image('projectile1-2').toURL()),
    projectile3: new ImageSource(client.image('projectile1-3').toURL()),
  },
  weapons: {
    sword: new ImageSource(client.image('sword').toURL()),
  },
  musics: {
    caketown: new Sound(client.video('caketown.mp3').toURL()),
    happy: new Sound(client.video('happy.mp3').toURL()),
    lose: new Sound(client.video('lose.mp3').toURL()),
    win: new Sound(client.video('win.mp3').toURL()),
  },
  icons: {
    winning: new ImageSource('./win.png'),
    lose: new ImageSource('./loser.png'),
  },
} as const;

export default RESOURCES;
