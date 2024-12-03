import { Sprite, Text } from '@pixi/react';
import React, { Component } from "react";
import {ImageSource, TextStyle} from "pixi.js";

const defaultTextStyle = new TextStyle({
    fill: "#3A3845",
    fontSize: 40,
    align: "center",
    fontFamily: "Bahnschrift",
    fontWeight: "700",
});

export interface ButtonProps {
    scale: number;
    imageSource: ImageSource;
    onClickImageSource: ImageSource;
    x: number;
    y: number;
    textAlpha: number;
    onPointerDown?: () => void;
    text: string;
    textStyle?: TextStyle;
    textAnchor?: number;
    textPosition: {x: number, y: number};
    textScaleOnclick?: number;
}

export interface ButtonState {
    textScale: number;
    textAlpha: number;
    isFocused?: boolean;
    text: string;
    activeSpriteAlpha: number;
    textPosition: {x: number, y: number};
}

class Button extends Component<ButtonProps, ButtonState> {
    intervalId: number | null = null;
    buttonRef: React.RefObject<any>;

    constructor(props: ButtonProps) {
        super(props);
        this.buttonRef = React.createRef();

        this.state = {
            textScale: 0.5,
            textAlpha: props.textAlpha,
            text: this.props.text,
            activeSpriteAlpha: 1,
            textPosition: this.props.textPosition
        };

    }

    private handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    private handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    protected onPointerDown = () => {
        this.setState({
            textScale: this.props.textScaleOnclick !== undefined ? this.props.textScaleOnclick : this.props.scale * 0.98,
            activeSpriteAlpha: 0.01,
            textPosition: { x: this.props.textPosition.x, y: this.props.textPosition.y + 2 },
        });

        if (this.props.onPointerDown) {
            this.props.onPointerDown();
        }

        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = window.setInterval(() => {
            this.setState({
                textScale: 0.5,
                activeSpriteAlpha: 1,
                textPosition: { x: this.props.textPosition.x, y: this.props.textPosition.y,
                }});
            clearInterval(this.intervalId!);
        }, 300);
    };

    public render() {
        const { scale, x, y, textAnchor, textStyle } = this.props;
        const {textPosition} = this.state;
        const {textScale, textAlpha, text } = this.state;

        return (
            <>
                <Sprite
                    image={this.props.onClickImageSource as any}
                    x={x}
                    y={y}
                    scale={scale}
                    anchor={{x: 0.5, y: 0.5}}
                />
                <Sprite
                    image={this.props.imageSource as any}
                    x={x}
                    y={y}
                    scale={scale}
                    eventMode={"static"}
                    pointerover={this.handlePointerOver}
                    pointerout={this.handlePointerOut}
                    pointerdown={this.onPointerDown}
                    alpha={this.state.activeSpriteAlpha}
                    anchor={0.5}
                />
                <Text
                    text={text}
                    x={textPosition.x}
                    y={textPosition.y}
                    style={textStyle || defaultTextStyle}
                    anchor={textAnchor !== undefined ? textAnchor : 0.5}
                    scale={textScale}
                    alpha={textAlpha}
                />
            </>
        );
    }
}

export default Button;