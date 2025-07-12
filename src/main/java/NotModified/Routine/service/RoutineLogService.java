package NotModified.Routine.service;

import NotModified.Routine.domain.RoutineLog;
import NotModified.Routine.dto.routine.request.LogUpdateRequest;
import NotModified.Routine.repository.interfaces.RoutineLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoutineLogService {
    private final RoutineLogRepository routineLogRepository;

    // log 등록
    public void registerRoutineLog(LogUpdateRequest dto) {
        Optional<RoutineLog> logOpt = routineLogRepository.findLog(dto.getRoutineId(), dto.getDate());

        // 기존 로그가 있으면 달성 여부만 변경
        if(logOpt.isPresent()) {
            RoutineLog log = logOpt.get();
            log.setIsCompleted(dto.getIsCompleted());
        }
        // 기존 로그가 없으면 새로 등록
        else {
            RoutineLog log = RoutineLog.builder()
                    .routineId(dto.getRoutineId())
                    .date(dto.getDate())
                    .isCompleted(dto.getIsCompleted())
                    .build();
            routineLogRepository.save(log);
        }
    }
}
