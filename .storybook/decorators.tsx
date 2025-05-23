import React from 'react';

export const decorators = [
  (Story: () => React.JSX.Element) => (
    <div className="flex h-screen flex-col justify-center bg-white text-gray-700">
      <main className="m-auto flex w-1/2 justify-center" id="container">
        <Story />
      </main>
    </div>
  ),
];
