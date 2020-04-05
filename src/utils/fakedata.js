const FeedNews = [
  {
    id: 'VLXX1',
    username: 'Hoàn',
    image: require('../assets/images/dalat2.jpg'),
    avatar: require('../assets/images/avatar3.png'),
    date: '20/02/2020',
    rating: 4,
    places: 'TP.Hồ Chí Minh - Đà Lạt',
    title: 'Trải nghiệm đáng nhớ',
    hastag: ['#tphcm', '#dalat'],
    content:
      'Có thể nói đây là một trong những chuyến du lịch tuyệt vời nhất mà mình từng đi. Hà Nội, thành phố mà...',
    price: '3.000.000',
    love: 1234,
    comment: 1234,
  },
  {
    id: 'VLXX2',
    username: 'Nam ngu si',
    avatar: require('../assets/images/avatar.png'),
    image: require('../assets/images/vinhhalong.jpeg'),
    date: '20/02/2020',
    rating: 5,
    places: 'TP.Hồ Chí Minh - Hạ Long',
    title: 'Kỷ niệm khó phai',
    hastag: ['#tphcm', '#halong'],
    content:
      'Có thể nói đây là một trong những chuyến du lịch tuyệt vời nhất mà mình từng đi. Hà Nội, thành phố mà...',
    price: '2.000.000',
    love: 1234,
    comment: 1234,
  },
  {
    username: 'Ai Đó',
    id: 'VLXX3',
    avatar: require('../assets/images/avatar2.png'),
    image: require('../assets/images/vungtau.jpg'),
    date: '20/02/2020',
    rating: 4,
    places: 'TP.Hồ Chí Minh - Vũng Tàu',
    title: 'Nắng nóng vãi l**',
    hastag: ['#tphcm', '#vungtau'],
    content:
      'Có thể nói đây là một trong những chuyến du lịch tuyệt vời nhất mà mình từng đi. Hà Nội, thành phố mà...',
    price: '1.000.000',
    love: 1234,
    comment: 1234,
  },
];
const Places = [
  {
    id: 'place1',
    place: 'TP. Hồ Chí Minh',
    far: 32.4,
  },
  {
    id: 'place2',
    place: 'Đà Lạt',
    far: 325.4,
  },
  {
    id: 'place3',
    place: 'Vũng Tàu',
    far: 321.4,
  },
  {
    id: 'place4',
    place: 'Hội An',
    far: 323.4,
  },
];
const FamousLandscapes = [
  {
    id: 'fl1',
    name: 'Ga xe lửa Đà Lạt',
    point: 4,
    quantityRate: 2,
    image: require('../assets/images/nhagadalat.jpg'),
  },
  {
    id: 'fl2',
    name: 'Ma rừng lữ quán',
    point: 4,
    quantityRate: 4,
    image: require('../assets/images/marungluquan.jpg'),
  },
  {
    id: 'fl3',
    name: 'Vườn dâu Đà Lạt',
    point: 4,
    quantityRate: 5,
    image: require('../assets/images/dalat1.jpg'),
  },
  {
    id: 'fl4',
    name: 'Cánh đồng hoa Lavender',
    point: 5,
    quantityRate: 22,
    image: require('../assets/images/vuonhoalavender.jpg'),
  },
];
export {FeedNews, Places, FamousLandscapes};
