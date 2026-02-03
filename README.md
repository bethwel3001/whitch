<div align="center">
  <h1>w!tch</h1>
  <p><strong>Your AI-Powered Movie & Show Oracle</strong></p>
  <p>Discover your next favorite movie, series, or anime based on your mood, and chat with an AI expert about any title.</p>
</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Genkit](https://img.shields.io/badge/Genkit-8A2BE2?style=for-the-badge&logo=google-cloud&logoColor=white)](https://firebase.google.com/docs/genkit)

---

**w!tch** is a modern, AI-driven recommendation app that helps you find the perfect movie, series, or anime to match your current vibe. No more endless scrolling—just select your mood and let our AI conjure the perfect watchlist for you.

## Key Features

-   **Mood-Based Recommendations**: Get a curated list of 2 movies, 2 series, and 2 anime tailored to how you're feeling.
-   **AI Movie Expert Chat**: Dive deep into any movie. Ask about plot points, trivia, actors, or behind-the-scenes secrets.
-   **Balanced Suggestions**: The AI ensures a diverse mix of content types in every recommendation.
-   **Sleek, Modern UI**: A minimalist, responsive design with a glowing, futuristic aesthetic built with ShadCN UI and Tailwind CSS.
-   **Dynamic & Interactive**: Smooth animations and a persistent recommendation state provide a seamless user experience.
-   **Light & Dark Mode**: Beautifully crafted themes that adapt to your system preference.

## How It Works

1.  **Select Your Mood**: Choose from a list of moods like "Happy," "Sad," "Thrilled," etc.
2.  **Get AI Recommendations**: The app sends your mood to a backend powered by **Genkit**, which uses a generative AI model to create a unique list of recommendations.
3.  **Filter & Explore**: Filter the results by streaming service to see what's available to you.
4.  **Chat with w!tch**: Click on any title to view details and open a chat with our AI movie expert to learn more.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models.
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react) & [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later)
-   [npm](https://www.npmjs.com/) (or yarn/pnpm)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/witch-app.git
cd witch-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

This project uses Genkit to connect to Google's Generative AI models. You'll need an API key from Google AI Studio.

1.  Create a file named `.env` in the root of your project.
2.  Add your API key to the `.env` file:

    ```env
    GEMINI_API_KEY=your_google_ai_studio_api_key
    ```

    You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the Development Server

The application runs on two concurrent processes: the Next.js frontend and the Genkit AI backend. You'll need to run them in separate terminals.

**In your first terminal (for Genkit):**

```bash
npm run genkit:watch
```

This starts the Genkit development server and will watch for any changes in your AI flows.

**In your second terminal (for Next.js):**

```bash
npm run dev
```

### 5. Open the App

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application live.

## Available Scripts

-   `npm run dev`: Starts the Next.js development server.
-   `npm run genkit:dev`: Starts the Genkit server once.
-   `npm run genkit:watch`: Starts the Genkit server in watch mode.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please make sure your code adheres to the project's coding standards and includes tests where applicable.

## License

This project is distributed under the MIT License.

## Acknowledgements

-   Inspired by the creativity of the film community.
-   Built with incredible open-source tools.
