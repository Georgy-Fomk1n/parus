# Клуб «Парус»

Сайт клуба «Парус» — одностраничное приложение на React, встроенное в бэкенд Laravel. Laravel отдаёт SPA-оболочку (`resources/views/app.blade.php`) и статику, вся маршрутизация страниц (главная, каталог кружков, карточка кружка, мероприятия, о клубе и т.д.) реализована на клиенте через `react-router-dom`.

## Стек

- **Backend:** PHP 8.3+, Laravel 13
- **Frontend:** React 19, Vite, Tailwind CSS 4
- **База данных:** SQLite (по умолчанию)

## Требования

Перед началом убедитесь, что установлены:

- PHP >= 8.3 с расширениями, необходимыми Laravel (в т.ч. `pdo_sqlite`)
- Composer 2
- Node.js >= 20 и npm

## Установка

1. Клонируйте репозиторий и перейдите в папку проекта:

   ```bash
   git clone https://github.com/IgnatTOP/parus.git
   cd parus
   ```

2. Установите PHP-зависимости:

   ```bash
   composer install
   ```

3. Скопируйте файл окружения и сгенерируйте ключ приложения:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Создайте файл SQLite-базы и накатите миграции:

   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

5. Установите JS-зависимости:

   ```bash
   npm install
   ```

> Шаги 2–5 можно выполнить одной командой: `composer run setup`.

## Запуск в режиме разработки

Самый простой способ — одна команда, которая поднимет PHP-сервер, очередь, логи (`pail`) и Vite-дев-сервер параллельно:

```bash
composer run dev
```

Либо запустить вручную в двух терминалах:

```bash
php artisan serve
npm run dev
```

По умолчанию сайт будет доступен на `http://localhost:8000`.

## Сборка для продакшена

```bash
npm run build
```

Собранные файлы попадут в `public/build` и будут автоматически подхвачены Blade-шаблоном.

## Тесты

```bash
composer run test
```

## Полезные пути в проекте

- `resources/js/pages` — страницы SPA
- `resources/js/sections` — переиспользуемые блоки страниц
- `resources/js/components` — общие UI-компоненты
- `resources/js/data/site.js` — контент/данные сайта
- `public/parus-media` — изображения и графика сайта
- `routes/web.php` — единственный catch-all роут, отдающий SPA
- `TZ дизайн.md` — техническое задание по дизайну
- `scripts/archive_klubparus.py` — вспомогательный скрипт для архивации исходного сайта (не используется приложением в рантайме)

## Линтер стиля кода PHP

```bash
vendor/bin/pint
```
