// ===================================
// УПРАВЛЕНИЕ UI И УВЕДОМЛЕНИЯМИ
// ===================================

/**
 * Показать уведомление (Toast)
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    container.appendChild(toast);
    
    // Автоудаление
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Показать модальное окно подтверждения
 */
function showConfirmModal(title, message, onConfirm, onCancel = null) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('confirm-modal');
    
    if (!overlay || !modal) return;
    
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    
    const confirmBtn = modal.querySelector('.btn-confirm');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // Удалить старые слушатели
    const newConfirmBtn = confirmBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    
    // Новые слушатели
    newConfirmBtn.addEventListener('click', () => {
        onConfirm();
        hideConfirmModal();
    });
    
    newCancelBtn.addEventListener('click', () => {
        if (onCancel) onCancel();
        hideConfirmModal();
    });
    
    // Показать модальное окно
    overlay.style.display = 'block';
    modal.style.display = 'flex';
}

/**
 * Скрыть модальное окно подтверждения
 */
function hideConfirmModal() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('confirm-modal');
    
    if (overlay) overlay.style.display = 'none';
    if (modal) modal.style.display = 'none';
}

/**
 * Показать загрузку
 */
function showLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'flex';
}

/**
 * Скрыть загрузку
 */
function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
}

/**
 * Переключить видимость элемента
 */
function toggleVisibility(element) {
    if (!element) return;
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

/**
 * Управление табами/страницами
 */
class PageManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.pages = {
            'dashboard': () => dashboardManager.render(),
            'add-habit': () => this.renderAddHabitPage(),
            'statistics': () => this.renderStatisticsPage(),
            'profile': () => this.renderProfilePage(),
            'settings': () => this.renderSettingsPage()
        };
    }
    
    /**
     * Перейти на страницу
     */
    navigateTo(pageName) {
        if (!this.pages[pageName]) {
            Logger.warn('Page not found:', pageName);
            return;
        }
        
        this.currentPage = pageName;
        
        // Обновить активную кнопку навигации
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('nav-btn-active', btn.dataset.page === pageName);
        });
        
        // Рендер страницы
        this.pages[pageName]();
    }
    
    /**
     * Рендер страницы добавления привычки
     */
    async renderAddHabitPage() {
        const suggestedList = getSuggestedHabits()
            .map((habit, index) => `
                <button class="btn btn-secondary btn-add-suggested" data-index="${index}">
                    ${habit.emoji} ${habit.name}
                </button>
            `).join('');
        
        const html = `
            <div class="container">
                <h1>${i18n.t('habits.addNew')}</h1>
                
                <div class="form">
                    <div class="form-group">
                        <label>${i18n.t('habits.name')}</label>
                        <input type="text" class="form-control" id="habit-name" 
                               placeholder="Введите название...">
                    </div>
                    
                    <div class="form-group">
                        <label>${i18n.t('habits.emoji')}</label>
                        <div class="emoji-picker" id="emoji-picker">
                            ${this.getEmojiList().map(emoji => `
                                <button class="emoji-option" data-emoji="${emoji}">${emoji}</button>
                            `).join('')}
                        </div>
                        <input type="hidden" id="habit-emoji" value="✓">
                    </div>
                    
                    <div class="form-group">
                        <label>${i18n.t('habits.category')}</label>
                        <select class="form-control" id="habit-category">
                            <option value="health">${i18n.t('habits.categories.health')}</option>
                            <option value="productivity">${i18n.t('habits.categories.productivity')}</option>
                            <option value="education">${i18n.t('habits.categories.education')}</option>
                            <option value="finance">${i18n.t('habits.categories.finance')}</option>
                            <option value="selfDevelopment">${i18n.t('habits.categories.selfDevelopment')}</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>${i18n.t('habits.description')}</label>
                        <textarea class="form-control" id="habit-description" 
                                  placeholder="Дополнительное описание..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-secondary" id="cancel-habit">${i18n.t('habits.cancel')}</button>
                        <button class="btn btn-primary" id="save-habit">${i18n.t('habits.save')}</button>
                    </div>
                </div>
                
                <div class="mt-lg">
                    <h2>${i18n.t('habits.suggestedHabits')}</h2>
                    <div class="btn-group">${suggestedList}</div>
                </div>
            </div>
        `;
        
        document.getElementById('page-content').innerHTML = html;
        this.attachAddHabitListeners();
    }
    
    /**
     * Рендер страницы статистики
     */
    async renderStatisticsPage() {
        await statisticsManager.getStatistics(30);
        const stats = statisticsManager.statisticsData;
        
        const bestHabit = statisticsManager.getBestHabit();
        const worstHabit = statisticsManager.getWorstHabit();
        const overallCompletion = statisticsManager.getOverallCompletion().toFixed(0);
        
        let habitsStatsHtml = '';
        for (const [_, data] of Object.entries(stats.completionByHabit)) {
            habitsStatsHtml += `
                <div class="habit-stat-row">
                    <div class="habit-stat-icon">${data.emoji}</div>
                    <div class="habit-stat-info">
                        <div class="habit-stat-name">${data.name}</div>
                        <div class="habit-stat-progress">
                            <div class="habit-stat-progress-bar">
                                <div class="habit-stat-progress-fill" 
                                     style="width: ${data.percentage}%"></div>
                            </div>
                            <div class="habit-stat-percentage">${data.percentage.toFixed(0)}%</div>
                        </div>
                        <div class="habit-stat-streak">🔥 ${data.streak} дней</div>
                    </div>
                </div>
            `;
        }
        
        const html = `
            <div class="container statistics-container">
                <h1>${i18n.t('statistics.title')}</h1>
                
                <div class="stats-filters">
                    <button class="filter-btn active" data-filter="week">${i18n.t('statistics.week')}</button>
                    <button class="filter-btn" data-filter="month">${i18n.t('statistics.month')}</button>
                </div>
                
                <div class="stats-overview">
                    <div class="stat-box">
                        <div class="stat-box-value">${overallCompletion}%</div>
                        <div class="stat-box-label">${i18n.t('statistics.overall')}</div>
                    </div>
                    ${bestHabit ? `
                        <div class="stat-box">
                            <div class="stat-box-value">${bestHabit.emoji}</div>
                            <div class="stat-box-label">${bestHabit.name}</div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="chart-container">
                    <h2>${i18n.t('statistics.chartTitle')}</h2>
                    <div class="chart-bars" id="stats-chart">
                        <!-- Графики будут добавлены здесь -->
                    </div>
                </div>
                
                <div class="card">
                    <h2>${i18n.t('statistics.completionRate')}</h2>
                    ${habitsStatsHtml || '<p>Нет данных</p>'}
                </div>
            </div>
        `;
        
        document.getElementById('page-content').innerHTML = html;
    }
    
    /**
     * Рендер страницы профиля
     */
    renderProfilePage() {
        const user = authManager.getCurrentUser();
        const email = user?.email || 'Loading...';
        
        const html = `
            <div class="container">
                <div class="profile-header">
                    <div class="profile-avatar">👤</div>
                    <div class="profile-name">${user?.displayName || 'Пользователь'}</div>
                    <div class="profile-email">${email}</div>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <div class="profile-stat-value">0</div>
                            <div class="profile-stat-label">${i18n.t('profile.totalDays')}</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${habitsManager.getHabits().length}</div>
                            <div class="profile-stat-label">${i18n.t('profile.totalHabits')}</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">🔥</div>
                            <div class="profile-stat-label">Серия</div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <button class="btn btn-block btn-danger" id="logout-btn">${i18n.t('profile.logout')}</button>
                </div>
            </div>
        `;
        
        document.getElementById('page-content').innerHTML = html;
        
        document.getElementById('logout-btn')?.addEventListener('click', async () => {
            if (await authManager.signOut()) {
                showToast(i18n.t('messages.success'), 'success');
            }
        });
    }
    
    /**
     * Рендер страницы настроек
     */
    renderSettingsPage() {
        const html = `
            <div class="container">
                <h1>${i18n.t('settings.title')}</h1>
                
                <div class="settings-section">
                    <h2 class="settings-section-title">${i18n.t('settings.general')}</h2>
                    
                    <div class="settings-item">
                        <div class="settings-label">
                            <div class="settings-label-main">${i18n.t('settings.language')}</div>
                        </div>
                        <select class="form-control" id="language-select" style="width: 120px;">
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                    
                    <div class="settings-item">
                        <div class="settings-label">
                            <div class="settings-label-main">${i18n.t('settings.editableDaysCount')}</div>
                            <div class="settings-label-sub">${i18n.t('settings.editableDaysCountHint')}</div>
                        </div>
                        <div class="number-input">
                            <button id="decrease-days">-</button>
                            <input type="number" id="days-input" value="1" min="1" max="30">
                            <button id="increase-days">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('page-content').innerHTML = html;
        
        // Обработчики
        document.getElementById('language-select')?.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
            // Перезагрузить интерфейс
            this.navigateTo(this.currentPage);
        });
    }
    
    /**
     * Получить список эмодзи
     */
    getEmojiList() {
        return ['😀', '🎉', '💪', '🧘', '🏃', '📚', '💼', '🎵', '🎨', '🚀', 
                '⭐', '🌟', '✨', '❤️', '💚', '💙', '👍', '🙌', '🎯', '🏆',
                '🌈', '🌻', '🍎', '☕', '🥗', '💧', '😴', '🚴', '🏊', '🧗',
                '📝', '📖', '✏️', '🎓', '🔬', '🎯', '💡', '🤔', '😊', '🥳',
                '🎁', '🎊', '🌺', '🦋', '🐝', '🌙', '☀️', '🌤️', '⛅', '🌦️',
                '🏖️', '🏔️', '🌲', '🌳', '🌴', '🎪', '🎭', '🎬', '🎤', '🎸'];
    }
    
    /**
     * Прикрепить слушатели добавления привычки
     */
    attachAddHabitListeners() {
        // Выбор эмодзи
        document.querySelectorAll('.emoji-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.emoji-option').forEach(b => 
                    b.classList.remove('selected'));
                btn.classList.add('selected');
                document.getElementById('habit-emoji').value = btn.dataset.emoji;
            });
        });
        
        // Предложенные привычки
        document.querySelectorAll('.btn-add-suggested').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(btn.dataset.index);
                const suggested = getSuggestedHabits()[index];
                
                document.getElementById('habit-name').value = suggested.name;
                document.getElementById('habit-emoji').value = suggested.emoji;
                document.getElementById('habit-category').value = suggested.category;
                
                // Подсветить выбранный эмодзи
                document.querySelectorAll('.emoji-option').forEach(opt => {
                    opt.classList.toggle('selected', opt.dataset.emoji === suggested.emoji);
                });
            });
        });
        
        // Сохранить привычку
        document.getElementById('save-habit')?.addEventListener('click', async () => {
            const name = document.getElementById('habit-name').value.trim();
            const emoji = document.getElementById('habit-emoji').value;
            const category = document.getElementById('habit-category').value;
            const description = document.getElementById('habit-description').value.trim();
            
            if (!name) {
                showToast('Введите название привычки', 'warning');
                return;
            }
            
            await habitsManager.addHabit({ name, emoji, category, description });
            this.navigateTo('dashboard');
        });
        
        // Отмена
        document.getElementById('cancel-habit')?.addEventListener('click', () => {
            this.navigateTo('dashboard');
        });
    }
}

// Создание глобального экземпляра
const pageManager = new PageManager();

// Инициализация навигации
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            pageManager.navigateTo(btn.dataset.page);
        });
    });
});
