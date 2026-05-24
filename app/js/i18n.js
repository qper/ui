// ===================================
// ИНТЕРНАЦИОНАЛИЗАЦИЯ (i18n)
// ===================================

const i18n = {
    currentLanguage: 'ru',
    
    // Словари языков
    translations: {
        ru: {
            // Навигация
            nav: {
                home: 'Главная',
                add: 'Добавить',
                stats: 'Статистика',
                profile: 'Профиль',
                settings: 'Настройки'
            },
            
            // Аутентификация
            auth: {
                title: 'Habit Tracker',
                subtitle: 'Отслеживай свои привычки и достигай целей',
                signIn: 'Вход',
                signUp: 'Регистрация',
                signOut: 'Выход',
                email: 'Email',
                password: 'Пароль',
                passwordConfirm: 'Подтвердить пароль',
                forgotPassword: 'Забыли пароль?'
            },
            
            // Dashboard
            dashboard: {
                title: 'Мой трэкер',
                weekView: 'Неделя',
                monthView: 'Месяц',
                today: 'Сегодня',
                previous: 'Назад',
                next: 'Далее',
                noHabits: 'Нет привычек',
                addHabitHint: 'Добавьте первую привычку'
            },
            
            // Привычки
            habits: {
                title: 'Привычки',
                add: 'Добавить привычку',
                addNew: 'Новая привычка',
                edit: 'Редактировать',
                delete: 'Удалить',
                name: 'Название',
                emoji: 'Эмодзи',
                category: 'Категория',
                description: 'Описание',
                reminderTime: 'Время напоминания',
                save: 'Сохранить',
                cancel: 'Отмена',
                suggestedHabits: 'Предложенные привычки',
                completed: 'Выполнена',
                notCompleted: 'Не выполнена',
                noHabits: 'Привычек нет',
                
                // Категории
                categories: {
                    health: 'Здоровье',
                    productivity: 'Продуктивность',
                    education: 'Образование',
                    finance: 'Финансы',
                    selfDevelopment: 'Саморазвитие'
                },
                
                // Предложенные привычки
                suggested: {
                    meditation: 'Медитация',
                    exercise: 'Упражнение',
                    water: 'Выпить воду',
                    reading: 'Чтение',
                    sleep: 'Здоровый сон',
                    nutrition: 'Питание',
                    learning: 'Обучение',
                    work: 'Работа',
                    gratitude: 'Благодарность'
                }
            },
            
            // Статистика
            statistics: {
                title: 'Статистика',
                overall: 'Общий процент',
                week: 'Неделя',
                month: 'Месяц',
                customRange: 'Свой диапазон',
                completionRate: 'Процент выполнения',
                bestHabit: 'Лучшая привычка',
                worstHabit: 'Худшая привычка',
                averageCompletion: 'Средний процент',
                streak: 'Серия дней',
                dayOfWeek: 'День недели',
                chartTitle: 'Выполнение за месяц',
                noData: 'Недостаточно данных'
            },
            
            // Профиль
            profile: {
                title: 'Профиль',
                email: 'Email',
                joinDate: 'Дата присоединения',
                statistics: 'Статистика',
                totalDays: 'Дней отслеживания',
                totalHabits: 'Привычек создано',
                settings: 'Настройки',
                logout: 'Выход'
            },
            
            // Настройки
            settings: {
                title: 'Настройки',
                general: 'Основные',
                editableDaysCount: 'Дней для редактирования',
                editableDaysCountHint: 'Сколько прошедших дней можно редактировать',
                calendarView: 'Вид календаря',
                notifications: 'Уведомления',
                language: 'Язык',
                theme: 'Тема',
                about: 'О приложении',
                deletedHabits: 'Удалённые привычки',
                restore: 'Восстановить',
                restore_all: 'Восстановить все'
            },
            
            // Модальные окна
            modal: {
                confirm: 'Подтверждение',
                deleteHabit: 'Вы уверены, что хотите удалить эту привычку?',
                deleteAll: 'Это действие нельзя отменить',
                confirmDelete: 'Удалить привычку',
                cancel: 'Отмена'
            },
            
            // Сообщения
            messages: {
                success: 'Успешно!',
                error: 'Ошибка',
                habitAdded: 'Привычка добавлена',
                habitUpdated: 'Привычка обновлена',
                habitDeleted: 'Привычка удалена',
                habitRestored: 'Привычка восстановлена',
                statusUpdated: 'Статус обновлён',
                settingsSaved: 'Настройки сохранены',
                loadingError: 'Ошибка загрузки данных',
                savingError: 'Ошибка сохранения',
                offline: 'Нет соединения'
            },
            
            // Дни недели
            days: {
                monday: 'Пн',
                tuesday: 'Вт',
                wednesday: 'Ср',
                thursday: 'Чт',
                friday: 'Пт',
                saturday: 'Сб',
                sunday: 'Вс'
            }
        },
        
        en: {
            nav: {
                home: 'Home',
                add: 'Add',
                stats: 'Stats',
                profile: 'Profile',
                settings: 'Settings'
            },
            auth: {
                title: 'Habit Tracker',
                subtitle: 'Track your habits and achieve your goals',
                signIn: 'Sign In',
                signUp: 'Sign Up',
                signOut: 'Sign Out',
                email: 'Email',
                password: 'Password',
                passwordConfirm: 'Confirm Password',
                forgotPassword: 'Forgot password?'
            },
            dashboard: {
                title: 'My Tracker',
                weekView: 'Week',
                monthView: 'Month',
                today: 'Today',
                previous: 'Previous',
                next: 'Next',
                noHabits: 'No habits',
                addHabitHint: 'Add your first habit'
            },
            habits: {
                title: 'Habits',
                add: 'Add Habit',
                addNew: 'New Habit',
                edit: 'Edit',
                delete: 'Delete',
                name: 'Name',
                emoji: 'Emoji',
                category: 'Category',
                description: 'Description',
                reminderTime: 'Reminder Time',
                save: 'Save',
                cancel: 'Cancel',
                suggestedHabits: 'Suggested Habits',
                completed: 'Completed',
                notCompleted: 'Not Completed',
                noHabits: 'No habits yet',
                categories: {
                    health: 'Health',
                    productivity: 'Productivity',
                    education: 'Education',
                    finance: 'Finance',
                    selfDevelopment: 'Self Development'
                },
                suggested: {
                    meditation: 'Meditation',
                    exercise: 'Exercise',
                    water: 'Drink Water',
                    reading: 'Reading',
                    sleep: 'Healthy Sleep',
                    nutrition: 'Nutrition',
                    learning: 'Learning',
                    work: 'Work',
                    gratitude: 'Gratitude'
                }
            },
            statistics: {
                title: 'Statistics',
                overall: 'Overall Percentage',
                week: 'Week',
                month: 'Month',
                customRange: 'Custom Range',
                completionRate: 'Completion Rate',
                bestHabit: 'Best Habit',
                worstHabit: 'Worst Habit',
                averageCompletion: 'Average Completion',
                streak: 'Days Streak',
                dayOfWeek: 'Day of Week',
                chartTitle: 'Monthly Performance',
                noData: 'Not enough data'
            },
            profile: {
                title: 'Profile',
                email: 'Email',
                joinDate: 'Join Date',
                statistics: 'Statistics',
                totalDays: 'Days Tracked',
                totalHabits: 'Habits Created',
                settings: 'Settings',
                logout: 'Logout'
            },
            settings: {
                title: 'Settings',
                general: 'General',
                editableDaysCount: 'Editable Days',
                editableDaysCountHint: 'How many past days can you edit',
                calendarView: 'Calendar View',
                notifications: 'Notifications',
                language: 'Language',
                theme: 'Theme',
                about: 'About',
                deletedHabits: 'Deleted Habits',
                restore: 'Restore',
                restore_all: 'Restore All'
            },
            modal: {
                confirm: 'Confirm',
                deleteHabit: 'Are you sure you want to delete this habit?',
                deleteAll: 'This action cannot be undone',
                confirmDelete: 'Delete Habit',
                cancel: 'Cancel'
            },
            messages: {
                success: 'Success!',
                error: 'Error',
                habitAdded: 'Habit added',
                habitUpdated: 'Habit updated',
                habitDeleted: 'Habit deleted',
                habitRestored: 'Habit restored',
                statusUpdated: 'Status updated',
                settingsSaved: 'Settings saved',
                loadingError: 'Error loading data',
                savingError: 'Error saving',
                offline: 'No connection'
            },
            days: {
                monday: 'Mon',
                tuesday: 'Tue',
                wednesday: 'Wed',
                thursday: 'Thu',
                friday: 'Fri',
                saturday: 'Sat',
                sunday: 'Sun'
            }
        },
        
        de: {
            nav: {
                home: 'Startseite',
                add: 'Hinzufügen',
                stats: 'Statistik',
                profile: 'Profil',
                settings: 'Einstellungen'
            },
            auth: {
                title: 'Habit Tracker',
                subtitle: 'Verfolge deine Gewohnheiten und erreiche deine Ziele',
                signIn: 'Anmelden',
                signUp: 'Registrieren',
                signOut: 'Abmelden',
                email: 'E-Mail',
                password: 'Passwort',
                passwordConfirm: 'Passwort bestätigen',
                forgotPassword: 'Passwort vergessen?'
            },
            dashboard: {
                title: 'Mein Tracker',
                weekView: 'Woche',
                monthView: 'Monat',
                today: 'Heute',
                previous: 'Zurück',
                next: 'Weiter',
                noHabits: 'Keine Gewohnheiten',
                addHabitHint: 'Füge deine erste Gewohnheit hinzu'
            },
            habits: {
                title: 'Gewohnheiten',
                add: 'Gewohnheit hinzufügen',
                addNew: 'Neue Gewohnheit',
                edit: 'Bearbeiten',
                delete: 'Löschen',
                name: 'Name',
                emoji: 'Emoji',
                category: 'Kategorie',
                description: 'Beschreibung',
                reminderTime: 'Erinnerungszeit',
                save: 'Speichern',
                cancel: 'Abbrechen',
                suggestedHabits: 'Empfohlene Gewohnheiten',
                completed: 'Abgeschlossen',
                notCompleted: 'Nicht abgeschlossen',
                noHabits: 'Noch keine Gewohnheiten',
                categories: {
                    health: 'Gesundheit',
                    productivity: 'Produktivität',
                    education: 'Bildung',
                    finance: 'Finanzen',
                    selfDevelopment: 'Selbstentwicklung'
                },
                suggested: {
                    meditation: 'Meditation',
                    exercise: 'Bewegung',
                    water: 'Wasser trinken',
                    reading: 'Lesen',
                    sleep: 'Gesunder Schlaf',
                    nutrition: 'Ernährung',
                    learning: 'Lernen',
                    work: 'Arbeit',
                    gratitude: 'Dankbarkeit'
                }
            },
            statistics: {
                title: 'Statistik',
                overall: 'Gesamtprozentsatz',
                week: 'Woche',
                month: 'Monat',
                customRange: 'Benutzerdefinierter Bereich',
                completionRate: 'Abschlussquote',
                bestHabit: 'Beste Gewohnheit',
                worstHabit: 'Schlechteste Gewohnheit',
                averageCompletion: 'Durchschnitt',
                streak: 'Tage Serie',
                dayOfWeek: 'Wochentag',
                chartTitle: 'Leistung des Monats',
                noData: 'Nicht genug Daten'
            },
            profile: {
                title: 'Profil',
                email: 'E-Mail',
                joinDate: 'Beitrittsdatum',
                statistics: 'Statistik',
                totalDays: 'Tage verfolgt',
                totalHabits: 'Gewohnheiten erstellt',
                settings: 'Einstellungen',
                logout: 'Abmelden'
            },
            settings: {
                title: 'Einstellungen',
                general: 'Allgemein',
                editableDaysCount: 'Bearbeitbare Tage',
                editableDaysCountHint: 'Wie viele vergangene Tage kannst du bearbeiten',
                calendarView: 'Kalenderansicht',
                notifications: 'Benachrichtigungen',
                language: 'Sprache',
                theme: 'Design',
                about: 'Über',
                deletedHabits: 'Gelöschte Gewohnheiten',
                restore: 'Wiederherstellen',
                restore_all: 'Alle wiederherstellen'
            },
            modal: {
                confirm: 'Bestätigung',
                deleteHabit: 'Bist du sicher, dass du diese Gewohnheit löschen möchtest?',
                deleteAll: 'Diese Aktion kann nicht rückgängig gemacht werden',
                confirmDelete: 'Gewohnheit löschen',
                cancel: 'Abbrechen'
            },
            messages: {
                success: 'Erfolg!',
                error: 'Fehler',
                habitAdded: 'Gewohnheit hinzugefügt',
                habitUpdated: 'Gewohnheit aktualisiert',
                habitDeleted: 'Gewohnheit gelöscht',
                habitRestored: 'Gewohnheit wiederhergestellt',
                statusUpdated: 'Status aktualisiert',
                settingsSaved: 'Einstellungen gespeichert',
                loadingError: 'Fehler beim Laden der Daten',
                savingError: 'Fehler beim Speichern',
                offline: 'Keine Verbindung'
            },
            days: {
                monday: 'Mo',
                tuesday: 'Di',
                wednesday: 'Mi',
                thursday: 'Do',
                friday: 'Fr',
                saturday: 'Sa',
                sunday: 'So'
            }
        }
    },
    
    /**
     * Инициализация i18n
     */
    init(language = 'ru') {
        this.currentLanguage = language;
        const saved = localStorage.getItem('app-language');
        if (saved) {
            this.currentLanguage = saved;
        } else {
            localStorage.setItem('app-language', this.currentLanguage);
        }
    },
    
    /**
     * Установка языка
     */
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('app-language', language);
            return true;
        }
        return false;
    },
    
    /**
     * Получение текста по ключу
     */
    t(key, defaultValue = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }
        
        return value || defaultValue || key;
    },
    
    /**
     * Получить название дня недели
     */
    getDayName(dayIndex) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return this.t(`days.${days[dayIndex]}`);
    },
    
    /**
     * Получить все языки
     */
    getLanguages() {
        return Object.keys(this.translations);
    }
};

// Инициализация по умолчанию
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
