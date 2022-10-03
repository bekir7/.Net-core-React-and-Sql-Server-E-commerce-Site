import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { Sepet } from "../../app/model/sepet";
import { getCookie } from "../../app/util/util";

interface SepetState{
    sepet: Sepet|null;
    status:string;
}

const initialState:SepetState={
    sepet:null,
    status:'idle'
}
export const fetchSepetAsync=createAsyncThunk<Sepet>(
    'sepet/fetchSepetAsync',
    async (_,thunkAPI)=> {
        try {
         return await agent.Sepet.get();   
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data});
        }
    },
    {
condition:()=>{
    if(!getCookie('aliciId')) return false;
}

    }
)




export const addSepetItemAsync=createAsyncThunk<Sepet ,{urunId:number,quantity?:number}>(
    'sepet/addSepetItemAsync',
    async({urunId,quantity=1},thunkAPI)=>{
        try{
            return await agent.Sepet.addItem(urunId,quantity);
        }catch (error:any){
        return    thunkAPI.rejectWithValue ({error:error.data});    
}
    }
)
export const removeSepetItemAsync=createAsyncThunk <void,{urunId: number,quantity?: number,name?:string}> (
    'sepet/removeSepetItemAsync',
    async({urunId,quantity},thunkAPI)=>{
        try{
            await agent.Sepet.removeItem(urunId,quantity);

        }catch(error:any){
            return    thunkAPI.rejectWithValue ({error:error.data});    

        }
    }
)




export const sepetSlice=createSlice({
    name:'sepet',
    initialState,
    reducers:{
        setSepet:(state,action)=>{
                state.sepet=action.payload
        },
        clearSepet:(state)=>{
            state.sepet=null;
        }
     
    },
    extraReducers:(builder=>{
        builder.addCase(addSepetItemAsync.pending,(state,action)=>{
            state.status='pendingAddItem'+action.meta.arg.urunId;
        });
      
      builder.addCase(removeSepetItemAsync.pending,(state,action)=>{
        state.status='pendingRemoveItem'+action.meta.arg.urunId+action.meta.arg.name;

      });
      builder.addCase(removeSepetItemAsync.fulfilled,(state,action)=>{
        const{urunId,quantity}=action.meta.arg;
            const itemIndex=state.sepet?.items.findIndex(i=>i.urunId===urunId);
            if(itemIndex===-1 || itemIndex===undefined)return;
            state.sepet!.items[itemIndex].quantity-=quantity!;
            if(state.sepet?.items[itemIndex].quantity===0)
            state.sepet!.items.splice(itemIndex,1);
            state.status='idle';
  });
  builder.addCase(removeSepetItemAsync.rejected,(state,action)=>{
    state.status='idle';
    console.log(action.payload)

  });
  builder.addMatcher(isAnyOf(addSepetItemAsync.fulfilled,fetchSepetAsync.fulfilled),(state,action)=>{
    state.sepet=action.payload; 
    state.status='idle';
});
builder.addMatcher(isAnyOf(addSepetItemAsync.rejected,fetchSepetAsync.rejected),(state,action)=>{
  console.log(action.payload);
  state.status='idle';
});
    })

})
export const {setSepet,clearSepet}=sepetSlice.actions;