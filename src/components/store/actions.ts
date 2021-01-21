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

export const updateTodoPrice = (todo:any) =>{
    
    return(
        {
            type:"UPDATE_TODO_PRICE",
            payload:{
                data:todo
            }
        }
    )
}

export const updateTodoAmount = (todo:any) =>{
    
    return(
        {
            type:"UPDATE_TODO_AMOUNT",
            payload:{
                data:todo
            }
        }
    )
}

export const updateTodoFavorite = (todo:any) =>{
    
    return(
        {
            type:"UPDATE_TODO_FAVORITE",
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