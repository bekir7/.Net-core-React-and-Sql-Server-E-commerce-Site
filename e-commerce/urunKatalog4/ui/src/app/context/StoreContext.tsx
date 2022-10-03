import { PropsWithChildren,createContext, useContext, useState } from "react";
import { Sepet } from "../model/sepet";

interface StoreContextValue{
    sepet:Sepet|null;
    setSepet:(sepet:Sepet)=>void;
    removeItem:(urunId:number,quantity:number)=> void;


}
export const StoreContext=createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context =useContext(StoreContext);
    if(context === undefined){
        throw Error('oops we dont seem to be inside the provider');

    }
    return context;

}
export function StoreProvider({children}:PropsWithChildren<any>){
    const [sepet, setSepet]=useState<Sepet | null>(null);

    function removeItem(urunId:number,quantity:number){
        if(!sepet)return;
        const items=[...sepet.items];
        const itemIndex=items.findIndex(i=>i.urunId===urunId);
        if(itemIndex>=0){
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity===0)items.splice(itemIndex,1);
            setSepet(prevState => {
                return {...prevState!,items}
            })
        }
    }
    return (<StoreContext.Provider value={{sepet,setSepet,removeItem}}>
        {children}
    </StoreContext.Provider>)
}