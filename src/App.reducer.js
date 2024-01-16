export const ACTIONS_BY_TYPE = {
    "CLOSE_BY_ID":"CLOSE_BY_ID",
    "CLOSE_LAST_ACTIVE":"CLOSE_LAST_ACTIVE",
    
    "ACTIVE_BY_ID":"ACTIVE_BY_ID",
}


export function ChipListReducer(state, action){
    const { type, payload } = action;
    
    if(type === ACTIONS_BY_TYPE.CLOSE_BY_ID){
        const { id } = payload;
        
        const newChipList = state.map((item)=>{
            const newItem = {...item};

            if(newItem.id === id){
                newItem.isActive = false;
            }

            return newItem;
        })
        return [...newChipList];
    }
    
    if(type === ACTIONS_BY_TYPE.CLOSE_LAST_ACTIVE){
        const temp = [...state];
        let lastFound = false;
        
        return [...temp.reverse().map((item)=>{
            if(item.isActive && !lastFound){
                lastFound = true;
                return {...item, isActive:false};
            }
            return {...item};
        })]
    }
    
    if(type === ACTIONS_BY_TYPE.ACTIVE_BY_ID) {
        const {id} = payload;
        let newAddedItem = null;
        const newChipList =[]
        
        state.forEach((item)=>{
            const newItem = {...item};

            if(newItem.id === Number(id)){
                newItem.isActive = true;
                newAddedItem = newItem;
            }else {
                newChipList.push(newItem);
            }
        })
        return [...newChipList, newAddedItem];
    }
}