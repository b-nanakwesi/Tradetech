import { IconType } from "react-icons"


export type NavButton = {
    id: string
    label: string
    url: string
    icon: IconType
}

export type Navlink = {
    id: string
    label: string
    url: string
    icon: IconType
}

type FooterLink = {
    id: string
    label: string
    url: string
}

export type FooterCol = {
    id: string
    title: string
    links: FooterLink[]
}