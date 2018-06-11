import { Component } from 'react';
export interface Props {
    children: any;
    animate: boolean;
    baseClassName: string;
    animationClassName: string;
    customTag?: string;
    onAnimationEnd?: () => void;
}
export interface State {
    animating: boolean;
    clearAnimationClass: boolean;
}
interface AnimateOnChange {
    elm: HTMLElement;
    setElementRef: (ref: HTMLElement) => void;
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
declare class AnimateOnChange extends Component<Props, State> implements AnimateOnChange {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    addEventListener(type: string, elm: HTMLElement, eventHandler: (e: Event) => void): void;
    removeEventListeners(type: string, elm: HTMLElement, eventHandler: (e: Event) => void): void;
    updateEvents(type: string, newEvent: string): void;
    animationStart(e: Event): void;
    animationEnd(e: Event): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    render(): JSX.Element;
}
export default AnimateOnChange;
