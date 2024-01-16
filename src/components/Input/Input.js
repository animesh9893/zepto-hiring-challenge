import './input.style.css'
import {forwardRef, useEffect, useRef, useState} from "react";

import {ACTIONS_BY_TYPE} from "../../App.reducer";

const Input = forwardRef((props, ref) => {
    const {state, dispatch, ...rest} = props;
    
    const consecutiveBackspace = useRef(0);
    const consecutiveBackspaceTimeout = useRef(null);

    const handleKeyDown = (event) => {
        if(event.key === "Backspace"){
            if(consecutiveBackspace.current === 1){
                consecutiveBackspace.current = 0;
                dispatch({type:ACTIONS_BY_TYPE.CLOSE_LAST_ACTIVE});
            } else {
                if(consecutiveBackspaceTimeout.current !== null){
                    clearTimeout(consecutiveBackspaceTimeout.current);
                }
                consecutiveBackspace.current +=1;
                consecutiveBackspaceTimeout.current = setTimeout(()=>{
                    consecutiveBackspace.current = 0;
                    consecutiveBackspaceTimeout.current = null;
                    },1000);
            }
        }
    }


    return (<input {...rest} className={"input"} onKeyDown={handleKeyDown} id={"input"} ref={ref} type={"search"} placeholder={"Type here to add new"} />)
});

const InputSelect = (props) => {
    const { isFocused, chipList, onSelect } = props;
    
    return (
        <>
        {isFocused && <div id={"input-result-container"} className={"result__container"} onClick={onSelect}>
            {chipList.map((item)=>{
                return <div className={"input__items"} id={item.id} key={item.id}>{item.name}</div>
            })}
        </div>}
        </>
    )
}

function InputContainer(props){
    const {state, dispatch} = props;
    
    const inputRef = useRef();
    const [inputText, setInputText] = useState("");
    
    const [isFocused, setIsFocused] = useState(false);
    
    const onFocus = () => {
        setIsFocused(true);
    }
    
    const [eligibleChips, setEligibleChips] = useState(()=>{
        return [...state.filter(item=>!item.isActive)]
    });
    
    useEffect(()=>{
        window.addEventListener("click",(event)=>{
            if(event.target.id === "input-result-container" || event.target.id === "input"){
                return;
            }
            closeOptions();
        })
    },[])
    
    
    useEffect(()=>{
        setEligibleChips([...state.filter(item=>!item.isActive)]);
    },[state]);
    
    const closeOptions = () => {
        inputRef.current.blur();
        setIsFocused(false);
    }
    
    const handleChange = (event) => {
        event.stopPropagation();
        const value = event.target.value;
        
        setInputText(value);
        const newEligbleChips = state.filter((item)=>{
            if(!item.isActive){
                return item?.name?.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });
        setEligibleChips([...newEligbleChips]);
    }
    
    const handleSelect = (event)=>{
        const id = event.target.id;
        if(id){
            dispatch({type:ACTIONS_BY_TYPE.ACTIVE_BY_ID, payload:{id}});
        }
        closeOptions();
    }
    
    return (
        <div className={"input__container"}>
            <Input ref={inputRef} onFocus={onFocus} state={state} dispatch={dispatch} value={inputText} onChange={handleChange}/>
            <InputSelect onSelect={handleSelect} chipList={eligibleChips} isFocused={isFocused}/>
        </div>
    )
};

export default InputContainer;