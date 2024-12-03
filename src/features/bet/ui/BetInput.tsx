import Button, { ButtonProps } from "../../../shared/ui/Button";
import { store } from "../../../store";
import {isLengthValid, MIN_BET, setBetValue, setFocus} from "../model/betSlice";

class BetInput extends Button {
    private readonly unsubscribeBetValue: () => void;
    private readonly unsubscribeIsFocused: () => void;

    constructor(props: ButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            text: store.getState().bet.value || "€",
            isFocused: store.getState().bet.isFocused,
        };

        this.unsubscribeBetValue = store.subscribe(() => {
            const newValue = store.getState().bet.value;
            if (newValue !== this.state.text) {
                this.setState({ text: newValue });
            }
        });

        this.unsubscribeIsFocused = store.subscribe(() => {
            const newFocusState = store.getState().bet.isFocused;
            if (newFocusState !== this.state.isFocused) {
                this.setState({ isFocused: newFocusState });
                if (!newFocusState) {
                    this.onPointerDownOut();
                }
            }
        });
    }

    public componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    public componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        this.unsubscribeBetValue();
        this.unsubscribeIsFocused();
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        const { isFocused, text } = this.state;
        if (!isFocused) return;

        if (event.key === "Backspace") {
            const newText = text.length > 1 ? text.slice(0, -1) : '€';
            store.dispatch(setBetValue(newText));
        } else if (event.key.length === 1) {
            const isDigit = /^[0-9]$/.test(event.key);
            const isDot = event.key === '.' && !text.includes('.');

            if ((isDigit || isDot) && (isLengthValid(text) || (isDot && text.length > 0))) {
                store.dispatch(setBetValue(text + event.key));
            }
        }
    };


    private onPointerDownOut = () => {
        this.setState({ activeSpriteAlpha: 1 });
    };

    protected onPointerDown = () => {
        this.setState({ activeSpriteAlpha: 0.01 });
        store.dispatch(setFocus(true));
    };
}

export default BetInput;
