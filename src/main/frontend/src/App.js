import {useEffect, useState} from "react";
import './App.css';
import RoutineList from "./component/RoutineList";
import MonthlyView from "./component/MonthlyView";
import WeeklyView from "./component/WeeklyView";
import axios from "axios";
import DailyRoutine from "./component/DailyRoutine";


function App() {
    const [userId, setUserId] = useState('');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 0 = 1월, 1 = 2월, ...
    const date = today.getDate();

    const [selectedView, setSelectedView] = useState(0); // 0: Monthly / 1: Weekly / 2: Daily
    const [monthlyList, setMonthlyList] = useState([]);

    // monthly - 리스트, 통계 받아오기
    const fetchMonthlyStats = async () => {
        try {
            const res = await axios.get(`/api/routine/monthly/${userId}/${year}/${month}`);
            setMonthlyList(res.data);
            console.log("월간 통계 받아오기: ", res.data);
        } catch (e) {
            console.error("fail fetch: ", e);
        }

    };
    useEffect(() => {
        if (!userId) return;
        fetchMonthlyStats();
    }, [userId, year, month]);
    // add 후 화면 반영
    const handleAdd = (newRoutine) => {
        setMonthlyList(prev => [...prev, newRoutine]);
    }
    // delete 후 화면 반영
    const handleDelete = (id) => {
        setMonthlyList(prev => prev.filter(r => r.id !== id));
    }

    return (
        <div style={{display: "flex", justifyContent:"center", alignContent:"center", padding: "70px 210px"}}>
            <RoutineList userId={userId} list={monthlyList} onAdd={handleAdd} onDelete={handleDelete}/>
            <div style={{display: "flex", flexDirection: "column", width:"70%"}}>
                <div className={"RoutineHeader"}>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                    <button className={"CurrentDate"} >현재 날짜로 이동</button>
                    <div className={"DateNavigator"} >
                        <h2 className={"DateNavLabel"}>{today.toLocaleDateString("ko-KR")}</h2>
                    </div>
                </div>
                <div className={"RoutineNavigator"} >
                    <div className={"ViewButton"} onClick={() => {
                        if (selectedView !== 0) {
                            setSelectedView(0);
                        }
                    }}><p className={"ViewMonthly"} style={{color: selectedView === 0 ? 'black' : 'lightgray'}}>월간</p></div>
                    <div className={"ViewButton"} onClick={() => {
                        if (selectedView !== 1) {
                            setSelectedView(1);
                        }
                    }}><p className={"ViewWeekly"} style={{color: selectedView === 1 ? 'black' : 'lightgray'}}>주간</p></div>
                    <div className={"ViewButton"} onClick={() => {
                        if (selectedView !== 2) {
                            setSelectedView(2);
                        }
                    }}><p className={"ViewDaily"} style={{color: selectedView === 2 ? 'black' : 'lightgray'}}>일간</p></div>
                </div>
                {selectedView === 0 && <MonthlyView list={monthlyList} year={year} month={month}/>}
                {selectedView === 1 && <WeeklyView userId={userId} year={year} month={month} date={date}/>}
                {selectedView === 2 && <DailyRoutine userId={userId} date={today} fetchMonthly={fetchMonthlyStats} />}
            </div>

        </div>
    );
}

export default App;
