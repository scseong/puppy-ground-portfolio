import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

export type AlertType = {
  type: string;
  targetId: number;
  message: string;
  userId: string;
};

// alert_message 테이블에서 데이터 가져오기
export const findAllMessageByUserId = async (userId: string) => {
  const findAllMessageQuery = await supabase
    .from('alert_message')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
    .returns<Tables<'alert_message'>[]>();

  const { data, error } = findAllMessageQuery;
  return { data, error };
};

// alert_message 테이블에 데이터 넣기
export const addAlertMessageByIdAndTarget = async ({
  type,
  targetId,
  message,
  userId
}: AlertType) => {
  await supabase
    .from('alert_message')
    .insert({ type, message, target_id: targetId, user_id: userId })
    .select();
};

// 알림 메시지 클릭 시 읽음상태로 만들기
export const updateAlertMessageStatus = async (id: string) => {
  return await supabase.from('alert_message').update({ status: true }).eq('id', id);
};

// 채팅 아이콘 클릭 시 읽음상태로 만들기
export const updateChatAlertMessageStatus = async (type: string) => {
  await supabase.from('alert_message').update({ status: true }).eq('type', type);
};

// 테이블에서 찜 내역 삭제하기
export const deleteAlertMessageType = async (targetId: string) => {
  return await supabase.from('alert_message').delete().eq('target_id', targetId);
};

//테이블에서 채팅 알림 내역 삭제하기
export const deleteChatAlertMessageType = async (userId: string) => {
  return await supabase.from('alert_message').delete().eq('user_id', userId);
};
