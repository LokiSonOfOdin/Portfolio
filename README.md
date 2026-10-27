# Портфолио фронтенд-разработчика

Личный сайт-портфолио на React 19 + TypeScript + Vite с роутингом,
CSS Modules и переключением тёмной/светлой темы. Внутри живёт готовый
проект — конвертер изображений в WebP / AVIF, который можно открыть и
протестировать прямо на сайте.

## Стек

- **React 19** + **TypeScript** (React Compiler включён)
- **Vite 8** — сборка и dev-сервер
- **React Router 7** — маршрутизация (`react-router-dom`)
- **CSS Modules** — изолированные стили компонентов + глобальные токены тем
- **lucide-react** — иконки
- **@jsquash/webp**, **@jsquash/avif**, **JSZip** — конвертер изображений

## Команды

```bash
npm install
npm run dev       # dev-сервер
npm run build     # проверка типов + продакшен-сборка
npm run preview   # локальный просмотр сборки
npm run lint      # ESLint
```

## Маршруты

| Маршрут             | Страница                                             |
| ------------------- | ---------------------------------------------------- |
| `/`                 | Главная: обо мне, стек, навыки, CTA                 |
| `/projects`         | Список проектов                                      |
| `/projects/converter` | Конвертер WebP / AVIF (готовый проект из портфолио) |
| `/contacts`         | Контакты                                             |
| `*`                 | Страница 404                                         |

## Структура

```
src/
  main.tsx                 BrowserRouter + ThemeProvider
  App.tsx                  Layout: Header / Routes / Footer
  App.module.css
  layout/                  Header, Footer, ThemeToggle, ScrollToTop
  pages/                   HomePage, ProjectsPage, ContactsPage, ConverterPage, NotFoundPage
  components/
    Photo.tsx              Фото владельца сайта (avatar.webp)
    ProjectCard.tsx        Карточка проекта
    icons/BrandIcons.tsx   SVG-иконки GitHub и LinkedIn
    converter/             Готовый конвертер (UploadArea, CompressionSettings, ImageList, ImageCard)
  data/
    projects.ts            Список проектов
    contacts.ts            Список контактов
  theme/                   ThemeProvider + useTheme
  styles/global.css        Токены тем, сброс, общие примитивы
  hooks/useImageConverter.ts
  utils/
```

## Темы

По умолчанию — тёмная. Переключатель в шапке (`layout/ThemeToggle.tsx`)
меняет `data-theme` у `<html>`, выбор сохраняется в `localStorage`
(ключ `portfolio-theme`). Значения цветов лежат в `src/styles/global.css`:
селектор `:root` — тёмная тема, `[data-theme="light"]` — светлая.

Чтобы поменять фирменный акцент, достаточно отредактировать переменные
`--primary` и `--primary-soft` в обоих селекторах.

## Что можно заменить на своё

| Что                                   | Где                                        |
| ------------------------------------- | ------------------------------------------ |
| Имя и фамилия                         | `layout/Header.tsx`, `layout/Footer.tsx`, `pages/HomePage.tsx` |
| Фотография                            | `src/assets/avatar.webp` — готовое фото с прозрачным фоном (900×1015, ~50 КБ) |
| Логотип и favicon                     | `public/logo.svg`, `public/favicon.svg` — силуэт с фотографии |
| Контакты (значения и ссылки `"#"`)    | `data/contacts.ts`                          |
| Проекты                               | `data/projects.ts`                          |
| Заголовок и описание страницы         | `index.html`                                |
| Цвета темы                            | `src/styles/global.css`                     |

Оригинал `src/assets/Ava.jpg` лежит рядом как исходник: из него собран
`avatar.webp` (фон вырезан, кадр «по грудь»), а по силуэту построены
`logo.svg` и `favicon.svg`.

## Заметки

- Конвертер целиком работает в браузере: файлы не отправляются на сервер.
- Страница конвертера подгружается лениво (`React.lazy`), поэтому тяжёлые
  WASM-модули не попадают в стартовый бандл.
- `sharp` удалён из зависимостей — код конвертера работает целиком в браузере
  на WASM, серверная обработка изображений не требуется.
