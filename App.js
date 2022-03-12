import RootComponent from "./src/components/RootComponent";
import { UserProvider } from "./src/contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <RootComponent />
    </UserProvider>
  );
}
