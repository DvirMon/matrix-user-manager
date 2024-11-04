
# User Management System

> A dynamic, responsive user management system built with Angular, RxJS, and SCSS.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Architecture and Design Patterns](#architecture-and-design-patterns)
8. [Known Issues and Limitations](#known-issues-and-limitations)
9. [Future Improvements](#future-improvements)

## Introduction

This project is an Angular-based user management system developed as part of a technical interview assignment. The application allows for adding, editing, deleting, and displaying users, utilizing reactive programming principles with RxJS and advanced design patterns.

## Features

- User management with add, edit, and delete functionality.
- Responsive, dynamic table with Angular Material.
- SCSS for modular, customizable styling.
- Facade and Strategy design patterns for streamlined, modular architecture.

## Technologies Used

- **Frontend**: Angular 14, Angular Material
- **Styling**: SCSS for flexible, component-based styling
- **Reactive Programming**: RxJS
- **Design Patterns**: Facade, Strategy

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the application**:
   ```bash
   ng serve
   ```
4. **Access the application**:
   Open `http://localhost:4200` in your browser.

## Project Structure

```
src/
├── app/
│   ├── components/              # All reusable components
│   │   ├── dynamic-table/       # Dynamic table component
│   │   │   ├── dynamic-table.component.ts
│   │   │   ├── dynamic-table.component.html
│   │   │   └── dynamic-table.component.scss  # SCSS styling
│   │   └── user-form/           # User form component for add/edit operations
│   │       ├── user-form.component.ts
│   │       ├── user-form.component.html
│   │       └── user-form.component.scss     # SCSS styling
│   ├── services/                # Angular services
│   │   ├── user.service.ts      # Service for handling user data
│   │   ├── user-strategy.service.ts # Implements strategy pattern for user actions
│   │   └── user-facade.service.ts   # Facade service for user-related operations
│   ├── models/                  # Models and types
│   │   └── user.model.ts        # User model definition
│   └── app.module.ts            # Main app module
└── environments/                # Environment settings
```

## Usage

- **Add User**: Click "Add User" to open a dialog and submit the form.
- **Edit User**: Click the edit icon next to a user to modify their details.
- **Delete User**: Click the delete icon to remove a user from the list.

## Architecture and Design Patterns

- **Facade Pattern**: `UserFacadeService` provides a unified API for managing users.
- **Strategy Pattern**: `UserStrategyService` dynamically handles different user actions.
- **Reactive Programming**: RxJS observables are used throughout for reactive data handling.
- **SCSS**: Component-based SCSS styling ensures modular, maintainable, and customizable styling.

## Known Issues and Limitations

- Frontend-only (no backend integration for persistent storage).
- Basic error handling and limited test coverage.

## Future Improvements

- **Backend Integration**: Add a REST API for data persistence.
- **Unit Tests**: Add comprehensive test coverage.
- **Advanced Filtering**: Enhance table with filtering, sorting, and pagination.
