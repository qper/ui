// ===================================
// ГЛАВНАЯ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ===================================

/**
 * Инициализация приложения
 */
class Application {
    constructor() {
        this.isInitialized = false;
    }
    
    /**
     * Инициализировать приложение
     */
    async init() {
        try {
            Logger.log('Initializing application...');
            
            // 1. Инициализировать i18n
            i18n.init();
            Logger.log('i18n initialized');
            
            // 2. Инициализировать Auth Manager
            authManager.init();
            Logger.log('Auth Manager initialized');
            
            // 3. Инициализировать Habits Manager
            habitsManager.init();
            Logger.log('Habits Manager initialized');
            
            // 4. Инициализировать Calendar Manager
            calendarManager.init();
            Logger.log('Calendar Manager initialized');
            
            // 5. Инициализировать Dashboard Manager
            dashboardManager.init();
            Logger.log('Dashboard Manager initialized');
            
            // 6. Инициализировать Page Manager
            this.initializePageManager();
            Logger.log('Page Manager initialized');
            
            // 7. Проверить соединение
            await this.checkConnectivity();
            
            this.isInitialized = true;
            Logger.log('Application initialized successfully');
        } catch (error) {
            Logger.error('Error initializing application:', error);
            showToast(i18n.t('messages.loadingError'), 'error');
        }
    }
    
    /**
     * Инициализировать Page Manager
     */
    initializePageManager() {
        // Показать Dashboard по умолчанию
        pageManager.navigateTo('dashboard');
        
        // Добавить слушатели к кнопкам навигации
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const pageName = btn.dataset.page;
                pageManager.navigateTo(pageName);
            });
        });
    }
    
    /**
     * Проверить соединение
     */
    async checkConnectivity() {
        const isOnline = navigator.onLine;
        
        if (!isOnline) {
            showToast(i18n.t('messages.offline'), 'warning');
        }
        
        // Слушать изменения соединения
        window.addEventListener('online', () => {
            showToast('Соединение восстановлено', 'success');
        });
        
        window.addEventListener('offline', () => {
            showToast(i18n.t('messages.offline'), 'warning');
        });
    }
}

// Создание глобального экземпляра приложения
const app = new Application();

// ===================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
    // Инициализировать приложение
    await app.init();
    
    // Установить обработчик глобальных ошибок
    window.addEventListener('error', (event) => {
        Logger.error('Global error:', event.error);
        showToast('Произошла ошибка приложения', 'error');
    });
    
    // Установить обработчик необработанных Promise ошибок
    window.addEventListener('unhandledrejection', (event) => {
        Logger.error('Unhandled promise rejection:', event.reason);
        showToast('Ошибка: ' + event.reason, 'error');
    });
});

// ===================================
// СЕРВИС ВОРКЕР ДЛЯ PWA (ОПЦИОНАЛЬНО)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => Logger.log('ServiceWorker registered:', registration),
            error => Logger.warn('ServiceWorker registration failed:', error)
        );
    });
}

// ===================================
// ОБРАБОТЧИКИ ГОРЯЧИХ КЛАВИШ
// ===================================

document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + S: сохранить
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        Logger.log('Save shortcut triggered');
    }
    
    // Esc: закрыть модальное окно
    if (e.key === 'Escape') {
        hideConfirmModal();
    }
});

// ===================================
// ПРОВЕРКА ВЕРСИИ ПРИ ОБНОВЛЕНИИ
// ===================================

const APP_VERSION = '1.0.0';

function checkForUpdates() {
    const storedVersion = localStorage.getItem('app-version');
    
    if (storedVersion !== APP_VERSION) {
        localStorage.setItem('app-version', APP_VERSION);
        Logger.log('App updated to version:', APP_VERSION);
        showToast('Приложение обновлено', 'info');
    }
}

checkForUpdates();

// ===================================
// ЭКСПОРТ ДЛЯ ТЕСТИРОВАНИЯ
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        app,
        authManager,
        habitsManager,
        calendarManager,
        dashboardManager,
        statisticsManager,
        pageManager,
        i18n
    };
}
