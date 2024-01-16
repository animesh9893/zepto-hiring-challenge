import './chip.styles.css';

function Chip(props){
    const {id, name, profileURL} = props;
    
    return (
        <div className={"chip"}>
            <div><img style={{height:"25px", borderRadius:"50%"}} src={profileURL} alt="profile image" /></div>
            <div>{name}</div>
            <div id={`${id}-close-button`} style={{cursor:"pointer"}}>&times;</div>
        </div>
    )
}

export default Chip;