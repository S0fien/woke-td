import React from 'react';

export const decorators = [
  (Story: () => React.JSX.Element) => (
    <div className="flex h-screen flex-col content-center justify-center bg-black text-gray-700">
      <main className="m-auto flex w-1/2 h-[450px] content-center  bg-gray-500 justify-center" id="container">
        <div className='m-auto'>
          <Story />
          </div>
      </main>
    </div>
  ),
];
