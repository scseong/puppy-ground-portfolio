import Link from 'next/link';

const page = () => {
  return (
    <div>
      <h2>멍스타그램</h2>
      <div>
        <Link href="/mungstagram/1">게시글로 이동</Link>
      </div>
      <div>
        <Link href="/mungstagram/create">글쓰기</Link>
      </div>
      <div>
        <Link href="/mungstagram/1/update">수정하기</Link>
      </div>
    </div>
  );
};

export default page;
