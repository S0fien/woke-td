import { Actor, Color, vec, Vector } from 'excalibur';
import { useEffect, useState } from 'react';
import RESOURCES from '../constants/resources';
import { GameEngine } from '../services/GameEngine';

export default function ExcaliburUiApp({ engine }: { engine: GameEngine }) {
  const [visible, setVisible] = useState(true);
  const [worldPos, setWorldPos] = useState(Vector.Zero);
  const [screenPos, setScreenPos] = useState(Vector.Zero);

  useEffect(() => {
    const pointerSubscription = engine.input.pointers.on('down', evt => {
      setVisible(true);
      setWorldPos(engine.screen.pageToWorldCoordinates(vec(evt.pagePos.x, evt.pagePos.y)));
      setScreenPos(evt.coordinates.screenPos);
    });

    // return cleanup
    return () => {
      pointerSubscription.close();
    };
  }, [engine]);

  function addUnit() {
    console.log('adding', engine.currentScene);
    const actor = new Actor({
      pos: worldPos,
      scale: vec(2, 2),
      color: Color.Red,
    });
    actor.graphics.use(RESOURCES.weapons.sword.toSprite());
    engine.currentScene.add(actor);
    console.log(engine.currentScene);
    console.log(RESOURCES.weapons.sword.toSprite());
    setVisible(false);
  }

  function removeUnit() {
    for (const actor of engine.currentScene.actors) {
      if (actor.graphics.bounds.contains(worldPos)) {
        actor.kill();
      }
    }
    setVisible(false);
  }

  return (
    <div
      className="menu"
      style={{
        position: 'absolute',
        // visibility: 'visible',
        visibility: visible ? 'visible' : 'hidden',
        width: '100px',
        left: screenPos.x + 'px',
        top: screenPos.y + 'px',
      }}
    >
      <h3>Menu</h3>
      <button onClick={addUnit}>Add Unit</button>
      <button onClick={removeUnit}>Remove Unit</button>
    </div>
  );
}
