// ** React Import
import { forwardRef } from 'react';

// ** MUI Import
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';

const CustomAutocomplete = forwardRef((props, ref) => {
  return (
    // eslint-disable-next-line lines-around-comment
    // @ts-expect-error - AutocompleteProps is not compatible with PaperProps
    <Autocomplete
      {...props}
      ref={ref}
      PaperComponent={props => <Paper {...props} className='custom-autocomplete-paper' />}
    />
  )
});

CustomAutocomplete.displayName = 'CustomAutocomplete';
export default CustomAutocomplete
