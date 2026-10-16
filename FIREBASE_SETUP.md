# Настройка Firebase для МТС сайта

## Шаг 1: Создание проекта Firebase

1. Перейдите на https://console.firebase.google.com/
2. Нажмите "Добавить проект" (или "Create project")
3. Введите название проекта (например, "mts-website")
4. Отключите Google Analytics (не обязательно)
5. Нажмите "Создать проект" (Create project)

## Шаг 2: Добавление веб-приложения

1. В проекте нажмите иконку `</>` (Web)
2. Введите nickname приложения (например, "mts-site")
3. **Не ставьте галочку** "Настроить Firebase Hosting" (мы используем Pages)
4. Нажмите "Зарегистрировать приложение" (Register app)
5. Скопируйте объект `firebaseConfig` — он понадобится позже

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mts-website.firebaseapp.com",
  projectId: "mts-website",
  storageBucket: "mts-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Шаг 3: Включение аутентификации

1. В левой панели выберите **Authentication** → **Get started**
2. Перейдите на вкладку **Sign-in method**
3. Включите **Email/Password**
4. Включите **Google** (опционально)

## Шаг 4: Создание базы данных Firestore

1. В левой панели выберите **Firestore Database** → **Create database**
2. Выберите режим **Production** (или Test mode для разработки)
3. Выберите регион (ближайший к вам)
4. Нажмите **Enable**

## Шаг 5: Настройка правил безопасности

В консоли Firestore перейдите на вкладку **Rules** и вставьте:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи могут читать/писать только свои данные
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Пользователи могут создавать заказы, читать только свои
    match /esimOrders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
      allow update, delete: if false; // Только администратор может удалять
    }
  }
}
```

## Шаг 6: Подключение к сайту

Откройте файл `index.html` и замените значения `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_PROJECT_ID.firebaseapp.com",
  projectId: "ВАШ_PROJECT_ID",
  storageBucket: "ВАШ_PROJECT_ID.appspot.com",
  messagingSenderId: "ВАШ_SENDER_ID",
  appId: "ВАШ_APP_ID"
};
```

## Проверка подключения

1. Откройте сайт в браузере
2. Откройте DevTools (F12) → Console
3. Должно быть сообщение: ✅ Firebase подключён

Если ошибка — проверьте, что все поля config заполнены правильно.

## Что работает после настройки

- Регистрация по email + пароль
- Вход через Google
- Хранение данных пользователей в Firestore
- Оформление заказов eSIM
- История заказов пользователя
