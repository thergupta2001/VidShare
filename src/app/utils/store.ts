import { atom } from "recoil";
import { Profile } from "./interfaces";

export const increaseAtom = atom<number>({
    key: "increaseAtom",
    default: 0
})

export const profileAtom = atom<Profile>({
    key: "profileAtom",
    default: {
        id: "",
        name: null,
        email: null,
        image: null
    }
})
