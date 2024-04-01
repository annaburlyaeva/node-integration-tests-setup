# Node.js Integration Tests Setup with Testcontainers

This repository demonstrates how to set up integration tests for a Node.js application that interacts with MySQL and MongoDB databases using the Testcontainers library.

## Overview

Integration testing is a crucial practice in software development, ensuring that different components of an application work together as expected. However, setting up and managing real database instances for testing can be a challenging and time-consuming task, often leading to flaky tests and inconsistent results.

Testcontainers is a library that provides lightweight, throwaway instances of databases, web browsers, or anything else that can run in a Docker container. With Testcontainers, you can spin up and tear down database instances on the fly, making integration testing more accessible, reliable, and efficient.

This repository includes a Node.js application that interacts with MySQL and MongoDB databases, along with a comprehensive setup for integration testing using Testcontainers.

## Features

- **Docker Containers**: Spin up and tear down Docker containers for MySQL, MongoDB, and the Node.js application during the test lifecycle.
- **Test Environment Setup**: Automated setup and teardown of the test environment, including creating and configuring Docker containers, setting up global variables, and exposing the API URL.
- **API Client**: A utility module for making HTTP requests to the Node.js application running in the Docker container.
- **Integration Tests**: Example integration tests for the orders and users endpoints, covering create, read, update, and delete operations.
- **Test Data Management**: Helper functions for creating tables, injecting seed data, and dropping tables in the MySQL database.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/node-integration-tests-setup.git
```

2. Navigate to the project directory:

```bash
cd node-integration-tests-setup
```

3. Install dependencies:

```bash
npm install
```

### Running Integration Tests

To run the integration tests, execute the following command:

```bash
npm run test
```

This command will spin up Docker containers for MySQL, MongoDB, and the Node.js application, and then execute the integration tests using Jest.

## Project Structure

- `src/`: Contains the source code for the Node.js application.
- `tests/`: Contains the integration tests and test setup files.
  - `global-test-state.ts`: Exports an API client for making HTTP requests.
  - `init-api-container.ts`: Sets up the Docker container for the Node.js application.
  - `test-env-setup.ts`: Sets up the test environment by creating Docker containers and exposing global variables.
  - `test-env-teardown.ts`: Tears down the test environment by stopping and removing Docker containers.
  - `db/mongodb/init-container.ts`: Sets up the Docker container for MongoDB.
  - `db/mysql/init-container.ts`: Sets up the Docker container for MySQL.
  - `routes/orders/order-management.test.ts`: Integration tests for the orders endpoints.
  - `routes/users/user-management.test.ts`: Integration tests for the users endpoints.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).