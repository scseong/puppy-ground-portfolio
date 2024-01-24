import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

// 채팅 가져오기
export const getChatList = async () => {
  const getChatListQuery = await supabase
    .from('chat_list')
    .select('*, used_item(*), chat(read_status, user_id), profiles(*)')
    .order('id', { ascending: false })
    .returns<Tables<'chat_list'>[]>();

  const { data: getChatListData, error } = getChatListQuery;
  return { getChatListData, error };
};

// 채팅 가져오기
export const getChatContent = async () => {
  const { data: chat, error } = await supabase
    .from('chat')
    .select('*')
    .order('created_at', { ascending: true })
    .returns<Tables<'chat'>[]>();

  return chat;
};

// 채팅 보내기
export const sendChat = async ({
  content,
  id,
  userId,
  userName
}: {
  content: string;
  id: number;
  userId: string;
  userName: string;
}) => {
  await supabase
    .from('chat')
    //나중에 고쳐야함
    .insert([{ content, chat_list_id: id, user_id: userId, user_name: userName }])
    .select();
};

// 채팅방 만들기
export const makeChatList = async ({
  post_id,
  other_user,
  user_id
}: {
  post_id: number | undefined;
  other_user: string | undefined;
  user_id: string | undefined;
}) => {
  const { data } = await supabase
    .from('chat_list')
    .insert([{ post_id, other_user, user_id }])
    .select();

  return data;
};

// // 채팅방 삭제 - 보류..
// export const deleteChatRoom = async (id: number) => {
//   await supabase.from('chat_list').delete().eq('id', id);

//   await supabase.from('chat').delete().eq('chat_list_id', id);
// };

//채팅 읽기

export const readChat = async ({
  list_id,
  other_user
}: {
  list_id: number;
  other_user: string;
}) => {
  await supabase
    .from('chat')
    .update({ read_status: true })
    .eq('chat_list_id', list_id)
    .eq('user_id', other_user)
    .select();
};
