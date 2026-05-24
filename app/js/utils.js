// ===================================
// УТИЛИТЫ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===================================

/**
 * Форматирование даты в строку YYYY-MM-DD
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Парсинг строки даты YYYY-MM-DD в Date объект
 */
function parseDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Получить дату за N дней
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Получить день недели (0 = пн, 6 = вс)
 */
function getDayOfWeek(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

/**
 * Получить дату начала недели (понедельник)
 */
function getWeekStart(date) {
    const dayOfWeek = getDayOfWeek(date);
    return addDays(date, -dayOfWeek);
}

/**
 * Получить массив дней текущей недели
 */
function getWeekDays(date = new Date()) {
    const start = getWeekStart(date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/**
 * Получить начало месяца
 */
function getMonthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Получить конец месяца
 */
function getMonthEnd(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Получить все дни месяца с дополнением предыдущего и следующего месяца
 */
function getMonthCalendar(date) {
    const monthStart = getMonthStart(date);
    const monthEnd = getMonthEnd(date);
    const startWeek = getWeekStart(monthStart);
    const endWeek = addDays(monthEnd, 7 - getDayOfWeek(monthEnd));
    
    const days = [];
    let current = startWeek;
    while (current <= endWeek) {
        days.push(new Date(current));
        current = addDays(current, 1);
    }
    return days;
}

/**
 * Проверка, является ли дата сегодня
 */
function isToday(date) {
    const today = new Date();
    return formatDate(date) === formatDate(today);
}

/**
 * Проверка, находится ли дата в прошлом
 */
function isPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
}

/**
 * Проверка, находится ли дата в будущем
 */
function isFuture(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
}

/**
 * Получить название дня недели
 */
function getDayName(date, locale = 'ru') {
    const options = { weekday: 'long' };
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', options);
}

/**
 * Получить название месяца
 */
function getMonthName(date, locale = 'ru') {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', options);
}

/**
 * Форматирование для отображения (День, дата)
 */
function formatDateDisplay(date, locale = 'ru') {
    const dayName = getDayName(date, locale);
    const day = date.getDate();
    return `${dayName}, ${day}`;
}

/**
 * Генерация UUID
 */
function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Глубокое копирование объекта
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
}

/**
 * Проверка, пуст ли объект
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Объединение объектов
 */
function mergeObjects(target, source) {
    return { ...target, ...source };
}

/**
 * Дебаунс функции
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Троттлинг функции
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Задержка (promise-based)
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Перемешивание массива (Fisher-Yates)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Валидация email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Валидация URL
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Локальное хранилище с истечением
 */
class LocalStorageWithExpiry {
    static setItem(key, value, expiryMs) {
        const item = {
            value: value,
            expiry: expiryMs ? Date.now() + expiryMs : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    static getItem(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        try {
            const parsed = JSON.parse(item);
            if (parsed.expiry && parsed.expiry < Date.now()) {
                localStorage.removeItem(key);
                return null;
            }
            return parsed.value;
        } catch (e) {
            return null;
        }
    }
    
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    
    static clear() {
        localStorage.clear();
    }
}

/**
 * Логирование с уровнями
 */
const Logger = {
    log: (msg, data = '') => console.log(`[LOG] ${msg}`, data),
    info: (msg, data = '') => console.info(`[INFO] ${msg}`, data),
    warn: (msg, data = '') => console.warn(`[WARN] ${msg}`, data),
    error: (msg, data = '') => console.error(`[ERROR] ${msg}`, data),
    debug: (msg, data = '') => console.debug(`[DEBUG] ${msg}`, data)
};

/**
 * Проверка подключения к интернету
 */
async function checkConnectivity() {
    try {
        const response = await fetch('https://www.google.com', { mode: 'no-cors' });
        return response.ok || response.type === 'opaque';
    } catch (e) {
        return false;
    }
}

/**
 * Обработчик ошибок для отправки запросов
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (error) {
            lastError = error;
            if (i < retries - 1) {
                await delay(Math.pow(2, i) * 1000);
            }
        }
    }
    
    throw lastError;
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate, parseDate, addDays, getDayOfWeek, getWeekStart, getWeekDays,
        getMonthStart, getMonthEnd, getMonthCalendar, isToday, isPast, isFuture,
        getDayName, getMonthName, formatDateDisplay, generateUID, deepClone,
        isEmpty, mergeObjects, debounce, throttle, delay, shuffleArray,
        isValidEmail, isValidUrl, LocalStorageWithExpiry, Logger,
        checkConnectivity, fetchWithRetry
    };
}
