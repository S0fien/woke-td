import { JSX } from 'react';

export const Divider = ({ childrens }: { childrens?: JSX.Element[] }) => {
  return (
    <div className="flex w-full">
      {childrens &&
        childrens.map((child, index) => (
          <>
            <div key={index} className="card rounded-box grid h-20 grow place-items-center">
              {child}
            </div>
            {index < childrens.length - 1 ? <div className="divider divider-neutral divider-horizontal">OR</div> : null}
          </>
        ))}
    </div>
  );
};
