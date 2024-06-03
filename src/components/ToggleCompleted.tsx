import React from 'react';

import iconCheck from '../images/icon-check.svg';

type Props = {
  isCompleted: boolean;
  onClick: React.FormEventHandler<HTMLInputElement>;
};

const ToggleCompleted = ({ isCompleted, onClick }: Props) => {
  const labelClass = isCompleted ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-500';
  const divClass = isCompleted ? 'bg-transparent' : 'bg-white dark:bg-dark-blue';
  return (
    <label
      className={`${labelClass} h-5 w-5 rounded-0 p-px`}
    >
      <div className={`${divClass} flex h-full w-full items-center justify-center rounded-0`}>
        {isCompleted && <img src={iconCheck} alt="check" />}
      </div>
      <input type="checkbox" checked={isCompleted} className="hidden" onChange={onClick} />
    </label>
  );
};

export default ToggleCompleted;
