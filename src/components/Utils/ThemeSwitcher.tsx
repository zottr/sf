// components/ThemeSwitcher.tsx
import { Button } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { toggleTheme, currentTheme } = useTheme();

  return (
    <Button sx={{ color: 'white' }} onClick={toggleTheme}>
      {currentTheme === 'light' ? 'Dark' : 'Light'} Theme
    </Button>
  );
};

export default ThemeSwitcher;
