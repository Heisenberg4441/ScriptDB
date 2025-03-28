# 🚧 WIP (Work in Progress)! Этот проект находится в активной разработке, и некоторые функции могут работать нестабильно.

# ScriptDB

## Описание (Description in Russian)
ScriptDB — легковесная база данных на TypeScript, использующая JSON-файл для хранения данных. Она работает в памяти и сохраняет все изменения в `database.json`. ScriptDB позволяет легко создавать, читать, обновлять и удалять данные через HTTP API.

## Возможности (Features)
- Хранение данных в JSON-файле.
- Автозагрузка и сохранение данных.
- REST API для взаимодействия.
- CRUD-операции (создание, чтение, обновление, удаление).
- Легковесная и быстрая.

## Установка (Installation)
```sh
npm install
```

## Запуск (Running the server)
```sh
npm start
```

## API ендпоинты (API Endpoints)
### 1. Получить данные из таблицы
`GET /data/:table`

### 2. Добавить запись
`POST /data/:table`
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

### 3. Обновить запись
`PUT /data/:table/`
```json
{
  "field1": "newValue"
}
```

### 4. Удалить запись
`DELETE /data/:table`
```json
{
  "field1": "value"
}
```

---

# ScriptDB

## Description (English)
ScriptDB is a lightweight TypeScript-based database that stores data in a JSON file. It works in memory and saves all changes to `database.json`. ScriptDB allows easy creation, reading, updating, and deletion of data via an HTTP API.

## Features
- JSON-based storage.
- Auto-loading and saving data.
- REST API for interaction.
- Full CRUD operations (Create, Read, Update, Delete).
- Lightweight and fast.

## Installation
```sh
npm install
```

## Running the server
```sh
npm start
```

## API Endpoints
### 1. Get table data
`GET /data/:table`

### 2. Insert a record
`POST /data/:table`
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

### 3. Update a record
`PUT /data/:table`
```json
{
  "field1": "newValue"
}
```

### 4. Delete a record
`DELETE /data/:table`
```json
{
  "field1": "value"
}
```

