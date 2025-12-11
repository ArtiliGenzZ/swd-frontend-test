import { createSlice } from '@reduxjs/toolkit';

const shapeSlice = createSlice({
    name: 'shape',
    initialState: {
        shapes: [
            "trapezoid",
            "rectangle",
            "parallelogram",
            "square",
            "circle",
            "oval",
        ],
        position: "up",
    },
    reducers: {
        moveShapeLeft(state) {
            const newShapes = [...state.shapes];
            const firstItem = newShapes.shift() as string;
            newShapes.push(firstItem);
            state.shapes = newShapes;
        },
        moveShapeRight(state) {
            const newShapes = [...state.shapes];
            const lastItem = newShapes.pop() as string;
            newShapes.unshift(lastItem);
            state.shapes = newShapes;
        },
        movePosition(state) {
            state.position = state.position === "up" ? "down" : "up";
        },
        shuffleShapes(state) {
            state.shapes = [...state.shapes].sort(() => Math.random() - 0.5);
        },
    },
});

export const { moveShapeLeft, moveShapeRight, movePosition, shuffleShapes } = shapeSlice.actions;
export default shapeSlice.reducer;
