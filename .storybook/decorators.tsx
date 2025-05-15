import { PrimeReactProvider } from "primereact/api";
import React from "react";

export const decorators = [
    (Story: () => React.JSX.Element) => (
        <div className="flex flex-col h-screen justify-center">
        <PrimeReactProvider>
                    {/* <canvas className='hidden' id="game"></canvas> */}
  <main className="flex m-auto w-full justify-center" id="container">
  <Story />
  </main>
            
        </PrimeReactProvider>
        </div>

    )
];