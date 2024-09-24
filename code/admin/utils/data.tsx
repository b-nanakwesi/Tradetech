import { MdDashboard, MdComputer, MdEmail, MdCategory } from "react-icons/md";
import {  BsTicketFill, BsApple,  } from "react-icons/bs";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { getRandomID } from "./functions";

export const sidebarLinks = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/",
  },
  {
    name: "Customers",
    icon: FaUsers,
    path: "/customers",
  },
  {
    name: "Orders",
    icon: FaClipboardList,
    path: "/orders",
  },
  {
    name: "Products",
    icon: MdComputer,
    path: "/products",
  },
  {
    name: "Enquiries",
    icon: MdEmail,
    path: "/enquiries",
  },
  {
    name: "Coupons",
    icon: BsTicketFill,
    path: "/coupons",
  },
  {
    name: "Brands",
    icon: BsApple,
    path: "/brands",
  },
  {
    name: "Category",
    icon: MdCategory,
    path: "/category",
  },
]


export const enquiries = [
  {
    id: getRandomID(),
    name: "Jennifer Samms",
    email: "somebs@gmail.com",
    mobile: "0123456789",
    comment: "I have a commenttttttttttttttttttttttttt",
    status: "Resolved"
  },
  {
    id: getRandomID(),
    name: "Jennifer Samms",
    email: "somebs@gmail.com",
    mobile: "0123456789",
    comment: "I have a commenttttttttttttttttttttttttt",
    status: "Contacted"
  },
  {
    id: getRandomID(),
    name: "Jennifer Samms",
    email: "somebs@gmail.com",
    mobile: "0123456789",
    comment: "I have a commenttttttttttttttttttttttttt",
    status: "In Progress"
  },
  {
    id: getRandomID(),
    name: "Jennifer Samms",
    email: "somebs@gmail.com",
    mobile: "0123456789",
    comment: "I have a commenttttttttttttttttttttttttt",
    status: "Submitted"
  },
]

