import React from 'react';

export const decorators = [
  (Story: () => React.JSX.Element) => (
    <div className="flex h-screen flex-col content-center justify-center bg-black text-gray-700">
      <main
        className="m-auto flex h-full min-w-[1000px] flex-col content-center justify-center bg-gray-500"
        id="container"
      >
        <Story />
      </main>
    </div>
  ),
];
