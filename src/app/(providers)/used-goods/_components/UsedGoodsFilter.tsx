import { supabase } from '@/shared/supabase/supabase';
import { handleSubmit } from '../actions';

type CategoryObject = {
  mainCategory: string[];
  subCategory: string[];
};

const mainCategoryQuery = supabase.from('main_category').select('*');
const subCategoryQuery = supabase.from('sub_category').select('*');

const getCategories = async (): Promise<CategoryObject> => {
  const response = await Promise.all([mainCategoryQuery, subCategoryQuery]);
  const categoryArray: string[][] = response.map((res) => {
    if (!res.data) return [];
    return res.data.map((category) => category.name);
  });

  return categoryArray.reduce((acc, cur, idx) => {
    if (idx === 0) {
      acc['mainCategory'] = cur;
    } else if (idx === 1) {
      acc['subCategory'] = cur;
    }
    return acc;
  }, {} as CategoryObject);
};

const UsedGoodsFilter = async () => {
  const { mainCategory, subCategory } = await getCategories();

  return (
    <form action={handleSubmit}>
      <select name="main" id="main">
        {mainCategory.map((category, idx) => (
          <option value={idx + 1} key={category}>
            {category}
          </option>
        ))}
      </select>
      <select name="sub" id="sub">
        {subCategory.map((category, idx) => (
          <option value={idx + 1} key={category}>
            {category}
          </option>
        ))}
      </select>
      <button value="Submit">분류</button>
    </form>
  );
};

export default UsedGoodsFilter;
