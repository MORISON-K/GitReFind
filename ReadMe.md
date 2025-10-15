# RepoFind

GitReFind is a web application that allows users to search for GitHub repositories, view their details, and keep track of their search history.

## Features

- **Search**: Search for GitHub repositories by name and description.
- **Repository Details**: View detailed information about a repository like readme, stars, forks.
- **Search History**: Recent searches are saved for quick access.

## Project Structure

- `client/`: The React frontend application.
- `server/`: The Django backend API.

### Frontend (React)

The frontend is built with React and Vite. It uses `react-router-dom` for routing and `axios` for making API requests. The UI is styled with Tailwind CSS.

- `src/pages/`: Contains the main pages of the application (`HomePage`, `SearchPage`, `RepoDetailPage`, `HistoryPage`).
- `src/components/`: Contains reusable components  `Navbar` and `RepoCard`.
- `src/types.ts`: Defines the TypeScript types for the repository data.

### Backend (Django)

The backend is a Django application that provides a REST API for the frontend and caching..

- `serverapp/views.py`: Contains the API views for searching repositories and getting repository details.
- `serverapp/urls.py`: Defines the API endpoints.
- `requirements.txt`: Lists the Python dependencies for the backend.

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/RepoFind.git
   cd RepoFind
   ```

2. **Set up the backend:**

   - Create and acivate a virtual environment:

     ```
     python -m venv env
     env\Scripts\activate  
     ```

   - Install the Python dependencies:

     ```
     pip install -r requirements.txt
     ```

   - Create a `.env` file in the root of the project and add your GitHub token:

     ```
     GITHUB_TOKEN=-github-personal-access-token
     ```

3. **Set up the frontend:**

   - Navigate to the `client` directory:

     ```
     cd client
     ```

   - Install the npm dependencies:
     ```
     npm install
     ```

### Running the Application

1. **Start the backend server:**

   - Make sure you are in the root directory and the virtual environment is activated.
   - Run the Django development server:
     ```
     python manage.py runserver
     ```
   - The backend will be running at `http://127.0.0.1:8000`.

2. **Start the frontend development server:**

   - Open a new terminal and navigate to the `client` directory.
   - Run the Vite development server:
     ```
     npm run dev
     ```
   - The frontend will be running at `http://localhost:5173`.


## API Endpoints

- `GET /api/search/?q=<query>`: Search for repositories.
- `GET /api/repos/<owner>/<repo>/`: Get details for a specific repository.


