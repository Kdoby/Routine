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
public class DailyStatisticsResponse {
    private double dailyStatic;
    private List<RoutineResponse> routines;
}
