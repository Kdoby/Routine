import Routine from "./Routine.js";
import './RoutineList.css';
import AddRoutine from "./AddRoutine";
import {useState} from "react";

export default function RoutineList({userId, list, onAdd, onDelete}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <div className={"L_leftList"}>
            <h2>Routine</h2>
            <hr />
            {list.map((item, index) => (
                <Routine name={item.name} key={item.id} id={item.id} onDelete={onDelete}/>
            ))}
            <button className={"AddRoutineButton"} onClick={() => setIsAddOpen(true)}>+</button>
            <AddRoutine userId={userId} onAdd={onAdd} isOpen={isAddOpen} closeModal={() => setIsAddOpen(false)}/>
        </div>

    );
}