import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

// 채팅방 가져오기
export const getChatRoomList = async (id: string) => {
  const { data: getChatListData } = await supabase
    .from('chat_list')
    .select('*, used_item(*), chat(read_status, user_id), profiles(*)')
    .or(`user_id.eq.${id}, other_user.eq.${id}`)
    .order('id', { ascending: false })
    .returns<Tables<'chat_list'>[]>();

  return getChatListData;
};

// 채팅 가져오기
export const getChatContent = async (chatListId: number) => {
  const { data: chat } = await supabase
    .from('chat')
    .select('*, profiles(user_name)')
    .order('created_at', { ascending: true })
    .eq('chat_list_id', chatListId)
    .returns<Tables<'chat'>[]>();

  return chat;
};

// 채팅 보내기
export const sendChat = async ({
  content,
  id,
  userId
}: {
  content: string;
  id: number;
  userId: string;
}) => {
  await supabase
    .from('chat')
    //나중에 고쳐야함
    .insert([{ content, chat_list_id: id, user_id: userId }])
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
    .select('*, used_item(id,title, sold_out, price, photo_url)')
    .single();
  return data;
};

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

//채팅방 나가기
export const getOutChatRoom = async ({
  userId,
  chatListId
}: {
  userId: string;
  chatListId: number;
}) => {
  // 현재 채팅방 정보 가져오기
  const { data: chatListData, error: chatListError } = await supabase
    .from('chat_list')
    .select('get_out_chat_room')
    .eq('id', chatListId)
    .single();

  if (chatListError) {
    // 오류 처리
    return { error: chatListError };
  }

  // 현재 채팅방의 get_out_chat_room 배열
  const currentGetOutChatRoom = chatListData.get_out_chat_room || [];

  // 새로운 배열 생성 (기존 배열에 userId 추가)
  const updatedGetOutChatRoom = [...currentGetOutChatRoom, userId];

  // Supabase를 사용하여 chat_list 테이블 업데이트
  const { data: updatedChatListData, error: updateError } = await supabase
    .from('chat_list')
    .update({ get_out_chat_room: updatedGetOutChatRoom })
    .eq('id', chatListId)
    .select();

  if (updateError) {
    // 오류 처리
    return { error: updateError };
  }

  return updatedChatListData;
};
