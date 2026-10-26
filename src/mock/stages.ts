export interface Stage {
  id: number;
  title: string;
  description: string;
  century: number;
  sign: string;
  imageUrl: string;
  videoUrl: string;
  likesCount: number;
}

export const STAGES_MOCK: Stage[] = [
  {
    id: 1,
    title: 'Ранний устав: начертание «ять» XI века',
    description: 'В раннем кириллическом уставе XI века буква «ять» имела высокую мачту с раздвоенной верхушкой.',
    century: 11,
    sign: 'Ять',
    imageUrl: '/images/ostromir.jpg',
    videoUrl: '/videos/ostromir.mp4',
    likesCount: 5,
  },
  {
    id: 2,
    title: 'Устав: твёрдый знак «ъ» с длинной мачтой',
    description: 'Для уставных рукописей конца XI века характерно написание твёрдого знака «ъ» с длинной мачтой.',
    century: 11,
    sign: 'Ъ',
    imageUrl: '/images/arhangelsk.jpg',
    videoUrl: '', // Пустое видео для проверки дефолта
    likesCount: 3,
  },
  {
    id: 3,
    title: 'Поздний устав: суженное «ять» XIV века',
    description: 'К XIV веку начертание буквы «ять» становится заметно строже и уже.',
    century: 14,
    sign: 'Ять',
    imageUrl: '', // Пустая картинка для проверки дефолта
    videoUrl: '/videos/kiev.mp4',
    likesCount: 4,
  },
  {
    id: 4,
    title: 'Переход к полууставу: «ъ» с укороченной мачтой',
    description: 'На рубеже XIV–XV веков твёрдый знак «ъ» начинает писаться с укороченной мачтой.',
    century: 14,
    sign: 'Ъ',
    imageUrl: '/images/hitrovo.jpg',
    videoUrl: '/videos/hitrovo.mp4',
    likesCount: 3,
  },
];