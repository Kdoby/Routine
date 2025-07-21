import {useState} from "react";
import './RoutineList.css';
import axios from "axios";
import UpdateRoutine from "./UpdateRoutine";

export default function Routine({routine, onDelete}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    // 수정 창 열기/닫기
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const OpenUpdateModal = () => {
        setIsUpdateOpen(true);
        setIsDropdownOpen(false);
    }
    const CloseUpdateModal = () => {
        setIsUpdateOpen(false);
    }
    // 루틴 삭제
    const del = async (e) => {
        e.stopPropagation();
        if(!window.confirm(`{name}을 삭제하시겠습니까?`)) return;
        try {
            onDelete(routine.id);
            const response = await axios.delete(`/api/routine/${routine.id}`);
            if(response.data.success) {
                console.log(response.data.message);
            }
            else {
                console.error('삭제 실패: ', response.data.message);
            }
        } catch (err) {
            console.error('에러 발생: ', err);
        }
    }

    return (
        <div className={"L_listItem"}>
            <div className={"L_flag"} />
            <div className={"L_title"}>{routine.name}</div>
            <div className={"L_menu"} onClick={toggleDropdown}>
                <img style={{height: "15px"}} src={"./menu.png"} alt={"menu"}/>
                {isDropdownOpen && (
                    <div className={"L_dropdown"}>
                        <div className={"L_dropdownItem"} onClick={OpenUpdateModal}>수정</div>
                        <div className={"L_dropdownItem"}>종료</div>
                        <div className={"L_dropdownItem"} onClick={del}>삭제</div>
                    </div>
                )}
                {isUpdateOpen && (
                    <UpdateRoutine routine={routine} isOpen={isUpdateOpen} onClose={CloseUpdateModal}/>
                )}
            </div>
        </div>
    );
}