
import React from 'react';
import progress from "./progess.module.css"
import cn from 'classnames';
export const BasicProgressBarWithLabel = ({ currentValue, label, maxValue }: { currentValue: number; label: string; maxValue: number }) => (
  <div className='my-6 flex flex-col gap-2 items-center'>
    <progress id="progress-bar" value={currentValue} max={maxValue} className={cn(progress.progressBar,"mx-auto w-36 md:w-72")}>{currentValue}%</progress>
    <div className='w-fit'>
      <label htmlFor="progress-bar" className='font-bold text-[#F7F644] text-lg'>{label} {" "} {currentValue}%</label>
    </div>
  </div>
);