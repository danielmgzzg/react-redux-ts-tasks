import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>;
  size?: 'lg' | 'md' | 'sm';
  position?: 'right' | 'left' | 'bottom';
  icon: JSX.Element;
  hideMobile?: boolean;
}

function Tooltip({
  children,
  className,
  size,
  position,
  icon,
  hideMobile,
}: TooltipProps): JSX.Element {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const positionOuterClasses = (position: TooltipProps['position']) => {
    switch (position) {
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2';
    }
  };

  const sizeClasses = (size: TooltipProps['size']) => {
    switch (size) {
      case 'lg':
        return 'min-w-72  p-3';
      case 'md':
        return 'min-w-56 p-3';
      case 'sm':
        return 'min-w-44 p-2';
      default:
        return 'p-2';
    }
  };

  const positionInnerClasses = (position: TooltipProps['position']) => {
    switch (position) {
      case 'right':
        return 'ml-2';
      case 'left':
        return 'mr-2';
      case 'bottom':
        return 'mt-2';
      default:
        return 'mb-2';
    }
  };

  return (
    <div
      className={`relative ${className}  `}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      <button
        className="block"
        aria-haspopup="true"
        aria-expanded={tooltipOpen}
        onClick={(e) => e.preventDefault()}
      >
        {icon}
      </button>
      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        {tooltipOpen && (
          <div
            // show={tooltipOpen}
            className={`${
              hideMobile ? 'block sm:hidden' : ''
            } rounded overflow-hidden ${'bg-white border border-gray-200 shadow-lg'} ${sizeClasses(
              size,
            )} ${positionInnerClasses(position)}`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tooltip;
