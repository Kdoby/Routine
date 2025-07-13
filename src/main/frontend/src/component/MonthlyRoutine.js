import './MonthlyRoutine.css';

export default function MonthlyRoutine() {
    return <div style={{
        border: "black solid 1px",
        borderRadius: "15px",
        backgroundColor: "white",
        width: "249px",
        height: "279px",
        margin: "20px",
        display: "inline-block"
    }}>
        <div className={"MR_wrapper"}>
            <p>brush teeth on the morning</p>
            <div className={"MR_completedDays"}>
                {Array(30).fill().map((_,i) => (
                    <div className={"completedDay"} key={i}></div>
                ))}
            </div>
            <div className={"MR_stat"}>
                <div className={"MR_achieve"}>80%</div>
                <div className={"MR_num"}>16</div>
            </div>
        </div>
    </div>;
}