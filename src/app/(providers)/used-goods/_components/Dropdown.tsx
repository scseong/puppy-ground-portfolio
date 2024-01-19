import { useState } from 'react';
import { TfiArrowCircleUp, TfiArrowCircleDown } from 'react-icons/tfi';
import styles from './dropdown.module.scss';

const Dropdown = ({ categories, defaultText }: { categories: string[]; defaultText: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.dropdown}>
      {/* TODO: 마우스 이벤트에 따라 열리고 닫히게 */}
      <div className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
        <p>{defaultText}</p>
        {isOpen ? <TfiArrowCircleUp size="1.1rem" /> : <TfiArrowCircleDown size="1.1rem" />}
      </div>
      {isOpen && (
        <div className={styles.content} onMouseLeave={() => setIsOpen(false)}>
          {/* TODO: 추가 CSS 작업*/}
          <ul className={styles.select}>
            {categories.map((category) => (
              <li key={category}>
                <div className={styles.option}>
                  <input type="checkbox" id={category} name={category} />
                  <label htmlFor={category}>{category}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
