import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

export default function Theme({ children }: { children: ReactNode }) {
  const theme = useSelector((state: any) => state.theme.currentTheme);
  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}