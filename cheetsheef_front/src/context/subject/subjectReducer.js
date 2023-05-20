import {
    GET_SUBJECTS,
    ADD_SUBJECT,
    ADD_SUBJECT_FAIL,
    DELETE_SUBJECT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_SUBJECT,
    FILTER_SUBJECT,
    CLEAR_FILTER,
    CLEAR_SUBJECTS
  
  } from "../types"

  export default(state,action)=>{
     switch(action.type){
        case GET_SUBJECTS:
             return{
                ...state,
                subjects:action.payload,
                loading:false
             }
        case ADD_SUBJECT:
            return{
                ...state,
                subjects:[...state.subjects,action.payload],
                loading:false
            }

        case UPDATE_SUBJECT:
              return{
                  ...state,
                  subjects:[...state.subjects.map(sub=>
                     
                   sub._id == action.payload._id ?   action.payload:sub,
                   
                       
                  )],
                    loading:false
              }
        case CLEAR_SUBJECTS:
             return{
                    ...state,
                    subjects: null,
                    loading:true,
                    current:null,
                    error:null,
                    
             }

        case DELETE_SUBJECT:
              return{
                  ...state,
                  subjects:state.subjects.filter((subject)=>{
                    return subject._id !=action.payload
                  }),
                    loading:false

              }
        case SET_CURRENT:
                return{
                    ...state,
                    current:action.payload
                    }
        case CLEAR_CURRENT:
                return{
                          ...state,
                          current:null
                  }
        case ADD_SUBJECT_FAIL:
                return{
                    ...state,
                    error:action.payload
                }
          default:
            return state;  
     }
  }