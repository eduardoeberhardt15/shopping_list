export function addTodo(todo:any){
    return(
        {
            type:"ADD_TODO",
            payload:{
                data:todo
            }
        }
    )
}