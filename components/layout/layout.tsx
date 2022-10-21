import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { string } from 'yup/lib/locale';

interface LayoutProps {
  title: string;
  children: ReactElement | ReactElement[];
  'data-test': string;
}

export function Layout(props: LayoutProps) {
  const { title, children } = props;
  return (
    <>
      <AppBar data-test={props['data-test']} position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
