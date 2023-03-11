import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartType } from '../interfaces/reduxInterfaces';

const initialState: cartType = {
    items: []
}

const cartSlice = createSlice( {
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: ( 
            state: cartType,
            action: PayloadAction<cartType>
         ) => {

            const cache = new Map();
            state.items!.map( ( { id }, ind ) => cache.set( id, ind ) )

            action.payload.items.map( new_item => {
                if( typeof cache.get( new_item.id ) !== "undefined" ) return

                state.items = [ ...state.items, new_item ]
            } )

        }
    }
} )

export const { 
    addToCart
} = cartSlice.actions

export default cartSlice.reducer