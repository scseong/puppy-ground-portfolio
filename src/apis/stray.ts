import axios from 'axios';

export const getStrayList = async () => {
  try {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAY_BASE_URL}?bgnde=20230101&endde=20231231&upkind=417000&state=protect&pageNo=1&numOfRows=100&_type=json&serviceKey=${process.env.NEXT_PUBLIC_STRAY_SERVICE_KEY}`
      )
      .then((response) => {
        console.log('보호시설', response);
      });
    return response; //꼭 리턴 해주기
  } catch (error) {
    console.log(error.message);
  }
};
