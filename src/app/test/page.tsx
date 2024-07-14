"use client"

import { useRecoilState } from "recoil";
import { increaseAtom } from "../utils/store"

export default function Test () {
    const [count, setCount] = useRecoilState(increaseAtom);

    return (
        <>
            <p onClick={() => { setCount(count + 2) }}>Nice, {count}</p>
        </>
    )
}