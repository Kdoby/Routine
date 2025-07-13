import Routine from "./Routine.js";
import './RoutineList.css';

export default function RoutineList() {

    return (
        <div className={"L_leftList"}>
            <h2>Routine</h2>
            <hr />
            <Routine />
            <Routine />
            <Routine />
            <button className={"AddRoutineButton"} >+</button>
        </div>
    );
}