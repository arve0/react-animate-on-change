// Type definitions for react-animate-on-change 1.0.1
// Project: https://github.com/arve0/react-animate-on-change
// Definitions by: Cliff Spital <https://github.com/biffjutsu>
// TypeScript Version: 2.7.1

import * as React from 'react';

export interface AnimateOnChangeProps {
    children: any;
    animate: boolean;
    baseClassName: string;
    animationClassName: string;
}

declare class AnimateOnChange extends React.Component<AnimateOnChangeProps>{}

export default AnimateOnChange;
