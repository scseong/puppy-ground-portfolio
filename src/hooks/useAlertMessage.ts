import {
  ALERT_MESSAGE_LENGTH,
  AlertType,
  addAlertMessageByIdAndTarget,
  findAllMessageByUserId,
  updateAlertMessageStatus
} from '@/apis/alertMessage';
import { QueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query';

export const ALERT_MESSAGE_QUERY_LEY = 'alert_message';
const queryClient = new QueryClient();

export const useAlertMessage = (userId: string) => {
  const {
    data: messageList,
    hasNextPage,
    isFetching,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [ALERT_MESSAGE_QUERY_LEY, { userId }],
    enabled: userId !== undefined && userId !== '',
    queryFn: ({ pageParam }) => findAllMessageByUserId({ userId: userId ?? '', pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, lastPageParam) => {
      if (lastPage.data!.length === ALERT_MESSAGE_LENGTH)
        return lastPageParam + ALERT_MESSAGE_LENGTH;
    }
    // select: data => {
    //   return data.pages.map(p => p.data).flat();
    // },
  });

  const { mutate: addAlertMessage } = useMutation({
    mutationFn: async (message: AlertType) => await addAlertMessageByIdAndTarget(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALERT_MESSAGE_QUERY_LEY] });
    }
  });

  const { mutate: updateAlertMessage } = useMutation({
    mutationFn: async (id: string) => await updateAlertMessageStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALERT_MESSAGE_QUERY_LEY] });
    }
  });

  return {
    messageList,
    hasNextPage,
    isFetching,
    fetchNextPage,
    addAlertMessage,
    updateAlertMessage
  };
};
