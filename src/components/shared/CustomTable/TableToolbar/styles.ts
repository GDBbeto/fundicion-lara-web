import { Theme } from '@mui/material/styles';

export const toolbarContainer = (theme: Theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: { xs: 'start', sm: 'center' },
  gap: 2,
  marginBottom: theme.spacing(2),
});

export const titleStyles = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

export const refreshButton = (theme: Theme) => ({
  marginLeft: theme.spacing(0.5),
  borderRadius: 50,
  backgroundColor: theme.palette.action.hover,
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
});

export const toggleGroupStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 1,
  '& .MuiToggleButton-root': {
    border: 'none',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
});
