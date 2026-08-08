import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Settings() {
  return (
    <div>
      Settings
      <LogoutButton variant="ghost" />
      <ThemeToggle />
    </div>
  );
}
