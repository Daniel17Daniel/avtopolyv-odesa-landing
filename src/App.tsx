import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <>
      <LandingPage />
      <Toaster richColors position="top-center" />
    </>
  );
}
