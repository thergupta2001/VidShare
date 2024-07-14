import { atom } from "recoil";

export const increaseAtom = atom<number>({
    key: "increaseAtom",
    default: 0
})
