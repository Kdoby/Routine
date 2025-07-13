import WeeklyRoutine from "./WeeklyRoutine";
import './WeeklyRoutine.css';

export default function WeeklyView() {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return <div className={"WR_view_wrapper"}>
        <div style={{margin: "110px"}}>
            <div className={"WR_date_label_wrapper"}>
                {Array(7).fill().map((_,i) => (
                    <div className={"WR_date_label"} key={i}>{days.at(i)}</div>
                ))}
            </div>
            <WeeklyRoutine />
            <WeeklyRoutine />
            <WeeklyRoutine />
        </div>
    </div>;
}