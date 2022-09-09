import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const citySlice = createSlice({
    name: 'city',
    initialState: "auckland",
    reducers: {
        change: (state: string, action: PayloadAction<string>) => state = action.payload
    }
})

export const { change } = citySlice.actions

export default citySlice.reducer