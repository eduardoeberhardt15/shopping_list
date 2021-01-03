export const addTodo = (todo:any) =>{
    
    return(
        {
            type:"ADD_TODO",
            payload:{
                data:todo
            }
        }
    )
}

export const updateTodo = (todo:any) =>{
    
    return(
        {
            type:"UPDATE_TODO",
            payload:{
                data:todo
            }
        }
    )
}

export const removeTodo = (todo:any) =>{
    
    return(
        {
            type:"REMOVE_TODO",
            payload:{
                data:todo
            }
        }
    )
}

export const getList = (listId:number) =>{
    
    return(
        {
            type:"GET_LIST_ASYNC",
            payload:{
                data:listId
            }
        }
    )
}