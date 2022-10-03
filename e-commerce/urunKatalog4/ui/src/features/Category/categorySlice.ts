import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/model/pagination";
import { Urun, UrunParams } from "../../app/model/urun";
import { RootState } from "../../app/store/configureStore";

interface CategoryState{
    urunLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    marka:string[];
    type:string[];
    urunParams:UrunParams;
    metaData:MetaData | null;
    
}

const urunAdapter=createEntityAdapter<Urun>({
    
    selectId:(urun)=>urun.urunId,
});
function getAxiosParams(urunParams:UrunParams){
    const params=new URLSearchParams();
    params.append('pageNumber',urunParams.pageNumber.toString());
    params.append('pageSize',urunParams.pageSize.toString());
    params.append('orderBy',urunParams.orderBy);
   
    if(urunParams.searchTerm)    params.append('searchTerm',urunParams.searchTerm);
   
    if(urunParams.marka.length >0)    params.append('marka',urunParams.marka.toString());
   
    if(urunParams.type.length>0)    params.append('type',urunParams.type.toString());
   
    return params;


    


}
  

export const fetchUrunlerAsync=createAsyncThunk<Urun[],void,{state:RootState}>(
    'category/fetchUrunlerAsync',
    async(_,thunkAPI)=>{
        const params=getAxiosParams(thunkAPI.getState().category.urunParams);
        try {
           const response =  await agent.Category.list(params);
          thunkAPI.dispatch(setMetaData(response.metaData));
          return response.items;
        
        } catch (error:any) {
return thunkAPI.rejectWithValue({error:error.data}); 
//console.log(error);
}
    }
)


export const fetchUrunAsync=createAsyncThunk<Urun,number>(
    'category/fetchUrunAsync',
    async(urunId,thunkAPI)=>{
        try {
            return await agent.Category.details(urunId);
        } catch (error:any) {
           return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)


export const fetchFilters=createAsyncThunk(
    'category/fetchFilters',
    async(_,thunkAPI)=>{
        try {
           return agent.Category.fetchFilters();
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

function initParams(){
    return {
        pageNumber:1,
        pageSize:6,
        orderBy:'name',
        marka:[],
        type:[]
    }
}

export const categorySlice=createSlice({
    name:'category',
    initialState:urunAdapter.getInitialState<CategoryState>({
        urunLoaded:false,
        filtersLoaded:false,
        status:'idle',
        marka:[],
        type:[],
        urunParams: initParams(),
        metaData:null
           
        
    }),
reducers:{
setUrunParams:(state,action)=>{
    state.urunLoaded=false;
    state.urunParams={...state.urunParams,...action.payload,pageNumber:1};
},
setPageNumber:(state,action)=>{
    state.urunLoaded=false;
    state.urunParams={...state.urunParams,...action.payload};

},
setMetaData:(state,action)=>{
    state.metaData=action.payload;
},
resetUrunParams:(state)=>{
    state.urunParams=initParams();
},
setUrun:(state,action)=>{
    urunAdapter.upsertOne(state,action.payload);
    state.urunLoaded=false;
},
removeUrun:(state,action)=>{
    urunAdapter.removeOne(state,action.payload);
    state.urunLoaded=false;

}
},
extraReducers:(builder=>{
    builder.addCase(fetchUrunlerAsync.pending,(state)=>{
        state.status='pendingFetchUrunler';
    });
    builder.addCase(fetchUrunlerAsync.fulfilled,(state,action)=>{
        urunAdapter.setAll(state,action.payload);
        state.status='idle';
        state.urunLoaded=true;

    });
    builder.addCase(fetchUrunlerAsync.rejected,(state,action)=>{
       console.log(action);
        state.status='idle';
    });
    builder.addCase(fetchUrunAsync.pending,(state)=>{
        state.status='pendingFetchUrun';
    });
    builder.addCase(fetchUrunAsync.fulfilled,(state,action)=>{
        urunAdapter.upsertOne(state,action.payload);
        state.status='idle';

    });
    builder.addCase(fetchUrunAsync.rejected,(state,action)=>{
      console.log(action);
        state.status='idle';
    });
    builder.addCase(fetchFilters.pending,(state)=>{
        state.status='pendingFetchFilters';
    });
    builder.addCase(fetchFilters.fulfilled,(state,action)=>{
         state.marka=action.payload.marka;
         state.type=action.payload.type;
         state.filtersLoaded=true;
         state.status='idle';
    });
    builder.addCase(fetchFilters.rejected,(state,action)=>{
        console.log(action.payload);
          state.status='idle';
      });
})
})
export const urunSelectors=urunAdapter.getSelectors((state:RootState)=>state.category);

export const {setUrunParams,resetUrunParams,setMetaData,setPageNumber,setUrun,removeUrun}=categorySlice.actions;
