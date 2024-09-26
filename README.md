# AI SDK Monorepo

This monorepo contains the AI SDK, a comprehensive toolkit for building AI-powered applications with a focus on chatbot functionality.

## Overview

The AI SDK provides a set of React components and utilities to easily integrate AI-driven features into your applications. It includes a customizable chatbot UI, markdown rendering capabilities, and various UI components.

## Key Features

-   **ChatbotUi**: A fully-featured chatbot interface with support for text, images, links, and product information.
-   **Markdown Rendering**: Efficient markdown parsing and rendering with support for GitHub Flavored Markdown (GFM) and mathematical expressions.
-   **Customizable UI Components**: A collection of reusable UI components including avatars, cards, and carousels.

## Project Structure

The monorepo is organized into the following main directories:

-   `packages/ai-sdk/`: Contains the core AI SDK components and utilities.
-   `apps/example/`: An example application showcasing the usage of the AI SDK.

## Repo Setup with pnpm

This project uses pnpm as the package manager. Follow these steps to set up the repository:

1. Install [pnpm](https://pnpm.io/installation) globally if you haven't already:

    ```
    npm install -g pnpm
    ```

2. Clone the repository:

    ```
    git clone https://github.com/your-org/ai-sdk.git
    cd ai-sdk
    ```

3. Install dependencies:

    ```
    pnpm install
    ```

4. Start the development server:

    ```
    pnpm run dev
    ```

Now you're ready to start contributing to the AI SDK!

Start with the [example app](./apps/example) to get a feel for the SDK and how it works.

To add features or fix bugs fix in core AI SDK package start with the [core AI SDK package](./packages/ai-sdk)

## Contributing

We welcome contributions to the AI SDK! Please read our contributing guidelines before submitting pull requests.

[Contributing Guidelines](./CONTRIBUTION.md)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
