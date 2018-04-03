import React from 'react';
import styled from 'styled-components';

import IDefaultProps from 'types/styled-component-props';

enum BoldnessLevels {
  Light,
  Normal,
  Medium,
  Semibold,
  Bold,
}

interface IProps extends React.HTMLProps<HTMLElement>, IDefaultProps {
  /**
   * [optional] specify the boldness level.
   * Use the BoldnessLevels enum.
   * Default is Normal if not specified
   */
  boldness?: BoldnessLevels;

  /**
   * [optional] specify the type of tag to which the font will be applied.
   * For instance, pass 'a' or 'div' or 'span'.
   * Default is 'div' if not specified
   */
  tag?: 'a' | 'div' | 'p' | 'span';
}

const BaseFont: React.SFC<IProps> = ({ children, boldness, tag, ...props }) => {
  const tagType = typeof tag === 'string' ? tag : 'div'; // default to div
  const factory = React.createFactory(tagType);
  return factory(props, children);
};

const getRockwellBoldness = (boldnessLevel: BoldnessLevels): number => {
  // We only support two Rockwell font weights: 300 (light) or 400.
  // Map anything that's not one of them to 400.
  return boldnessLevel === BoldnessLevels.Light ? 300 : 400;
};

const getWorkSansBoldness = (boldnessLevel: BoldnessLevels): number => {
  // we support four Work Sans font weights.
  // Map anything that's not one of them to 400.
  switch (boldnessLevel) {
    case BoldnessLevels.Light:
      return 300;
    case BoldnessLevels.Normal:
      return 400;
    case BoldnessLevels.Medium:
      return 500;
    case BoldnessLevels.Semibold:
      return 600;
    case BoldnessLevels.Bold:
      return 700;
    default:
      return 400;
  }
};

/*  'Display' fonts (large headers)  */
const Display4 = styled(BaseFont)`
  font-family: 'Rockwell';
  font-weight: ${props =>
    getRockwellBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 32px;
  line-height: 32px;
`;

const Display3 = styled(BaseFont)`
  font-family: 'Rockwell';
  font-weight: ${props =>
    getRockwellBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Light,
    )};
  font-size: 72px;
  line-height: 80px;
`;

const Display2 = styled(BaseFont)`
  font-family: 'Rockwell';
  font-weight: ${props =>
    getRockwellBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 48px;
  line-height: 54px;
`;

const Display1 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 40px;
  line-height: 46px;
`;

/*  'H' fonts (headers)  */
const H1 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 28px;
  line-height: 34px;
`;

const H2 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 24px;
  line-height: 30px;
`;

const H3 = styled(BaseFont)`
  font-family: 'Rockwell';
  font-weight: ${props =>
    getRockwellBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 24px;
  line-height: 30px;
`;

const H4 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 20px;
  line-height: 26px;
`;

/*  'Body' Styles  */
const Body3 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 16px;
  line-height: 20px;
`;

const Body2 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 14px;
  line-height: 18px;
`;

const Body1 = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 12px;
  line-height: 16px;
`;

/*  'Link' Styles  */
const Link4 = styled(H3)`
  color: #00539b;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Link3 = styled(Body3)`
  color: #00539b;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Link2 = styled(Body2)`
  color: #00539b;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Link1 = styled(Body1)`
  color: #00539b;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Label = styled(BaseFont)`
  font-family: 'Work Sans';
  font-weight: ${props =>
    getWorkSansBoldness(
      props.boldness !== undefined ? props.boldness : BoldnessLevels.Normal,
    )};
  font-size: 11px;
  line-height: 14px;
`;

export {
  Display1,
  Display2,
  Display3,
  Display4,
  H1,
  H2,
  H3,
  H4,
  Body1,
  Body2,
  Body3,
  Link1,
  Link2,
  Link3,
  Link4,
  Label,
  BoldnessLevels,
};
