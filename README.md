# Weather App

Это приложение позволяет пользователям получать прогноз погоды на 5 дней для различных городов с помощью графического интерфейса. Вы можете добавлять несколько городов для сравнения погодных данных, выбирать тип отображаемых данных (температура, давление, влажность и т.д.) и менять гранулярность графика (3 часа или день).

## Инструкция по установке и запуску

### 1. Клонирование репозитория

```bash
  git clone https://github.com/Slupell/weather.git
  cd your-repository-name
```

### 2. Установка зависимостей

```bash
  npm install
```

### 3. Настройка переменных окружения

Для работы с API необходим API-ключ, добавьте его в `.env` файл в корне проекта

```js
VITE_WEATHERMAP_API_KEY=your_api_key
```

Замените `your_api_key` на ваш реальный API-ключ.

### 4. Запуск проекта

```bash
  npm run dev
```

## Основные функции приложения

- Добавление городов : Введите название города и нажмите "Add City".
- Выбор типа данных : Выберите тип данных для графика (температура, давление, влажность, скорость ветра и т.д.).
- Изменение гранулярности : Переключайтесь между гранулярностью "3 часа" и "день".
- Удаление городов : Нажмите кнопку "Remove" рядом с городом, чтобы удалить его из списка.
- Сравнение городов : Добавьте несколько городов для визуального сравнения их погодных данных.

## Технологии

- Фреймворк : React + TypeScript
- Сборщик : Vite
- CSS : Styled Components
- Графики : Recharts
- API : OpenWeatherMap
