import { Component, ReactInstance } from 'react';
interface Props {
    children: {};
    animate: boolean;
    baseClassName: string;
    animationClassName: string;
}
interface State {
    animating: boolean;
    clearAnimationClass: boolean;
}
/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} baseClassName - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */
declare class AnimateOnChange extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    addEventListener(type: string, elm: ReactInstance, eventHandler: (e: Event) => void): void;
    removeEventListeners(type: string, elm: ReactInstance, eventHandler: (e: Event) => void): void;
    updateEvents(type: string, newEvent: string): void;
    animationStart(e: Event): void;
    animationEnd(e: Event): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    render(): JSX.Element;
}
export default AnimateOnChange;
