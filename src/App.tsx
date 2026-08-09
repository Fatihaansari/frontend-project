import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/Projectscontext";
import { NotificationsProvider } from "./context/NotificationsContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <NotificationsProvider>
          <AppRoutes />
        </NotificationsProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;
