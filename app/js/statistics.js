// ===================================
// ЛОГИКА СТАТИСТИКИ
// ===================================

class StatisticsManager {
    constructor() {
        this.statisticsData = {};
        this.currentFilter = 'week';
    }
    
    /**
     * Получить данные статистики за период
     */
    async getStatistics(days = 7) {
        const userId = authManager.getCurrentUserId();
        if (!userId) return null;
        
        try {
            const startDate = addDays(new Date(), -days);
            const stats = {
                totalCompleted: 0,
                totalPossible: 0,
                completionByHabit: {},
                streakByHabit: {},
                dayByDay: {}
            };
            
            const habits = habitsManager.getHabits();
            
            // Инициализировать статистику для каждой привычки
            habits.forEach(habit => {
                stats.completionByHabit[habit.id] = {
                    name: habit.name,
                    emoji: habit.emoji,
                    completed: 0,
                    total: 0,
                    percentage: 0,
                    streak: 0
                };
                stats.streakByHabit[habit.id] = 0;
            });
            
            // Собрать данные за период
            for (let i = 0; i < days; i++) {
                const date = addDays(new Date(), -i);
                const dateString = formatDate(date);
                const dayData = calendarManager.dailyHabits[dateString];
                
                if (dayData) {
                    stats.dayByDay[dateString] = {
                        completed: 0,
                        total: habits.length
                    };
                    
                    habits.forEach(habit => {
                        const isCompleted = dayData.habits?.[habit.id] || false;
                        
                        stats.completionByHabit[habit.id].total++;
                        stats.totalPossible++;
                        
                        if (isCompleted) {
                            stats.completionByHabit[habit.id].completed++;
                            stats.totalCompleted++;
                            stats.dayByDay[dateString].completed++;
                        }
                    });
                }
            }
            
            // Вычислить проценты и streaks
            habits.forEach(habit => {
                const data = stats.completionByHabit[habit.id];
                data.percentage = data.total > 0 ? (data.completed / data.total) * 100 : 0;
                data.streak = this.calculateStreak(habit.id, days);
                stats.streakByHabit[habit.id] = data.streak;
            });
            
            this.statisticsData = stats;
            return stats;
        } catch (error) {
            Logger.error('Error getting statistics:', error);
            return null;
        }
    }
    
    /**
     * Вычислить серию выполнения привычки
     */
    calculateStreak(habitId, daysToCheck = 30) {
        let streak = 0;
        
        for (let i = 0; i < daysToCheck; i++) {
            const date = addDays(new Date(), -i);
            const isCompleted = calendarManager.isHabitCompleted(date, habitId);
            
            if (isCompleted) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    /**
     * Получить лучшую привычку (по проценту выполнения)
     */
    getBestHabit() {
        let bestHabit = null;
        let maxPercentage = -1;
        
        for (const [_, data] of Object.entries(this.statisticsData.completionByHabit)) {
            if (data.percentage > maxPercentage) {
                maxPercentage = data.percentage;
                bestHabit = { ...data, id: _ };
            }
        }
        
        return bestHabit;
    }
    
    /**
     * Получить худшую привычку (по проценту выполнения)
     */
    getWorstHabit() {
        let worstHabit = null;
        let minPercentage = 101;
        
        for (const [_, data] of Object.entries(this.statisticsData.completionByHabit)) {
            if (data.percentage < minPercentage && data.total > 0) {
                minPercentage = data.percentage;
                worstHabit = { ...data, id: _ };
            }
        }
        
        return worstHabit;
    }
    
    /**
     * Получить общий процент выполнения
     */
    getOverallCompletion() {
        if (this.statisticsData.totalPossible === 0) return 0;
        return (this.statisticsData.totalCompleted / this.statisticsData.totalPossible) * 100;
    }
    
    /**
     * Установить текущий фильтр
     */
    setFilter(filter) {
        this.currentFilter = filter;
    }
}

// Создание глобального экземпляра
const statisticsManager = new StatisticsManager();
