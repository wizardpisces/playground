import React, { MouseEventHandler } from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  name: string;
  onClick?: () => void;
  // @deprecated
  selfStyle?: React.CSSProperties;
};

const SvgIcon: React.FunctionComponent<IconProps> = (props) => {
  const { name, onClick, ...svgAttr } = props;

  const handleClick: MouseEventHandler = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <svg {...svgAttr} onClick={handleClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default SvgIcon;
