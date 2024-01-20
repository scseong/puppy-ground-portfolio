import { forwardRef } from 'react';
import Select, { GroupBase, Props } from 'react-select';

const CustomSelect = forwardRef<HTMLDivElement, Props<Option, IsMulti, Group>>(
  (props: Props<Option, IsMulti, Group>, ref) => <Select {...props} ref={ref} />
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
