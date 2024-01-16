import React, {useCallback, useMemo, useReducer, useState} from 'react';

import './App.css';

import Input from './components/Input';
import {data} from "./chip.data";
import Chip from './components/Chip';
import {ACTIONS_BY_TYPE, ChipListReducer} from "./App.reducer";


function ChipListContainer(props){
    const { state, dispatch} = props;

    const visibleChipList = useMemo(()=>{
        return [...state.filter((item)=>item.isActive)];
        },[state])

    const handleClose = (event) => {
        const id = Number(event.target.id.split("-")[0]);
        dispatch({type:ACTIONS_BY_TYPE.CLOSE_BY_ID, payload:{id}});
    }

    return (
        <div className={"chip__container"} onClick={handleClose}>
            {visibleChipList.map((item)=> <Chip key={item.id} {...item}/>)}
        </div>
    )
}

function App() {
    const [state, dispatch] = useReducer(ChipListReducer, [...data]);

    return (
        <>
        <div className={"app"}>
            <ChipListContainer state={state} dispatch={dispatch}/>
            <Input state={state} dispatch={dispatch}/>
        </div>


        <div style={{marginLeft:"10rem"}}>
            <h3>Points taken care off</h3>
            <ol>
                <li>When you click on the input field, a list of items will appear.</li>
                <li>As you type, the list should show only items that match what you're typing.</li>
                <li>Clicking on an item should turn it into a chip at the top, and the input field should adjust automatically.</li>
                <li>Once an item becomes a chip, it should no longer be in the list.</li>
                <li>Each chip has an "X" icon. Clicking it removes the chip and adds the item back to the list.</li>
                <li>Clean code.</li>
                <li>When the input is blank and the user presses backspace, the last chip (for example, Nick Giannopoulos) should get highlighted and on again pressing backspace it should get deleted                </li>
            </ol>

        </div>
        </>

    );
}

export default App;
