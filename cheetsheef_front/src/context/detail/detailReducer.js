import {
    GET_DETAILS,
    ADD_DETAIL,
    DELETE_DETAIL,
    SET_CURRENT_DETAIL,
    CLEAR_DETAILS,
    CLEAR_CURRENT_DETAIL,
    UPDATE_DETAIL,
    ADD_DETAIL_FAIL


} from "../types"

  export default(state,action)=>{
     switch(action.type){
        case GET_DETAILS:
            return{
                ...state,
                details:action.payload,
                loading:false
            }
        case ADD_DETAIL_FAIL:
            return{
                ...state,
                error:action.payload
            }
            
         case ADD_DETAIL:
            return{
                ...state,
                details:[...state.details,action.payload],
                loading:false
            }
            case SET_CURRENT_DETAIL:
                return{
                    ...state,
                    current:action.payload
                    }
        case CLEAR_CURRENT_DETAIL:
                return{
                          ...state,
                          current:null
                  }


        
        case UPDATE_DETAIL:
                    return{
                        ...state,
                        details:[...state.details.map(detail=>
                           
                            detail._id == action.payload._id ?   action.payload:detail,
                         
                             
                        )],
                          loading:false
                    }  
                    
                    
         case DELETE_DETAIL:
                    return{
                       ...state,
                          details:state.details.filter((detail)=>{
                           return detail._id !=action.payload
                     }),
                              loading:false
          
                        }


          default:
            return state;  
     }
  }