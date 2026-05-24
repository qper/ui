// ===================================
// ЛОГИКА DASHBOARD (ГЛАВНОЙ СТРАНИЦЫ)
// ===================================

class DashboardManager {
    constructor() {
        this.currentView = 'week';
    }
    
    /**
     * Инициализация Dashboard
     */
    init() {
        // Слушать изменения привычек
        habitsManager.onHabitsChanged(() => this.render());
        
        // Слушать изменения дневных привычек
        calendarManager.onDailyHabitsChanged(() => this.render());
    }
    
    /**
     * Рендер Dashboard
     */
    render() {
        const currentDate = calendarManager.getCurrentDate();
        
        if (this.currentView === 'week') {
            this.renderWeekView(currentDate);
        } else if (this.currentView === 'month') {
            this.renderMonthView(currentDate);
        }
    }
    
    /**
     * Рендер недельного вида
     */
    renderWeekView(currentDate) {
        const weekDays = getWeekDays(currentDate);
        const habits = habitsManager.getHabits();
        
        let html = `
            <div class="dashboard-container">
                <div class="calendar-header">
                    <button class="btn btn-tertiary" id="prev-week">← ${i18n.t('dashboard.previous')}</button>
                    <h1 class="calendar-title">${getMonthName(currentDate, i18n.currentLanguage)}</h1>
                    <button class="btn btn-tertiary" id="next-week">${i18n.t('dashboard.next')} →</button>
                </div>
                
                <div class="calendar-week">
        `;
        
        weekDays.forEach(date => {
            const isEditable = calendarManager.isDateEditable(date);
            const dayCompletionPercentage = habits.length > 0 
                ? calendarManager.getDayCompletionPercentage(date, habits.map(h => h.id))
                : 0;
            
            html += `
                <div class="day-column ${isToday(date) ? 'today' : ''} ${!isEditable ? 'disabled' : ''}">
                    <div class="day-header">
                        <div class="day-label">${getDayName(date, i18n.currentLanguage)}</div>
                        <div class="day-date">${date.getDate()}</div>
                    </div>
                    
                    <div class="day-habits">
            `;
            
            if (habits.length === 0) {
                html += `<div class="empty-state"><p>${i18n.t('dashboard.noHabits')}</p></div>`;
            } else {
                habits.forEach(habit => {
                    const isCompleted = calendarManager.isHabitCompleted(date, habit.id);
                    html += `
                        <div class="habit-card ${isCompleted ? 'completed' : ''}" 
                             data-habit-id="${habit.id}" 
                             data-date="${formatDate(date)}"
                             ${!isEditable ? 'data-disabled="true"' : ''}>
                            <div class="habit-icon">${habit.emoji}</div>
                            <div class="habit-info">
                                <div class="habit-name">${habit.name}</div>
                            </div>
                            <div class="habit-status">
                                ${isCompleted ? '✓' : ''}
                            </div>
                        </div>
                    `;
                });
            }
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        
        document.getElementById('page-content').innerHTML = html;
        this.attachEventListeners();
    }
    
    /**
     * Рендер месячного вида
     */
    renderMonthView(currentDate) {
        const monthDays = getMonthCalendar(currentDate);
        const habits = habitsManager.getHabits();
        
        let html = `
            <div class="dashboard-container">
                <div class="calendar-header">
                    <button class="btn btn-tertiary" id="prev-month">← ${i18n.t('dashboard.previous')}</button>
                    <h1 class="calendar-title">${getMonthName(currentDate, i18n.currentLanguage)}</h1>
                    <button class="btn btn-tertiary" id="next-month">${i18n.t('dashboard.next')} →</button>
                </div>
                
                <div class="calendar-month">
        `;
        
        monthDays.forEach(date => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isEditable = calendarManager.isDateEditable(date);
            const dayCompletionPercentage = habits.length > 0 
                ? calendarManager.getDayCompletionPercentage(date, habits.map(h => h.id))
                : 0;
            
            let dayClass = 'calendar-month-day';
            if (!isCurrentMonth) dayClass += ' other-month';
            if (isToday(date)) dayClass += ' today';
            if (!isEditable) dayClass += ' disabled';
            
            // Определить статус дня
            let statusClass = '';
            if (dayCompletionPercentage === 100) statusClass = 'complete';
            else if (dayCompletionPercentage > 0) statusClass = 'partial';
            else statusClass = 'empty';
            
            html += `
                <div class="${dayClass} ${statusClass}" data-date="${formatDate(date)}">
                    <div class="calendar-month-day-number">${date.getDate()}</div>
                    ${dayCompletionPercentage > 0 ? `<div class="calendar-month-day-dot"></div>` : ''}
                </div>
            `;
        });
        
        html += `</div></div>`;
        
        document.getElementById('page-content').innerHTML = html;
        this.attachMonthEventListeners();
    }
    
    /**
     * Прикрепить обработчики событий (неделя)
     */
    attachEventListeners() {
        // Кнопки навигации
        document.getElementById('prev-week')?.addEventListener('click', () => {
            calendarManager.previousPeriod('week');
            this.render();
        });
        
        document.getElementById('next-week')?.addEventListener('click', () => {
            calendarManager.nextPeriod('week');
            this.render();
        });
        
        // Кнопки привычек
        document.querySelectorAll('.habit-card').forEach(card => {
            card.addEventListener('click', async (e) => {
                if (card.dataset.disabled === 'true') return;
                
                const habitId = card.dataset.habitId;
                const dateString = card.dataset.date;
                const date = parseDate(dateString);
                
                await calendarManager.toggleHabitStatus(date, habitId);
                this.render();
            });
        });
    }
    
    /**
     * Прикрепить обработчики событий (месяц)
     */
    attachMonthEventListeners() {
        // Кнопки навигации
        document.getElementById('prev-month')?.addEventListener('click', () => {
            calendarManager.previousPeriod('month');
            this.render();
        });
        
        document.getElementById('next-month')?.addEventListener('click', () => {
            calendarManager.nextPeriod('month');
            this.render();
        });
        
        // Клик на дни месяца
        document.querySelectorAll('.calendar-month-day:not(.other-month):not(.disabled)').forEach(day => {
            day.addEventListener('click', () => {
                const dateString = day.dataset.date;
                // TODO: открыть детальный вид дня
                Logger.log('Selected date:', dateString);
            });
        });
    }
    
    /**
     * Переключить вид (неделя/месяц)
     */
    setView(viewMode) {
        this.currentView = viewMode;
        this.render();
    }
    
    /**
     * Получить текущий вид
     */
    getView() {
        return this.currentView;
    }
}

// Создание глобального экземпляра
const dashboardManager = new DashboardManager();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    dashboardManager.init();
    dashboardManager.render();
});
