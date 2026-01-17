import { handleSearch } from '../actions';
import { CiSearch } from 'react-icons/ci';
import styles from './usedGoodsSearch.module.scss';

// TODO: 클라이언트 컴포넌트로 변경 - input 상태 관리
const UsedGoodsSearch = () => {
  return (
    <form action={handleSearch} className={styles.searchForm}>
      <div className={styles.wrapper}>
        <label htmlFor="search-input" className={styles.hidden}>
          중고상품 검색어 입력
        </label>
        <input
          className={styles.input}
          id="search-input"
          name="query"
          type="text"
          placeholder="검색어를 입력해주세요"
        />
        <button aria-label="검색하기">
          <CiSearch size="1.2rem" />
        </button>
      </div>
    </form>
  );
};

export default UsedGoodsSearch;
