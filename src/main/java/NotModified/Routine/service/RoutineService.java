package NotModified.Routine.service;

import NotModified.Routine.domain.Routine;
import NotModified.Routine.dto.routine.request.RoutineCreateRequest;
import NotModified.Routine.repository.interfaces.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoutineService {
    private final RoutineRepository routineRepository;

    public Long registerRoutine(RoutineCreateRequest dto) {
        Routine newRoutine = Routine.builder()
                .userId(dto.getUserId())
                .name(dto.getName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();

        // 루틴 종료 날짜를 선택하지 않으면 5년 뒤로 자동 설정
        if(dto.getEndDate() == null) {
            newRoutine.setEndDate(dto.getStartDate().plusYears(5));
        }

        routineRepository.save(newRoutine);
        return newRoutine.getId();
    }

}
