import { SlRefresh, SlHeart } from 'react-icons/sl'
import { BiUser, BiHomeAlt, BiStore, BiSolidUser } from 'react-icons/bi'
import { FiPhoneCall } from 'react-icons/fi'
import { MdOutlineArticle, MdCall } from "react-icons/md"
import { FaHome, FaShoppingBag, FaAddressBook, FaPeopleArrows } from 'react-icons/fa'
import { BsTelephoneFill, BsFillHeartFill } from 'react-icons/bs'


export const navButtons = [
    {
        id: 'compare',
        label: 'Compare Products',
        url: "/compare",
        icon: SlRefresh
    },
    {
        id: 'favourite',
        label: 'Favorite Wishlist',
        url: "/wishlist",
        icon: SlHeart
    },
    // {
    //     id: 'auth',
    //     label: 'Login My Account',
    //     url: "/auth/login",
    //     icon: BiUser
    // },
]
export const navButtonsMobile = [
    {
        id: 'compare',
        label: 'Compare Products',
        url: "/compare",
        icon: FaPeopleArrows
    },
    {
        id: 'favourite',
        label: 'Favorite Wishlist',
        url: "/wishlist",
        icon: BsFillHeartFill
    },
    // {
    //     id: 'auth',
    //     label: 'Login My Account',
    //     url: "/auth/login",
    //     icon: BiSolidUser
    // },
]

export const navLinks = [
    {
        id: 'home',
        label: 'Home',
        url: "/",
        icon: FaHome
    },
    {
        id: 'store',
        label: 'Our Store',
        url: "/products",
        icon: FaShoppingBag
    },
    // {
    //     id: 'blog',
    //     label: 'Blog',
    //     url: "/blog",
    //     icon: MdOutlineArticle
    // },
    {
        id: 'contact',
        label: 'Contact',
        url: "/contact",
        icon:  FaAddressBook
    },
]

export const footerLinks = [
    {
        id: 'info',
        title: 'Information',
        link: [
            {
                id: 'delivery',
                label: 'Delivery Policy',
                url: "/legal/delivery-policy",
            },
            {
                id: 'privacy',
                label: 'Privacy Policy',
                url: "/legal/privacy-policy",
            },
            {
                id: 'refund',
                label: 'Refund Policy',
                url: "/legal/refund-policy",
            },
            {
                id: 'terms',
                label: 'Terms and Conditions',
                url: "/legal/terms-and-conditions",
            },
        ]
    },
    {
        id: 'quick-links',
        title: 'Quick Links',
        link: [
            {
                id: 'compare',
                label: 'Compare Products',
                url: "/compare",
            },
            {
                id: 'favourite',
                label: 'Favorite Wishlist',
                url: "/wishlist",
            },
            {
                id: 'auth',
                label: 'Login My Account',
                url: "/auth/login",
            },
        ]
    },
    {
        id: 'account',
        title: 'Account',
        link: [
            {
                id: 'about',
                label: 'About ',
                url: "/about",
            },
            {
                id: 'contact',
                label: 'Contact',
                url: "/contact",
            },
        ]
    },
]