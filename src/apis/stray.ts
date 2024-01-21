import axios from 'axios';

export const getStrayList = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAY_BASE_URL}?bgnde=20231001&upkind=417000&state=protect&pageNo=1&numOfRows=1000&_type=json&serviceKey=${process.env.NEXT_PUBLIC_STRAY_SERVICE_KEY}`
    );
    console.log(response);
    return response.data.response.body.items.item; //꼭 리턴 해주기
  } catch (error: any) {
    console.log(error);
  }
};
