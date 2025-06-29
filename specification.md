# Личный проект «Readme»

## Начало работы

### 1. Переход в нужную дерикторию
Основная работа происходит в директории project, поэтому переходим в нее:
```bash
cd project
```

### 2. Создание .env файлов
Далее нужно создать .env файлы для каждого сервиса и prisma client по образцу файлов .env-example.

Директории для создания:
1. apps/account
2. apps/api-gateway
3. apps/blog
4. apps/file-manager
5. apps/notification
6. shared/blog/models/prisma


### 3. Создание и запуск Docker контейнеров

#### Запуск контейнера для сервиса Account
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/account.env up -d
```

#### Запуск контейнера для сервиса Blog
```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env up -d
```

#### Запуск контейнера для сервиса File Manager
```bash
docker compose --file ./apps/file-manager/docker-compose.dev.yml --project-name "readme-file-manager" --env-file ./apps/file-manager/file-manager.env up -d
```

#### Запуск контейнера для сервиса Notification
```bash
docker compose --file ./apps/notification/docker-compose.dev.yml --project-name "readme-notification" --env-file ./apps/notification/notification.env up -d
```

### 3. Подготовка Prisma клиента

Чтобы сгенерировать Prisma, нужно выполнить следующую команду:
```bash
npx run db:generate
```

Если необходимо сбросить базу Prisma, то нужно выполнить следующую команду:
```bash
npx run db:reset
```

Чтобы выполнить сидирование базы, нужно выполнить команду:
```bash
npx run db:seed
```

Чтобы выполнить миграцию схемы Prisma, нужно выполнить команду:
```bash
npx run db:migrate
```

Чтобы выполнить валидацию схемы Prisma, нужно выполнить команду:
```bash
npx run db:lint
```

### 4. Запуск сервисов
Чтобы запустить сервисы, нужно выполнить команды:

#### Запуск сервиса api-gateway
```bash
nx run api-gateway:serve
```

#### Запуск сервиса account
```bash
nx run account:serve
```

#### Запуск сервиса file-manager
```bash
nx run file-manager:serve
```

#### Запуск сервиса blog
```bash
nx run blog:serve
```

#### Запуск сервиса notification
```bash
nx run notification:serve
```
