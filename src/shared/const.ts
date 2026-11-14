export const bankAccount = {
  bank: {
    title: "銀行名",
    value: "尼崎信用金庫",
  },
  branch: {
    title: "支店名",
    value: "立花支店",
  },
  type: {
    title: "口座種別",
    value: "普通",
  },
  number: {
    title: "口座番号",
    value: "4101784",
  },
  holder: {
    title: "口座名義",
    value: "尼崎こども食堂ネットワーク",
  },
} as const;

export const site = {
  title: "尼崎こども食堂ネットワーク",
  cafesPerPage: 8,
} as const;

export const summary = {
  name: {
    title: "団体名",
    value: "尼崎こども食堂ネットワーク",
  },
  constituent: {
    title: "構成団体",
    value: ["社会福祉法人尼崎市社会福祉協議会", "NPO法人子どものみらい尼崎"],
  },
  establish: {
    title: "設立",
    value: {
      datetime: "2019",
      display: "2019年",
    },
  },
  representative: {
    title: "代表",
    value: "濱田格子",
  },
  location: {
    title: "所在地",
    value: {
      postalCode: "661-0033",
      address: "兵庫県尼崎市南武庫之荘3-24-5 尼社協ほっと館内",
    },
  },
  facebook: {
    title: "Facebook",
    value: "https://facebook.com/amakodomoshokudou/",
  },
  mail: {
    title: "メールアドレス",
    value: "ama.kodomoshokudou@gmail.com",
  },
} as const;
