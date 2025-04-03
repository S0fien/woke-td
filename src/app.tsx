import { Actor, Color, vec, Vector } from 'excalibur';
import { useContext, useEffect, useState } from 'react';
import { Resources } from './resources';
import { ExcaliburContext } from './root';

export default function ExcaliburUiApp() {
  const [visible, setVisible] = useState(true);
  const [worldPos, setWorldPos] = useState(Vector.Zero);
  const [screenPos, setScreenPos] = useState(Vector.Zero);
  const engine = useContext(ExcaliburContext);
  useEffect(() => {
    const pointerSubscription = engine.input.pointers.on('down', evt => {
      console.log('pointer down', evt);
      setVisible(true);
      console.log(
        'engine.screen.pageToWorldCoordinates',
        engine.screen.pageToWorldCoordinates(vec(evt.pagePos.x, evt.pagePos.y))
      );
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
    actor.graphics.use(Resources.Weapon.Sword.toSprite());
    engine.currentScene.add(actor);
    console.log(engine.currentScene);
    console.log(Resources.Weapon. Sword.toSprite());
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
        visibility: 'visible',
        // visibility: visible ? 'visible' : 'hidden',
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
