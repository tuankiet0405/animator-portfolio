import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <svg
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {theme === 'dark' ? (
          /* Sun icon */
          <g className="theme-toggle__sun">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 2V4M12 20V22M4 12H2M22 12H20M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          /* Moon icon */
          <path
            className="theme-toggle__moon"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
