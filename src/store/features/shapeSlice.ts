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
            // 1. Create a copy
            const newShapes = [...state.shapes];
            // 2. Remove the first item (.shift())
            const firstItem = newShapes.shift() as string;
            // 3. Add it to the end (.push())
            newShapes.push(firstItem);
            state.shapes = newShapes;
        },
        moveShapeRight(state) {
            const newShapes = [...state.shapes];
            // 2. Remove the last item (.pop())
            const lastItem = newShapes.pop() as string;
            // 3. Add it to the front (.unshift())
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
