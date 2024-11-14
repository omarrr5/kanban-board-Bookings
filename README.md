# React + Laravel Project Setup and Running Instructions

## Requirements

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [PHP](https://www.php.net/) (8.x+)
- [Composer](https://getcomposer.org/) (for managing PHP dependencies)
- [MySQL](https://www.mysql.com/) or any other database you are using with Laravel
- [Laravel](https://laravel.com/docs) (PHP framework)
- [React](https://reactjs.org/) (Frontend library)

---

## 1. Backend Setup (Laravel)

### Step 1: Clone the Repository

First, clone the Laravel repository.

```bash
git clone https://github.com/omarrr5/kanban-board-Bookings.git
cd backend
composer install
cp .env.example .env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kanbanBoard
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate
php artisan serve

## 1. Frontend Setup (React)

### Step 1: Clone the Repository

First, clone the React repository.
cd frontend
npm install
npm start


