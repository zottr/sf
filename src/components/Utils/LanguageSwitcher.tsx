import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select value={i18n.language} onChange={handleChange}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="hi">Hindi</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
