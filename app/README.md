# Habit Tracker - Web Application

🎯 Приложение для отслеживания ежедневных привычек с облачной синхронизацией через Firebase.

## Функции

- 📅 **Календарное представление** привычек (неделя/месяц)
- ✅ **Отметка выполнения** привычек кликом
- 📊 **Детальная статистика** с графиками и сериями
- 🌍 **Мультиязычность** (Русский, English, Deutsch)
- ☁️ **Облачная синхронизация** через Firebase
- 📱 **Полностью адаптивный** для iPhone и всех размеров экранов
- 🎨 **Современный дизайн** с минималистичными спокойными цветами

## Технологический стек

- **Frontend**: HTML5, CSS3 (Grid, Flexbox, CSS Variables), Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **UI Library**: FirebaseUI для аутентификации
- **PWA**: Service Workers для offline функциональности

## Установка

### 1. Клонировать репозиторий

```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker/app
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить Firebase

1. Создать новый проект на [Firebase Console](https://console.firebase.google.com)
2. Получить конфигурацию проекта
3. Обновить `js/firebase-config.js` с вашими учётными данными:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

4. Обновить `.firebaserc`:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

5. Установить Firestore Security Rules (скопировать из `js/firebase-config.js`)

### 4. Запустить локально

```bash
npm run dev
# Откройте http://localhost:8000 в браузере
```

## Развёртывание

### На Firebase Hosting

```bash
firebase login
firebase deploy
```

## Структура проекта

```
app/
├── index.html              # Главная HTML-страница
├── css/
│   ├── styles.css         # Основные стили
│   ├── buttons.css        # Стили кнопок
│   ├── forms.css          # Стили форм
│   ├── cards.css          # Стили карточек
│   ├── calendar.css       # Стили календаря
│   ├── statistics.css     # Стили статистики
│   ├── dashboard.css      # Стили dashboard
│   ├── animations.css     # Анимации
│   └── responsive.css     # Адаптивность
├── js/
│   ├── main.js            # Инициализация
│   ├── utils.js           # Утилиты
│   ├── i18n.js            # Интернационализация
│   ├── firebase-config.js # Конфиг Firebase
│   ├── auth.js            # Аутентификация
│   ├── habits.js          # Управление привычками
│   ├── calendar.js        # Логика календаря
│   ├── dashboard.js       # Логика dashboard
│   ├── statistics.js      # Логика статистики
│   └── ui.js              # Управление UI
├── assets/
│   ├── icons/             # SVG иконки
│   └── images/            # Изображения
├── package.json           # Зависимости
├── firebase.json          # Конфиг Firebase Hosting
├── .firebaserc            # Конфиг проекта Firebase
└── README.md              # Этот файл
```

## Использование

### Первый запуск

1. Откройте приложение
2. Зарегистрируйтесь или войдите через FirebaseUI
3. Добавьте свою первую привычку
4. Отмечайте выполнение привычек каждый день

### Основные функции

#### Dashboard (Главная)
- Просмотр привычек текущей недели/месяца
- Клик для отметки привычки как выполненной
- Навигация по датам

#### Добавление привычки
- Выберите название и эмодзи
- Категоризируйте (Здоровье, Продуктивность, и т.д.)
- Добавьте описание (опционально)

#### Статистика
- Процент выполнения всех привычек
- График выполнения за месяц
- Лучшая и худшая привычка
- Серии выполнения (streaks)

#### Профиль
- Информация о пользователе
- Общая статистика
- Выход из аккаунта

#### Настройки
- Выбор языка
- Количество дней для редактирования
- Вид календаря (неделя/месяц)

## Безопасность

- Все данные защищены Firestore Security Rules
- Пользователи могут видеть и редактировать только свои данные
- Пароли управляются Firebase Authentication

## Браузерная поддержка

- iOS Safari 12+
- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari на macOS 10.15+

## Планы развития

- [ ] Push-уведомления
- [ ] Темная тема
- [ ] Экспорт данных
- [ ] Интеграция с Apple Health / Google Fit
- [ ] Достижения и бейджи
- [ ] Социальный аспект

## Лицензия

MIT License - смотрите [LICENSE](LICENSE) файл для деталей

## Контрибьютинг

Приветствуются pull requests. Для больших изменений сначала откройте issue.

## Поддержка

Если у вас есть вопросы или проблемы, пожалуйста, откройте issue на GitHub.

---

**Made with ❤️ for habit tracking**
