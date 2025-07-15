import MonthlyRoutine from "./MonthlyRoutine";
import './MonthlyRoutine.css';

export default function MonthlyView() {
    return <div className={"MR_view_wrapper"}>
        <MonthlyRoutine></MonthlyRoutine>
        <MonthlyRoutine></MonthlyRoutine>
        <MonthlyRoutine></MonthlyRoutine>
    </div>;
}