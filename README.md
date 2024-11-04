
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

This project is an Angular-based user management system developed as part of a technical interview assignment. The application is structured as a standalone Angular project with modular components, services, and models, allowing for easy scalability and maintainability. The application allows for adding, editing, deleting, and displaying users, utilizing reactive programming principles with RxJS and design patterns.

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
   https://github.com/DvirMon/matrix-user-manager.git
   cd matrix-user-manager
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
├── app.component.html                # Root app component template
├── app.component.scss                # Root app component styling (SCSS)
├── app.component.spec.ts             # Root app component test
├── app.component.ts                  # Root app component logic
├── app.config.ts                     # Application configuration
├── app.routes.ts                     # Application routes
├── components/                       # Core components
│   ├── user-dialog/                  # Dialog component for add/edit user
│   │   ├── user-dialog.component.html
│   │   ├── user-dialog.component.scss
│   │   ├── user-dialog.component.ts
│   │   └── user-dialog.service.ts
│   ├── user-form/                    # Form component for user details
│   │   ├── user-form.component.html
│   │   ├── user-form.component.scss
│   │   ├── user-form.component.ts
│   │   └── user-form.service.ts
│   └── user-table/                   # Table component for displaying users
│       ├── user-table.component.html
│       ├── user-table.component.scss
│       ├── user-table.component.ts
│       └── user-table.service.ts
├── models/                           # Data models
│   └── user.ts                       # User model definition
├── services/                         # Shared services
│   ├── countries.service.spec.ts     # Countries service test
│   ├── countries.service.ts          # Countries data service
│   └── users.service.ts              # User data service
└── shared/                           # Shared components and utilities
    └── float-icon-button/            # Floating icon button component
        ├── float-icon-button.component.scss
        └── float-icon-button.component.ts
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
