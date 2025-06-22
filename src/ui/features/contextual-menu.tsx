import { useEngine } from '#/hooks/useEngine.ts';
import { Actor, Color, PointerEvent, vec, Vector } from 'excalibur';
import { useEffect, useState } from 'react';
import RESOURCES from '../../constants/resources.ts';

export default function ContextualMenu() {
  const { engine } = useEngine();
  const [visible, setVisible] = useState(true);
  const [worldPos, setWorldPos] = useState(Vector.Zero);
  const [screenPos, setScreenPos] = useState(Vector.Zero);

  useEffect(() => {
    if (!engine) {
      return;
    }
    const pointerSubscription = engine.input.pointers.on('down', (evt: PointerEvent) => {
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
    const actor = new Actor({
      pos: worldPos,
      scale: vec(2, 2),
      color: Color.Red,
    });
    actor.graphics.use(RESOURCES.weapons.sword.toSprite());
    setVisible(false);
  }

  function removeUnit() {
    if (!engine) {
      return;
    }
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
