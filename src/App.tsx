import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import { Stage, Container, Sprite } from '@pixi/react';

import BetButtonsContainer from "./features/bet/ui/BetButtonsContainer";
import BetInputContainer from "./features/bet/ui/BetInputContainer";

import backgroundImg from './assets/background.png';
import { setFocus } from "./features/bet/model/betSlice";
import {store} from "./store";

const App = () => {
    const dispatch = useDispatch();
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [backgroundWidth, setBackgroundWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth <= 360 ? 360 : window.innerWidth;
            setDimensions({ width: newWidth, height: window.innerHeight });
        };

        const img = new Image();
        img.src = backgroundImg as any;
        img.onload = () => {
            setBackgroundWidth(img.width);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scale = dimensions.width / backgroundWidth;
    const containerScale = dimensions.width / 375;

    const onPointerDown = () => {
        dispatch(setFocus(false));
    };

    const offsetY = window.innerWidth < window.innerHeight ? dimensions.height - 300 * containerScale : dimensions.height - 90 * containerScale;

    return (
        <Stage
            width={dimensions.width}
            height={dimensions.height}
            options={{ background: 0x1099bb }}
        >
            <Provider store={store}>
                <Sprite
                    image={backgroundImg as any}
                    scale={{ x: scale, y: scale }}
                    eventMode={"static"}
                    pointerdown={onPointerDown}
                />

                <Container
                    y={offsetY}
                    scale={{ x: containerScale, y: containerScale }}
                >
                    <BetInputContainer />
                    <BetButtonsContainer />
                </Container>
            </Provider>
        </Stage>
    );
};

export default App;
