import { atom } from "jotai";
import { Crypto } from "@/types/crypto";

export const cryptoListAtom = atom<Crypto[]>([]);
