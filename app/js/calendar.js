// ===================================
// ЛОГИКА КАЛЕНДАРЯ
// ===================================

class CalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.dailyHabits = {};
        this.listeners = [];
    }
    
    /**
     * Инициализация менеджера календаря
     */
    init() {
        authManager.onAuthStateChanged(user => {
            if (user) {
                this.startListening(user.uid);
            } else {
                this.stopListening();
            }
        });
    }
    
    /**
     * Установка слушателя изменений дневных привычек
     */
    onDailyHabitsChanged(callback) {
        this.listeners.push(callback);
    }
    
    /**
     * Уведомление слушателей
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.dailyHabits));
    }
    
    /**
     * Начало слушания дневных привычек
     */
    startListening(userId) {
        this.unsubscribe = db.collection('users').doc(userId)
            .collection('dailyHabits')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added' || change.type === 'modified') {
                        const data = change.doc.data();
                        this.dailyHabits[data.date] = data;
                    }
                });
                this.notifyListeners();
            }, error => {
                Logger.error('Error listening to daily habits:', error);
            });
    }
    
    /**
     * Остановка слушания
     */
    stopListening() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.dailyHabits = {};
    }
    
    /**
     * Получить статусы привычек для дня
     */
    async getDayHabits(date) {
        const userId = authManager.getCurrentUserId();
        const dateString = formatDate(date);
        
        if (this.dailyHabits[dateString]) {
            return this.dailyHabits[dateString];
        }
        
        try {
            const doc = await db.collection('users').doc(userId)
                .collection('dailyHabits').doc(dateString).get();
            
            if (doc.exists) {
                return doc.data();
            } else {
                return { date: dateString, habits: {} };
            }
        } catch (error) {
            Logger.error('Error fetching day habits:', error);
            return { date: dateString, habits: {} };
        }
    }
    
    /**
     * Обновить статус привычки
     */
    async toggleHabitStatus(date, habitId) {
        const userId = authManager.getCurrentUserId();
        const dateString = formatDate(date);
        
        // Проверка редактируемости дня
        if (!this.isDateEditable(date)) {
            showToast('Этот день нельзя редактировать', 'warning');
            return false;
        }
        
        try {
            const dayHabits = await this.getDayHabits(date);
            const currentStatus = dayHabits.habits?.[habitId] || false;
            
            await db.collection('users').doc(userId)
                .collection('dailyHabits').doc(dateString).set({
                    date: dateString,
                    dayOfWeek: getDayOfWeek(date),
                    habits: {
                        ...dayHabits.habits,
                        [habitId]: !currentStatus
                    },
                    updatedAt: new Date()
                }, { merge: true });
            
            Logger.log('Habit status updated:', habitId, !currentStatus);
            showToast(i18n.t('messages.statusUpdated'), 'success');
            
            return true;
        } catch (error) {
            Logger.error('Error updating habit status:', error);
            showToast(i18n.t('messages.savingError'), 'error');
            return false;
        }
    }
    
    /**
     * Проверить, выполнена ли привычка в день
     */
    isHabitCompleted(date, habitId) {
        const dateString = formatDate(date);
        const dayData = this.dailyHabits[dateString];
        if (!dayData) return false;
        return dayData.habits?.[habitId] || false;
    }
    
    /**
     * Получить процент выполнения за день
     */
    getDayCompletionPercentage(date, habitIds) {
        if (habitIds.length === 0) return 0;
        const completed = habitIds.filter(id => 
            this.isHabitCompleted(date, id)
        ).length;
        return (completed / habitIds.length) * 100;
    }
    
    /**
     * Проверить редактируемость дня
     */
    isDateEditable(date) {
        const editableDays = localStorage.getItem('editableDaysCount') || '1';
        const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        return daysAgo <= parseInt(editableDays);
    }
    
    /**
     * Установить текущую дату
     */
    setCurrentDate(date) {
        this.currentDate = new Date(date);
    }
    
    /**
     * Получить текущую дату
     */
    getCurrentDate() {
        return this.currentDate;
    }
    
    /**
     * Переместиться на неделю/месяц вперёд
     */
    nextPeriod(viewMode = 'week') {
        if (viewMode === 'week') {
            this.currentDate = addDays(this.currentDate, 7);
        } else if (viewMode === 'month') {
            this.currentDate = new Date(this.currentDate.getFullYear(), 
                                        this.currentDate.getMonth() + 1, 1);
        }
        this.notifyListeners();
    }
    
    /**
     * Переместиться на неделю/месяц назад
     */
    previousPeriod(viewMode = 'week') {
        if (viewMode === 'week') {
            this.currentDate = addDays(this.currentDate, -7);
        } else if (viewMode === 'month') {
            this.currentDate = new Date(this.currentDate.getFullYear(), 
                                        this.currentDate.getMonth() - 1, 1);
        }
        this.notifyListeners();
    }
    
    /**
     * Вернуться к текущей дате
     */
    goToToday() {
        this.currentDate = new Date();
        this.notifyListeners();
    }
}

// Создание глобального экземпляра
const calendarManager = new CalendarManager();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    calendarManager.init();
});
