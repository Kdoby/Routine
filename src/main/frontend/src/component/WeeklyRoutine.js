import './WeeklyRoutine.css';

export default function WeeklyRoutine() {

    return <div>
        <div className={"WR_wrapper"}>
            <p className={"WR_name"}>brush teeth on the morning</p>
            <p className={"WR_achieve"}>60%</p>
            <div className={"WR_log_wrapper"}>
                {Array(7).fill().map((_,i) => (
                    <div className={"WR_log_date"} key={i}></div>
                ))}
            </div>
        </div>
    </div>
}