# Contributing to AI SDK

We appreciate your interest in contributing to the AI SDK! This guide will help you get started with the contribution process.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js 20.x or later
-   pnpm v9.x (install globally with `npm i -g pnpm@^9`)

## Setting Up the Repository

1. Fork the AI SDK repository on GitHub.

2. Clone your fork to your local machine:

    ```
    git clone https://github.com/<your-username>/ai-sdk.git
    cd ai-sdk
    ```

3. Install dependencies:

    ```
    pnpm install
    ```

## Development Workflow

1. Start the development server:

    ```
    pnpm run dev
    ```

    This command will start all packages in development mode.

2. Make your changes to the code. The main AI SDK packages can be found in the `packages/ai-sdk/` directory.

3. Test your changes using the example app in the `apps/example/` directory. This app is linked to the local AI SDK packages, allowing you to see your changes in real-time.

    Navigate to `http://localhost:3000` (or the port specified in the console) to see the example app running.

## Code Style and Quality

Before submitting your changes, ensure your code follows our style guidelines:

1. Format your code:

    ```
    pnpm run format
    ```

2. Run the linter:

    ```
    pnpm run lint
    ```

## Submitting a Pull Request

1. Commit your changes and push them to your fork.

2. Go to the original AI SDK repository on GitHub and create a new pull request from your fork.

3. Provide a clear description of your changes in the pull request.

4. Wait for the maintainers to review your pull request. They may ask for additional changes or clarifications.

Thank you for contributing to the AI SDK! Your efforts help make this project better for everyone.
