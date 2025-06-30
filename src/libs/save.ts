import { SaveData } from '#/types/game.ts';

export function saveGameToFile(data: SaveData) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'savegame.json';
  a.click();
  URL.revokeObjectURL(url);
}

// eslint-disable-next-line no-unused-vars
export function loadGameFromFile(onLoad: (data: SaveData) => void) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = () => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const jsonData = JSON.parse(e.target?.result as string) as SaveData;
          onLoad(jsonData);
        } catch (err) {
          console.error('Invalid save file', err);
        }
      };
      reader.readAsText(input.files[0]);
    }
  };
  input.click();
}
