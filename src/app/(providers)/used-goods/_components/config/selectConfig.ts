import { StylesConfig } from 'react-select';

export const singleOptions: StylesConfig<{ value: string; label: string }, false> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? '#0ac4a9' : '#808080',
    backgroundColor: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: '#0ac4a9'
    }
  }),
  indicatorSeparator: () => ({ display: 'none' }),
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
      color: '#808080'
    },
    '&:focus': {
      border: '#0ac4a9'
    }
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
    boxShadow: 'none',
    border: '1px solid #979797'
  })
};

export const multiOptions: StylesConfig<{ value: string; label: string }, true> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? '#0ac4a9' : '#808080',
    backgroundColor: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: '#0ac4a9'
    }
  }),
  indicatorSeparator: () => ({ display: 'none' }),
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
      color: '#808080'
    },
    '&:focus': {
      border: '#0ac4a9'
    }
  }),
  noOptionsMessage: (styles) => ({ ...styles, fontSize: '14px' }),
  multiValue: (styles) => ({ ...styles, backgroundColor: 'none' }),
  multiValueLabel: (styles) => ({
    ...styles,
    paddingLeft: '0px',
    paddingRight: '1px',
    fontSize: '14px',
    color: '#333'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    padding: '2px 0',
    color: '#808080',
    '&:hover': {
      backgroundColor: 'inherit',
      color: '#0ac4a9'
    }
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
    boxShadow: 'none',
    border: '1px solid #979797'
  }),
  indicatorsContainer: (styles) => ({ ...styles, padding: '0' }),
  dropdownIndicator: (styles) => ({ ...styles, paddingLeft: '0' }),
  valueContainer: (styles) => ({ ...styles, paddingRight: '0' })
};
