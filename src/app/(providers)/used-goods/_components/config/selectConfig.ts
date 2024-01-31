import { StylesConfig } from 'react-select';

export const singleOptions: StylesConfig<{ value: string; label: string }, false> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? '#0ac4a9' : '#333',
    backgroundColor: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: '#0ac4a9'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    cursor: 'pointer',
    borderColor: isFocused ? '#0ac4a9' : '#979797',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1rem',
    boxShadow: isFocused ? '0 0 0 1px #0ac4a9' : undefined,
    width: '100%',
    height: '100%',
    '&:hover': {
      color: '#333'
    },
    '&:focus': {
      border: '#0ac4a9'
    }
  })
};

export const multiOptions: StylesConfig<{ value: string; label: string }, true> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? '#0ac4a9' : '#333',
    backgroundColor: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: '#0ac4a9'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    cursor: 'pointer',
    borderColor: isFocused ? '#0ac4a9' : '#979797',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1rem',
    boxShadow: isFocused ? '0 0 0 1px #0ac4a9' : undefined,
    width: '100%',
    height: '100%',
    '&:hover': {
      color: '#333'
    },
    '&:focus': {
      border: '#0ac4a9'
    }
  })
};
