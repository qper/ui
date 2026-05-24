// ===================================
// УПРАВЛЕНИЕ ПРИВЫЧКАМИ
// ===================================

class HabitsManager {
    constructor() {
        this.habits = [];
        this.deletedHabits = [];
        this.listeners = [];
    }
    
    /**
     * Инициализация менеджера привычек
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
     * Установка слушателя изменений привычек
     */
    onHabitsChanged(callback) {
        this.listeners.push(callback);
    }
    
    /**
     * Уведомление слушателей об изменениях
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.habits));
    }
    
    /**
     * Начало слушания изменений привычек (Real-time)
     */
    startListening(userId) {
        this.unsubscribe = db.collection('users').doc(userId).collection('habits')
            .where('isActive', '==', true)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                this.habits = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.notifyListeners();
                Logger.log('Habits updated:', this.habits.length);
            }, error => {
                Logger.error('Error listening to habits:', error);
            });
    }
    
    /**
     * Остановка слушания
     */
    stopListening() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.habits = [];
    }
    
    /**
     * Получить все активные привычки
     */
    getHabits() {
        return this.habits;
    }
    
    /**
     * Получить привычку по ID
     */
    getHabitById(habitId) {
        return this.habits.find(h => h.id === habitId);
    }
    
    /**
     * Добавить новую привычку
     */
    async addHabit(habitData) {
        const userId = authManager.getCurrentUserId();
        if (!userId) {
            Logger.error('User not authenticated');
            return null;
        }
        
        try {
            const newHabit = {
                name: habitData.name,
                emoji: habitData.emoji || '✓',
                category: habitData.category || 'selfDevelopment',
                description: habitData.description || '',
                reminderTime: habitData.reminderTime || '',
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
                statistics: {
                    totalCompleted: 0,
                    currentStreak: 0
                }
            };
            
            const docRef = await db.collection('users').doc(userId)
                .collection('habits').add(newHabit);
            
            Logger.log('Habit added:', docRef.id);
            showToast(i18n.t('messages.habitAdded'), 'success');
            
            return docRef.id;
        } catch (error) {
            Logger.error('Error adding habit:', error);
            showToast(i18n.t('messages.savingError'), 'error');
            return null;
        }
    }
    
    /**
     * Обновить привычку
     */
    async updateHabit(habitId, updateData) {
        const userId = authManager.getCurrentUserId();
        if (!userId) {
            Logger.error('User not authenticated');
            return false;
        }
        
        try {
            updateData.updatedAt = new Date();
            
            await db.collection('users').doc(userId)
                .collection('habits').doc(habitId).update(updateData);
            
            Logger.log('Habit updated:', habitId);
            showToast(i18n.t('messages.habitUpdated'), 'success');
            
            return true;
        } catch (error) {
            Logger.error('Error updating habit:', error);
            showToast(i18n.t('messages.savingError'), 'error');
            return false;
        }
    }
    
    /**
     * Удалить привычку (мягкое удаление)
     */
    async deleteHabit(habitId) {
        const userId = authManager.getCurrentUserId();
        if (!userId) {
            Logger.error('User not authenticated');
            return false;
        }
        
        try {
            // Мягкое удаление - помечаем как неактивную
            await this.updateHabit(habitId, { isActive: false, deletedAt: new Date() });
            
            Logger.log('Habit deleted (soft):', habitId);
            showToast(i18n.t('messages.habitDeleted'), 'success');
            
            return true;
        } catch (error) {
            Logger.error('Error deleting habit:', error);
            showToast(i18n.t('messages.savingError'), 'error');
            return false;
        }
    }
    
    /**
     * Восстановить удалённую привычку
     */
    async restoreHabit(habitId) {
        const userId = authManager.getCurrentUserId();
        if (!userId) {
            Logger.error('User not authenticated');
            return false;
        }
        
        try {
            await db.collection('users').doc(userId)
                .collection('habits').doc(habitId).update({
                    isActive: true,
                    deletedAt: firebase.firestore.FieldValue.delete()
                });
            
            Logger.log('Habit restored:', habitId);
            showToast(i18n.t('messages.habitRestored'), 'success');
            
            return true;
        } catch (error) {
            Logger.error('Error restoring habit:', error);
            showToast(i18n.t('messages.savingError'), 'error');
            return false;
        }
    }
    
    /**
     * Получить удалённые привычки
     */
    async getDeletedHabits() {
        const userId = authManager.getCurrentUserId();
        if (!userId) return [];
        
        try {
            const snapshot = await db.collection('users').doc(userId)
                .collection('habits')
                .where('isActive', '==', false)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            Logger.error('Error fetching deleted habits:', error);
            return [];
        }
    }
    
    /**
     * Получить привычки по категории
     */
    getHabitsByCategory(category) {
        return this.habits.filter(h => h.category === category);
    }
}

// Предложенные привычки (шаблоны)
const suggestedHabits = {
    ru: [
        { name: 'Медитация', emoji: '🧘', category: 'health' },
        { name: 'Упражнение', emoji: '💪', category: 'health' },
        { name: 'Выпить воду', emoji: '💧', category: 'health' },
        { name: 'Чтение', emoji: '📚', category: 'education' },
        { name: 'Здоровый сон', emoji: '😴', category: 'health' },
        { name: 'Питание', emoji: '🥗', category: 'health' },
        { name: 'Обучение', emoji: '🎓', category: 'education' },
        { name: 'Работа', emoji: '💼', category: 'productivity' },
        { name: 'Благодарность', emoji: '🙏', category: 'selfDevelopment' }
    ],
    en: [
        { name: 'Meditation', emoji: '🧘', category: 'health' },
        { name: 'Exercise', emoji: '💪', category: 'health' },
        { name: 'Drink Water', emoji: '💧', category: 'health' },
        { name: 'Reading', emoji: '📚', category: 'education' },
        { name: 'Healthy Sleep', emoji: '😴', category: 'health' },
        { name: 'Nutrition', emoji: '🥗', category: 'health' },
        { name: 'Learning', emoji: '🎓', category: 'education' },
        { name: 'Work', emoji: '💼', category: 'productivity' },
        { name: 'Gratitude', emoji: '🙏', category: 'selfDevelopment' }
    ],
    de: [
        { name: 'Meditation', emoji: '🧘', category: 'health' },
        { name: 'Bewegung', emoji: '💪', category: 'health' },
        { name: 'Wasser trinken', emoji: '💧', category: 'health' },
        { name: 'Lesen', emoji: '📚', category: 'education' },
        { name: 'Gesunder Schlaf', emoji: '😴', category: 'health' },
        { name: 'Ernährung', emoji: '🥗', category: 'health' },
        { name: 'Lernen', emoji: '🎓', category: 'education' },
        { name: 'Arbeit', emoji: '💼', category: 'productivity' },
        { name: 'Dankbarkeit', emoji: '🙏', category: 'selfDevelopment' }
    ]
};

/**
 * Получить предложенные привычки для текущего языка
 */
function getSuggestedHabits() {
    const language = i18n.currentLanguage;
    return suggestedHabits[language] || suggestedHabits['ru'];
}

// Создание глобального экземпляра
const habitsManager = new HabitsManager();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    habitsManager.init();
});
