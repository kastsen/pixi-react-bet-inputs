import { Container } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useSelector } from "react-redux";
import BetInput from "./BetInput";

import betInputDefaultImg from "../../../assets/input-default.png";
import betInputOnClickImg from "../../../assets/input-active.png";
import playButtonImg from "../../../assets/play-button.png";
import playButtonOnClickImg from "../../../assets/play-button-pointer.png";
import Button from "../../../shared/ui/Button";
import {RootState, store} from "../../../store";
import {setFocus} from "../model/betSlice";

const inputStyle = new TextStyle({
    fill: "white",
    fontSize: 48,
    align: "left",
    fontFamily: "Bahnschrift",
    fontWeight: "400",
});

const startButtonStyle = new TextStyle({
    fill: "white",
    fontSize: 48,
    align: "left",
    fontFamily: "Bahnschrift",
    fontWeight: "700",
    stroke: "#9F8C1A",
    strokeThickness: 4,
});

const BetInputContainer = () => {
    const betValue = useSelector((state: RootState) => state.bet.value);
    const playButtonX = 348 * 0.5 + 10;

    return (
        <Container x={96}>
            <BetInput
                scale={0.5}
                imageSource={betInputDefaultImg}
                onClickImageSource={betInputOnClickImg}
                x={0}
                y={0}
                text={betValue}
                textAlpha={1}
                textStyle={inputStyle}
                textAnchor={0}
                textPosition={{x: -34, y: -15}}
            />
            <Button
                scale={0.5}
                imageSource={playButtonImg}
                onClickImageSource={playButtonOnClickImg}
                x={playButtonX}
                y={0}
                textAlpha={1}
                text={"Начать игру"}
                textStyle={startButtonStyle}
                textAnchor={0.5}
                textPosition={{x: playButtonX, y: -5}}
                onPointerDown={() => {
                    store.dispatch(setFocus(false))
                }}
            />
        </Container>
    );
};

export default BetInputContainer;
