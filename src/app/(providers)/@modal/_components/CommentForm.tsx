import { createComment } from '@/apis/mung-stagram/action';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const CommentForm = () => {
  const user = useAuth((state) => state.user);
  const parmas = useParams();
  const { warnTopRight, successTopRight } = useToast();

  const [inputForm, setInputForm] = useState<TablesInsert<'mung_stagram_comment'>>({
    content: '',
    user_id: user?.id!,
    mung_stagram_id: Number(parmas.id)
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const onClickCreate = () => {
    if (!inputForm.content) {
      warnTopRight({ message: '내용을 입력해주세요' });
      return;
    }
    createComment(inputForm);
    successTopRight({ message: '댓글이 등록되었습니다.' });
    setInputForm({ ...inputForm, content: '' });
  };

  return (
    <div>
      <input
        name="content"
        value={inputForm.content}
        onChange={handleFormChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onClickCreate();
        }}
      />
      <button onClick={onClickCreate}>등록</button>
    </div>
  );
};

export default CommentForm;
