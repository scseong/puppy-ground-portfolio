import Select, { GroupBase, Props } from 'react-select';

const CustomSelect = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
) => <Select {...props} />;

export default CustomSelect;
