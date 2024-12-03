import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const isLengthValid = (text: string) => text.length < 6;

export const MIN_BET = 0.10;
const MAX_BET = 999.99;

interface BetState {
    value: string;
    isFocused: boolean;
}

const initialState: BetState = {
    value: `€${MIN_BET.toFixed(2)}`,
    isFocused: false,
};

const betSlice = createSlice({
    name: 'bet',
    initialState,
    reducers: {
        setBetValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
        },
        setDoubleBetValue(state) {
            const numericValue = parseFloat(state.value.replace('€', ''));
            if (numericValue * 2 <= MAX_BET) {
                state.value = `€${(numericValue * 2).toFixed(2)}`;
            } else {
                state.value = `€${MAX_BET.toFixed(2)}`;
            }
        },
        setHalfBetValue(state) {
            const numericValue = parseFloat(state.value.replace('€', ''));
            if (numericValue / 2 >= MIN_BET) {
                state.value = `€${(numericValue / 2).toFixed(2)}`;
            } else {
                state.value = `€${MIN_BET.toFixed(2)}`;
            }
        },
        setMinBetValue(state) {
            state.value = `€${MIN_BET.toFixed(2)}`;
        },

        setMaxBetValue(state) {
            state.value = `€${MAX_BET.toFixed(2)}`;
        },
        setFocus(state, action: PayloadAction<boolean>) {
            state.isFocused = action.payload;
        }
    },
});

export const { setBetValue, setDoubleBetValue, setHalfBetValue, setMinBetValue, setMaxBetValue, setFocus } = betSlice.actions;

export default betSlice.reducer;
