import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert, TablesUpdate } from '@/shared/supabase/types/supabase';

export const getPosts = async (id: string) => {
  const { data, error } = await supabase
    .from('mung_stagram')
    .select('*, mung_stagram_like(count), profiles(user_name)')
    .eq('id', id)
    .single();
  return data;
};

export const getMungstaPosts = async () => {
  const { data } = await supabase
    .from('mung_stagram')
    .select('*, profiles (user_name, avatar_url)')
    .order('id', { ascending: false });
  return data;
};

export const getMungstaPost = async (id: string) => {
  const { data, error } = await supabase
    .from('mung_stagram')
    .select('*, mung_stagram_like(count), profiles(*)')
    .eq('id', id)
    .single();
  return data;
};

export const getMungstaPostsByUserId = async (user_id: string) => {
  const { data } = await supabase
    .from('mung_stagram')
    .select('*, profiles (user_name, avatar_url)')
    .eq('user_id', user_id);
  return data;
};

export const deleteMungstaPost = async (postId: string) => {
  console.log('delete', postId)
  return await supabase.from('mung_stagram').delete().eq('id', postId);
};

export const getPrevAndNextPost = async (id: string) => {
  const getPrevPost = supabase.from('mung_stagram').select('id').gt('id', id).limit(1).single();
  const getNextPost = supabase
    .from('mung_stagram')
    .select('id')
    .lt('id', id)
    .order('id', { ascending: false })
    .limit(1)
    .single();

  const response = await Promise.all([getPrevPost, getNextPost]);
  const [prev, next] = response.map((res) => res.data?.id);
  return { prev, next };
};

export const createComment = async (
  createCommentInput: TablesInsert<'mung_stagram_comment'>
): Promise<void> => {
  await supabase.from('mung_stagram_comment').insert(createCommentInput).select();
};

export const getComments = async (mung_stagram_id: number) => {
  const { data } = await supabase
    .from('mung_stagram_comment')
    .select('*, profiles (user_name, avatar_url,id)')
    .order('created_at', { ascending: false })
    .eq('mung_stagram_id', mung_stagram_id);
  return data;
};

export const deleteComment = async (id: number) => {
  await supabase.from('mung_stagram_comment').delete().eq('id', id);
};

export const updateComment = async (
  id: number,
  updateCommentInput: TablesUpdate<'mung_stagram_comment'>
): Promise<void> => {
  await supabase.from('mung_stagram_comment').update(updateCommentInput).eq('id', id).select();
};
