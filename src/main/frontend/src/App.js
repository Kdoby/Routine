import {useState} from "react";
import './App.css';
import RoutineList from "./component/RoutineList";
import MonthlyView from "./component/MonthlyView";
import WeeklyView from "./component/WeeklyView";


function App() {
    const [userId, setUserId] = useState('');
    return (
        <div style={{display: "flex", margin: "10%", marginTop:"5%"}}>
            <RoutineList userId={userId}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className={"RoutineHeader"}>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                    <button className={"CurrentDate"} >현재 날짜로 이동</button>
                    <div className={"DateNavigator"} >
                        <h2 className={"DateNavLabel"}>2025-07-07</h2>
                    </div>
                </div>
                <div className={"RoutineNavigator"} >
                    <div className={"ViewButton"}><p className={"ViewMonthly"}>월간</p></div>
                    <div className={"ViewButton"}><p className={"ViewWeekly"}>주간</p></div>
                </div>
                <WeeklyView />
            </div>

        </div>
    );
}

export default App;
