// ===================================
// АУТЕНТИФИКАЦИЯ
// ===================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authUI = null;
        this.listeners = [];
    }
    
    /**
     * Инициализация аутентификации
     */
    init() {
        auth.onAuthStateChanged(user => {
            this.currentUser = user;
            this.notifyListeners();
            this.handleAuthStateChange(user);
        });
    }
    
    /**
     * Установка слушателя изменения статуса аутентификации
     */
    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        // Вызвать сразу если пользователь уже загружен
        if (this.currentUser !== null) {
            callback(this.currentUser);
        }
    }
    
    /**
     * Уведомление слушателей
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentUser));
    }
    
    /**
     * Обработка изменения статуса аутентификации
     */
    handleAuthStateChange(user) {
        const loadingScreen = document.getElementById('loading-screen');
        const authScreen = document.getElementById('auth-screen');
        const appMain = document.getElementById('app-main');
        
        if (user) {
            // Пользователь авторизован
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (authScreen) authScreen.style.display = 'none';
            if (appMain) appMain.style.display = 'flex';
            
            // Загрузить данные пользователя
            this.initializeUserData(user);
            
            Logger.log('User authenticated:', user.email);
        } else {
            // Пользователь не авторизован
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (authScreen) authScreen.style.display = 'flex';
            if (appMain) appMain.style.display = 'none';
            
            // Инициализировать FirebaseUI
            this.initializeFirebaseUI();
            
            Logger.log('User not authenticated');
        }
    }
    
    /**
     * Инициализация FirebaseUI
     */
    initializeFirebaseUI() {
        if (!firebaseui.auth.AuthUI.getInstance()) {
            this.authUI = new firebaseui.auth.AuthUI(auth);
        } else {
            this.authUI = firebaseui.auth.AuthUI.getInstance();
        }
        
        this.authUI.start('#firebaseui-auth-container', uiConfig);
    }
    
    /**
     * Инициализация данных пользователя
     */
    async initializeUserData(user) {
        try {
            const userRef = db.collection('users').doc(user.uid);
            const userDoc = await userRef.get();
            
            if (!userDoc.exists) {
                // Создать профиль пользователя
                await userRef.set({
                    email: user.email,
                    displayName: user.displayName || '',
                    avatar: user.photoURL || '',
                    createdAt: new Date(),
                    settings: {
                        editableDaysCount: 1,
                        calendarView: 'week',
                        notificationsEnabled: true,
                        theme: 'light',
                        language: i18n.currentLanguage
                    },
                    stats: {
                        totalDaysTracked: 0,
                        totalHabits: 0,
                        createdHabitCount: 0
                    }
                });
                
                Logger.log('User profile created');
            }
        } catch (error) {
            Logger.error('Error initializing user data:', error);
        }
    }
    
    /**
     * Выход из аккаунта
     */
    async signOut() {
        try {
            await auth.signOut();
            this.currentUser = null;
            this.notifyListeners();
            Logger.log('User signed out');
            return true;
        } catch (error) {
            Logger.error('Error signing out:', error);
            return false;
        }
    }
    
    /**
     * Получить текущего пользователя
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Получить ID текущего пользователя
     */
    getCurrentUserId() {
        return this.currentUser ? this.currentUser.uid : null;
    }
    
    /**
     * Проверить, авторизован ли пользователь
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    /**
     * Получить email текущего пользователя
     */
    getCurrentUserEmail() {
        return this.currentUser ? this.currentUser.email : null;
    }
    
    /**
     * Обновить профиль пользователя
     */
    async updateUserProfile(displayName, photoURL = null) {
        try {
            await this.currentUser.updateProfile({
                displayName: displayName,
                photoURL: photoURL
            });
            
            Logger.log('User profile updated');
            return true;
        } catch (error) {
            Logger.error('Error updating profile:', error);
            return false;
        }
    }
    
    /**
     * Обновить email пользователя
     */
    async updateUserEmail(newEmail) {
        try {
            await this.currentUser.updateEmail(newEmail);
            Logger.log('User email updated');
            return true;
        } catch (error) {
            Logger.error('Error updating email:', error);
            return false;
        }
    }
    
    /**
     * Обновить пароль пользователя
     */
    async updateUserPassword(newPassword) {
        try {
            await this.currentUser.updatePassword(newPassword);
            Logger.log('User password updated');
            return true;
        } catch (error) {
            Logger.error('Error updating password:', error);
            return false;
        }
    }
    
    /**
     * Отправить письмо для восстановления пароля
     */
    async sendPasswordResetEmail(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            Logger.log('Password reset email sent');
            return true;
        } catch (error) {
            Logger.error('Error sending password reset email:', error);
            return false;
        }
    }
    
    /**
     * Удалить аккаунт пользователя
     */
    async deleteUserAccount() {
        try {
            const userId = this.getCurrentUserId();
            
            // Удалить данные из Firestore
            await db.collection('users').doc(userId).delete();
            
            // Удалить аккаунт из Firebase Auth
            await this.currentUser.delete();
            
            this.currentUser = null;
            this.notifyListeners();
            
            Logger.log('User account deleted');
            return true;
        } catch (error) {
            Logger.error('Error deleting account:', error);
            return false;
        }
    }
}

// Создание глобального экземпляра
const authManager = new AuthManager();

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    authManager.init();
});
