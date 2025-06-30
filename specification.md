# Личный проект «Readme»

## Начало работы

### 1. Переход в нужную дерикторию
Основная работа происходит в директории project, поэтому переходим в нее:
```bash
cd project
```

### 2. Установка пакетов
Установите все зависимости
```bash
npm install
```

### 3. Создание .env файлов
Далее нужно создать .env файлы для каждого сервиса и prisma client по образцу файлов .env-example.

Директории для создания:
1. apps/account
2. apps/api-gateway
3. apps/blog
4. apps/file-manager
5. apps/notification
6. shared/blog/models/prisma


### 4. Создание и запуск Docker контейнеров

#### Запуск всех контейнеров разом
```bash
npm run start-docker:all
```

#### Запуск контейнера для сервиса Account
```bash
npm run start-docker:account
```

#### Запуск контейнера для сервиса Blog
```bash
npm run start-docker:blog
```

#### Запуск контейнера для сервиса File Manager
```bash
npm run start-docker:file-manager
```

#### Запуск контейнера для сервиса Notification
```bash
npm run start-docker:notification
```

### 5. Подготовка Prisma клиента

#### Чтобы сгенерировать Prisma, нужно выполнить следующую команду:
```bash
npx run db:generate
```

#### Если необходимо сбросить базу Prisma, то нужно выполнить следующую команду:
```bash
npx run db:reset
```

#### Чтобы выполнить сидирование базы, нужно выполнить команду:
```bash
npx run db:seed
```

#### Чтобы выполнить миграцию схемы Prisma, нужно выполнить команду:
```bash
npx run db:migrate
```

#### Чтобы выполнить валидацию схемы Prisma, нужно выполнить команду:
```bash
npx run db:lint
```

### 6. Запуск сервисов

#### Запуск всех сервисов разом (каждый запускается в своем терминале)
```bash
npm run start-service:all
```

#### Запуск сервиса api-gateway
```bash
npm run start-service:api-gateway
```

#### Запуск сервиса account
```bash
npm run start-service:account
```

#### Запуск сервиса blog
```bash
npm run start-service:blog
```

#### Запуск сервиса file-manager
```bash
npm run start-service:file-manager
```

#### Запуск сервиса notification
```bash
npm run start-service:notification
```
