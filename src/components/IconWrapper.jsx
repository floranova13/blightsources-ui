import React from 'react';
import ReactTooltip from 'react-tooltip';
import { toTitleCase } from '../utils';
import Icon from './Icon';
import { useNavigate } from 'react-router-dom';

const IconWrapper = ({
  icon,
  size,
  nav = null,
  clickHandler = null,
}) => {
  let navigate = useNavigate();
  const handleClick = (s) => navigate(s);

  return (
    <>
      {clickHandler && (
        <div
          className='inline-block z-90'
          data-tip={toTitleCase(icon)}
          onClick={() => clickHandler()}
        >
          <Icon className='inline-block' icon={icon} size={size} />
          <ReactTooltip />
        </div>
      )}
      {nav && (
        <div
          className='inline-block z-90'
          data-tip={toTitleCase(icon)}
          onClick={() => handleClick(nav)}
        >
          <Icon className='inline-block' icon={icon} size={size} />
          <ReactTooltip />
        </div>
      )}
      {!clickHandler && !nav && (
        <div className='inline-block' data-tip={toTitleCase(icon)}>
          <Icon className='inline-block' icon={icon} size={size} />
          <ReactTooltip />
        </div>
      )}
    </>
  );
};

export default IconWrapper;
