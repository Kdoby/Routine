import WeeklyRoutine from "./WeeklyRoutine";
import './WeeklyRoutine.css';
import axios from "axios";
import {useEffect, useState} from "react";

export default function WeeklyView({userId, year, month, date}) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [weeklyList, setWeeklyList] = useState([]);

    // 특정 날짜가 그 달의 몇번째 주인지 계산하기
    const firstdayOfWeek =new Date(year, month-1, 1).getDay(); // 1일의 요일
    const weekInMonth = Math.ceil((date + firstdayOfWeek) / 7); // 몇번째 주

    // weekly - 리스트, 통계 받아오기
    const fetchWeeklyStats = async () => {
        try {
            const res = await axios.get(`/api/routine/weekly/${userId}/${year}/${month}/${weekInMonth}`);
            setWeeklyList(res.data);
            console.log("주간 통계 받아오기: ", res.data);
        } catch (e) {
            console.error("fail fetch: ", e);
        }
    };
    useEffect(() => {
        if (!userId || !year || !month || !date) {
            return;
        }
        fetchWeeklyStats();
    }, [userId, year, month]);

    return <div className={"WR_view_wrapper"}>
        <div>
            <div className={"WR_date_label_wrapper"}>
                {Array(7).fill().map((_,i) => (
                    <div className={"WR_date_label"} key={i}>{days.at(i)}</div>
                ))}
            </div>
            {weeklyList.map((item) => (
                <WeeklyRoutine routine={item} key={item.id} />
                ))}

        </div>
    </div>;
}