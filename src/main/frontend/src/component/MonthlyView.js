import MonthlyRoutine from "./MonthlyRoutine";
import './MonthlyRoutine.css';

export default function MonthlyView({list, year, month}) {
    return <div className={"MR_view_wrapper"}>
        {list.map((item) => (
            <MonthlyRoutine routine={item} key={item.id} year={year} month={month}/>
        ))}
    </div>;
}