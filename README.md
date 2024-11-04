
# User Management System

![Angular Version](https://img.shields.io/badge/Angular-14-blue)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)

> A reactive user management system built with Angular, RxJS, and SCSS.

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

- **User Management**: Supports add, edit, and delete functions for user records.
- **Reusable Components**: Configurable components for easy reuse across the application.
- **Reactive Form Validation**: Implements form validation with RxJS error messages.
- **Local Storage**: Stores user data locally for offline access.
- **Optimized Performance**: Uses OnPush change detection to reduce unnecessary updates.
- **Responsive Form**: Mobile-friendly dialog form for a seamless experience.
- **Design Patterns**: Facade and Strategy patterns for maintainable, flexible code.

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
├── app.component.html
├── app.component.scss
├── app.component.ts
├── app.config.ts
├── app.routes.ts
├── components
│   ├── user-dialog
│   │   ├── user-dialog.component.html
│   │   ├── user-dialog.component.scss
│   │   ├── user-dialog.component.ts
│   │   └── user-dialog.service.ts
│   ├── user-form
│   │   ├── user-form.component.html
│   │   ├── user-form.component.scss
│   │   ├── user-form.component.ts
│   │   ├── user-form-error.service.ts
│   │   └── user-form.service.ts
│   └── user-table
│       ├── user-table.component.html
│       ├── user-table.component.scss
│       ├── user-table.component.ts
│       └── user-table.service.ts
├── models
│   └── user.ts
├── pages
│   └── home
│       ├── home.component.html
│       ├── home.component.scss
│       └── home.component.ts
├── services
│   ├── countries.service.spec.ts
│   ├── countries.service.ts
│   ├── form-error.service.ts
│   ├── local-storage.service.ts
│   ├── messages-manger.service.ts
│   ├── user-manager.service.ts
│   ├── users.service.spec.ts
│   ├── users.service.ts
│   └── user-strategy.service.ts
└── shared
    └── float-icon-button
        ├── float-icon-button.component.scss
        └── float-icon-button.component.ts

```

## Usage

1. **Viewing Users**: Navigate to the home page to see a list of all users.
2. **Adding Users**: Click on the "+" button, fill in the user details, and submit the form.
3. **Editing Users**: Use the edit icon next to a user entry to modify existing user information.
4. **Deleting Users**: Click on the delete icon to remove a user from the database.

## Architecture and Design Patterns

- **Facade Pattern**: `UserManagerService` provides a unified API for managing users.
- **Strategy Pattern**: `UserStrategyService` handles different user actions.
- **Reactive Programming**: RxJS observables are used throughout for reactive data handling.

## Known Issues and Limitations

- Frontend-only (no backend integration for persistent storage).
- Basic error handling and limited test coverage.

## Future Improvements

- **Backend Integration**: Add a REST API for data persistence.
- **Unit Tests**: Add comprehensive test coverage.
- **Advanced Table**: Enhance table with filtering, sorting, and pagination.
