import { handleSearch } from '../actions';
import { CiSearch } from 'react-icons/ci';
import styles from './usedGoodsSearch.module.scss';

// TODO: 클라이언트 컴포넌트로 변경 - input 상태 관리
const UsedGoodsSearch = () => {
  return (
    <form action={handleSearch} className={styles.searchForm}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          name="query"
          type="text"
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit">
          <CiSearch size="1.2rem" />
        </button>
      </div>
    </form>
  );
};

export default UsedGoodsSearch;
