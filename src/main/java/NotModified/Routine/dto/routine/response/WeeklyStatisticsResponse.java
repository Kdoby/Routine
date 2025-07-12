package NotModified.Routine.dto.routine.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyStatisticsResponse {
    private Long id;
    private String name;
    private Boolean isClosed;
    // 루틴을 실행한 요일 목록
    private List<Integer> days;
    private double weeklyStatic;
}
