import betDefaultImg from '../../../assets/stavka-default.png';
import betOnClickImg from '../../../assets/stavka-pointer.png';

import { Container } from "@pixi/react";
import Button from "../../../shared/ui/Button";
import {setDoubleBetValue, setFocus, setHalfBetValue, setMaxBetValue, setMinBetValue} from "../model/betSlice";
import {ImageSource} from "pixi.js";
import {store} from "../../../store";

const BetButtonsContainer = () => {
    const buttonWidth = 160;
    const buttonScale = 0.5;

    const buttons = [
        { text: 'Min', action: setMinBetValue },
        { text: 'x2', action: setDoubleBetValue },
        { text: 'x/2', action: setHalfBetValue },
        { text: 'Max', action: setMaxBetValue },
    ];

    return (
        <Container x={52} y={55}>
            {buttons.map((button, index) => {
                const x = index * (buttonWidth * buttonScale + 10);
                return (
                    <Button
                        key={index}
                        scale={buttonScale}
                        imageSource={betDefaultImg as ImageSource}
                        onClickImageSource={betOnClickImg as ImageSource}
                        x={x}
                        y={0}
                        text={button.text}
                        onPointerDown={() => {
                            store.dispatch(button.action())
                            store.dispatch(setFocus(false))
                        }}
                        textAlpha={1}
                        textPosition={{ x: x, y: -2 }}
                        textScaleOnclick={0.48}
                    />
                );
            })}
        </Container>
    );
};

export default BetButtonsContainer;
