# Restaurant Metrics Dashboard

This is a study project built as part of an MBA in Web Development, focusing on the fundamentals of React and dashboard implementation. The project provides restaurant owners with a complete tool to manage their businesses within delivery applications, like iFood.

## Features

- **Metrics Overview**: Track key metrics such as daily and monthly orders.
- **Order Management**: View detailed order information, update order status, and cancel orders where applicable.
- **Profile Management**: Update the restaurant's profile with live feedback using HTTP cache updates.
- **Authentication**: Utilizes passwordless login through Magic Link, simplifying the sign-in process.
- **Interactive UI**: Features light and dark themes, skeleton screens, loading states, and pagination for an optimal user experience.

## Tech Stack

- **React**: Built with pure React to understand the framework without the use of additional state management tools.
- **React Query**: Handles data fetching, caching, and state synchronization.
- **Tailwind CSS**: Used for styling to ensure a consistent and responsive UI.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js >= 16
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/restaurant-metrics-dashboard.git
   ```

2. Navigate into the project directory:
   ```bash
   cd restaurant-metrics-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:5174`.

## Project Structure

- **src/components**: Reusable UI components.
- **src/pages**: Application pages like login, metrics, and order management.
- **src/hooks**: Custom hooks for data fetching and business logic.
- **src/services**: API service logic.

## Contributing

This is a study project, but contributions are welcome for improvement. Feel free to fork the repository and open a pull request.

## License

This project is open-sourced under the MIT License.

---

### Note

The backend API is provided as part of the course. For a complete implementation, refer to the JavaScript backend trail within the course series.

Happy coding!

