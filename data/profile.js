export const sidebarData = [
  {
    heading: "My Account",
    links: [
      {
        name: "Email",
        link: "/profile/email",
      },
      {
        name: "Addresses",
        link: "/profile/address",
      },
      {
        name: "Payment Options",
        link: "/profile/payment",
      },
      {
        name: "Security",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders",
        filter: "paid",
      },
    ],
  },
  {
    heading: "Sign out",
    link: [],
  },
];

export const ordersLinks = [
  {
    name: "All Orders",
    filter: "",
  },
  {
    name: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Unpaid Orders",
    filter: "unpaid",
  },
];
