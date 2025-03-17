import { useTheme } from "../contexts/ThemeContext";
// import Sun from "../assets/icons8-sun-100.png";
// import Moon from "../assets/icons8-moon-100.png";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${theme === "dark" ? "theme-toggle-dark" : "theme-toggle"}`}
    >
      {theme === "dark" ? (
        <div className="theme-toggle-display" />
      ) : (
        <div className="theme-toggle-display" />
      )}
    </button>
  );
};

export default ThemeToggle;
