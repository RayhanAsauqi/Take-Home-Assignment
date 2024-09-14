## TodoListApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.
This Todo app is designed to assist users in managing their to-do lists. Users can add new tasks, mark completed tasks, edit tasks, and delete completed tasks. The app is built using Angular, with a responsive interface optimized for different screen sizes.

## Technologies and Tools Used

- **Angular**: The main framework used to build this application. Angular is used for application structure, state management, and handling user interactions.
- **Tailwind CSS**: Used for styling the application with utility classes that enable responsive design and rapid customization.
- **TypeScript**: The programming language used to write the Angular application, offering static typing and modern JavaScript features.
- **Node.js**: The runtime platform used to run the Angular development server and manage project dependencies.
- **npm**: The package manager used to install and manage project dependencies.
- **Git**: The version control system used to manage source code changes and collaborate on application development.

## Key features

- **Add Task**: Users can add new tasks through input title and input description.
- **Mark Complete**: Users can mark completed tasks by checking the checkbox.
- **Edit Task**: Users can edit the name of a task that has already been added.
- **Delete Task**: Completed tasks can be removed from the list.
- **Input Validation**: The system will display an error message if the user tries to add a task without text.

## Installation

##### Prerequisites

Before installing the Todo List Application, make sure you have the following software installed:

1. **Node.js**: Download and install from [here](https://nodejs.org/).
2. **Angular CLI**: Install Angular CLI globally using the following command:
   ```bash
   npm install -g @angular/cli
   ```

##### Installation Steps

1. **Clone the Repository** Clone the repository to your local machine using the following command:
   ```bash
   git clone REPO_URL
   ```
   If you're starting from scratch, you can create a new Angular project:
   ```bash
   ng new todo-list-app
   ```
2. **Navigate to the Project Directory** Go to the project's directory:
   ```bash
   cd todo-list-app
   ```
3. **Install Dependencies** Run the following command to install all required dependencies:
   ```bash
   npm install
   ```
4. **Run the Application** After the installation is complete, run the app using:
   ```bash
   ng serve
   ```
5. **Access the Application** Open your browser and go to the following URL to access the application:
   ```bash
   ng serve
   ```

##### Tailwind CSS

1. This project uses **Tailwind CSS** for styling. Tailwind has already been configured, and all necessary classes are available for responsive design and component styling. No additional setup is required for Tailwind as it will be installed automatically with the rest of the dependencies when running:

   ```bash
     npm install
   ```

## Structure Folder

```
todo-list-app/
│
├── .angular/
├── .vscode/
├── node_modules/
├── public/
├── src/
│ ├── app/
│ │ ├── modal/
│ │ │ ├── modal.component.css
│ │ │ ├── modal.component.html
│ │ │ ├── modal.component.spec.ts
│ │ │ └── modal.component.ts
│ │ ├── todo-list/
│ │ │ ├── todo-list.component.css
│ │ │ ├── todo-list.component.html
│ │ │ ├── todo-list.component.spec.ts
│ │ │ └── todo-list.component.ts
│ │ ├── app.component.css
│ │ ├── app.component.html
│ │ ├── app.component.spec.ts
│ │ ├── app.component.ts
│ │ ├── app.config.ts
│ │ ├── app.routes.ts
│ │ ├── todo.service.spec.ts
│ │ └── todo.service.ts
│ │
│ ├── index.html
│ ├── main.ts
│ ├── styles.css
│
├── .editorconfig
├── .gitignore
├── angular.json
├── karma.conf.js
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json

```

## Api Reference

#### Api Endpoint

The application uses a mock API for managing todo items. The mock API is hosted at the following URL:

```bash
https://example.mockapi.io/api/v1/todos
```

#### Example Data

The mock API provides todo items in the following format:

```json
[
  {
    "title": "Test Task 1",
    "completed": false,
    "description": "This is a test task with incomplete status.",
    "id": "1"
  },
  {
    "title": "Test Task 2",
    "completed": true,
    "description": "This is a test task that is completed.",
    "id": "2"
  }
]
```

#### Api Operations

- **GET** `/api/v1/todos `
  Retrieve the list of todo items.
- **POST** `/api/v1/todos `
  Create a new todo item. Request body should include `title`, `completed` and `description`.
- **PUT** `/api/v1/todos/{id} `
  Update an existing todo item. Request body should include`title`, `completed` and `description`.
- **DELETE** `/api/v1/todos/{id} `
  Delete a todo item by its `id`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Author

**Rayhan Alsauqi**  
reyhanalsauqi12@gmail.com  
[LinkedIn](https://www.linkedin.com/in/rayhan-alsauqi/)
