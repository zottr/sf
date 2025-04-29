import { Container } from '@mui/material';

export default function AppLayout({ children }) {
  return (
    <Container
      maxWidth="sm" // 'sm' breakpoint = 600px max width (good for mobile look)
      disableGutters // remove padding around edges
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'background.default',
        padding: 0,
        border: '1px solid #ccc',
        borderRadius: '16px',
      }}
    >
      {children}
    </Container>
  );
}
